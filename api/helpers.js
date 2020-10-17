const Docker = require('dockerode');
const docker = new Docker({socketPath: '/var/run/docker.sock'});
const stream = require('stream');
const FS = require('fs');
const PATH = require('path');
const { promisify } = require('util');
const redis = require('redis');
const groupsClient = redis.createClient();
const scan = promisify(groupsClient.scan).bind(groupsClient);
const hmget = promisify(groupsClient.hmget).bind(groupsClient);

const constants = {
	DIRECTORY: 'directory',
	FILE: 'file'
}
const jobOptions = [
    'delay',
     'priority',
    'every',
     'limit',
     'cron'
]
const youtubedlOptions = [
     '-i',
     '--abort-on-error',
     '--dump-user-agent',
     '--list-extractors',
     '--flat-playlist',
     '--mark-watched',
     '--no-mark-watched',
     '--geo-bypass',
     '--no-playlist',
     '--yes-playlist',
     '--skip-unavailable-fragments',
     '--abort-on-unavailable-fragment',
     '--keep-fragments',
     '--restrict-filenames',
     '--no-overwrites',
     '--no-part',
     '--default-search' ,
     '--proxy' ,
     '--socket-timeout' ,
     '--source-address' ,
     '--playlist-start' ,
     '--playlist-end' ,
     '--match-title' ,
     '--reject-title' ,
     '--min-filesize' ,
     '--max-filesize' ,
     '--date' ,
     '--datebefore' ,
     '--dateafter' ,
     '--min-views' ,
     '--max-views' ,
     '--age-limit' ,
    '--limit-rate',
    '--retries',
    '--sleep-interval',
    '--audio-format',
     '--default-search' ,
     '--proxy' ,
     '--socket-timeout' ,
     '--source-address' ,
     '--playlist-start' ,
     '--playlist-end' ,
     '--match-title' ,
     '--reject-title' ,
     '--min-filesize' ,
     '--max-filesize' ,
     '--date' ,
     '--datebefore' ,
     '--dateafter' ,
     '--min-views' ,
     '--max-views' ,
     '--age-limit' ,
    '--limit-rate',
    '--retries',
    '--sleep-interval',
    '--audio-format',
]

const ripmeStaticOptions = [
  '--skip404',
  '--saveorder',
  '--nosaveorder',
  '--no-prop-file',
  '--rerip',
  '--overwrite'
]

const scanAll = async (pattern) => {
  const found = [];
  const allGroups = [];
  let cursor = '0';
  let indx = 0;

  do {
    const reply = await scan(cursor, 'MATCH', pattern);
    cursor = reply[0];
    if (reply[1][0] !==  undefined && reply[1][0] !== "") {
      found.push(reply[1][0]);
    }
  } while (cursor !== '0');

  while (indx < found.length) {
    let values = await hmget(found[indx], ["youtubeOptions", "ripmeOptions", "galleryOptions", "jobOptions"])
    let obj = {"name": found[indx].split(':')[1],"youtubeOptions": values[0], "ripmeOptions": values[1], "galleryOptions": values[2], "jobOptions": values[3]}
    allGroups.push(obj)
    indx++
  }
  return allGroups;
}
function verifyOptions(validOptions, requestOptions) {
    return requestOptions.map(rOpt => rOpt.split(' ')[0]).every(e => validOptions.includes(e))
}

function runExec(containerId, command, callback) {
  console.log("run exec");
  var options = {
    Cmd: ['sh', '-c', command],
    AttachStdout: true,
    AttachStderr: true
  };
  const container = docker.getContainer(containerId)
  container.exec(options, function(err, exec) {
    console.log(exec)
    if (err) return;
    exec.start(function(err, stream) {
      if (err) return;
      container.modem.demuxStream(stream,process.stdout, process.stderr);

      exec.inspect(function(err, data) {
        if (err) return;
        callback(data)
      });
    });
  });
}
function containerDiscovery(callback) {
    function produceCommand (command, options, url) {
        return command + ' ' + options + ' ' + url
    }
    var containersObj = {
        'ytdl': {
          containers: [],
          run: (options, url) => produceCommand('youtube-dl', options, url)
        },
        'gdl': {
          containers: [],
          run: (options, url) => produceCommand('gallery-dl', options, url)
        },
        'ripme': {
          containers: [],
          run: (options, url) => produceCommand('java -jar ripme.jar', options, '--url ' +url)
        }
    }
    docker.listContainers(function(err, containers) {
        let index = 0;
        while (index < containers.length) {
           // console.log(containers)
            let containerName = containers[index].Names[0].split('.')[0].substring(1);
            if (containersObj.hasOwnProperty(containerName)) {
                containersObj[containerName].containers.push(containers[index].Id)
            }
            index++
        }

        callback(containersObj)
    })

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var containerLoadBalance = function(containerArr) {
    var index = -1;
    return function() {
            if (index < containerArr.length) {
                index++;
            }
            if (index === containerArr.length) {
                index = 0;
                containerArr.reverse()
            }
        return containerArr[index]
    }
}

function safeReadDirSync (path) {
	  let dirData = {};
	  try {
	  	dirData = FS.readdirSync(path);
	  } catch(ex) {
	  	if (ex.code == "EACCES" || ex.code == "EPERM") {
	  		//User does not have permissions, ignore directory
	  		return null;
	  	}
	  	else throw ex;
	  }
	  return dirData;
}

function normalizePath(path) {
	  return path.replace(/\\/g, '/');
}

function isRegExp(regExp) {
	  return typeof regExp === "object" && regExp.constructor == RegExp;
}


function directoryTree (path, options, onEachFile, onEachDirectory) {
	  const name = PATH.basename(path);
	  path = options && options.normalizePath ? normalizePath(path) : path;
	  const item = { path, name };
	  let stats;

	  try { stats = FS.statSync(path); }
	  catch (e) { return null; }

	  // Skip if it matches the exclude regex
	  if (options && options.exclude) {
	  	const excludes =  isRegExp(options.exclude) ? [options.exclude] : options.exclude;
	  	if (excludes.some((exclusion) => exclusion.test(path))) {
	  		return null;
	  	}
	  }

	  if (stats.isFile()) {

	  	const ext = PATH.extname(path).toLowerCase();

	  	// Skip if it does not match the extension regex
	  	if (options && options.extensions && !options.extensions.test(ext))
	  		return null;

	  	item.size = stats.size;  // File size in bytes
	  	item.extension = ext;
	  	item.type = constants.FILE;

	  	if (options && options.attributes) {
	  		options.attributes.forEach((attribute) => {
	  			item[attribute] = stats[attribute];
	  		});
	  	}

	  	if (onEachFile) {
	  		onEachFile(item, PATH, stats);
	  	}
	  }
	  else if (stats.isDirectory()) {
	  	let dirData = safeReadDirSync(path);
	  	if (dirData === null) return null;

	  	if (options && options.attributes) {
	  		options.attributes.forEach((attribute) => {
	  			item[attribute] = stats[attribute];
	  		});
	  	}
	  	item.children = dirData
	  		.map(child => directoryTree(PATH.join(path, child), options, onEachFile, onEachDirectory))
	  		.filter(e => !!e);
	  	item.size = item.children.reduce((prev, cur) => prev + cur.size, 0);
	  	item.type = constants.DIRECTORY;
	  	if (onEachDirectory) {
	  		onEachDirectory(item, PATH, stats);
	  	}
	  } else {
	  	return null; // Or set item.size = 0 for devices, FIFO and sockets ?
	  }
	  return item;
}
module.exports = {
    containerDiscovery,
    runExec,
    getRandomInt,
    containerLoadBalance,
    directoryTree,
    verifyOptions,
    youtubedlOptions,
    ripmeStaticOptions,
    scanAll,
    groupsClient,
    jobOptions
}
