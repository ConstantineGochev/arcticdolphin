const express = require('express');
const app = express();
const helpers = require('./helpers');
const bodyParser = require('body-parser');
const cors = require('cors');
const {
    scanAll,
    groupsClient,
    jobOptions
} = require('./helpers')

module.exports = function( queuesObj) {
    //console.log(queuesObj)

    app.use(bodyParser.json())
    app.use(cors());

    app.get('/ping', function(req, res) {
        res.send('pong');
    })
    app.get('/download-dir', function(req, res) {
        var dirs = helpers.directoryTree('../data')
        console.log(dirs)
        res.json(JSON.stringify(dirs))

    })
    /*
     *{
     *  name: string
     *  youtubeDynamicOptions: array
     *  youtubeStaticOptions: array
     *  ripmeDynamicOptions: array
     *  ripmeStaticOptions: array
     *  galleryDynamicOptions: array
     *  galleryStaticOptions: array
     *  jobOptions: array
     *}
     */
    app.post('/groups/create', function(req, res) {
      const { youtubeOptions,ripmeOptions, galleryOptions, jobOptions, name } = req.body;
      console.log(youtubeOptions.join(' '))

      groupsClient.hmset('group:'+ name, [ "youtubeOptions", youtubeOptions.join(' '),
        "ripmeOptions", ripmeOptions.join(' '), "galleryOptions", galleryOptions.join(' '),
        "jobOptions", jobOptions.join(' ') ], function(err, response) {
            if (err) console.log('Err: ',err);
            if(response === 'OK') {
              res.send('success')
            }
        })

    })

    app.delete(['/groups/delete/:name', '/groups/delete/'], function(req, res) {
      const param = req.params.name !== undefined ?  req.params.name : ''
      groupsClient.del('group:'+ param, function(err, resp) {
        if (err) console.log(err)
        console.log(resp)
        res.send('success')
      })
    })

    app.get('/groups', async function(req, res) {
      const groups = await scanAll('group:*')
      res.json(groups)
    })

    app.post('/youtube-dl/add-job', function(req, res) {
        const data = req.body
        console.log(data);
        const validOptions = helpers.verifyOptions(helpers.youtubedlOptions, data.toolOptions)
        var toolOptions, jobOpts;
        if (data.group) {
          toolOptions = data.group.youtubeOptions
          jobOpts = data.group.jobOptions.split(' ').reduce((obj, item,indx, src) => {
            if (jobOptions.includes(item)) {
              return Object.assign(obj, { [item]: src[indx +1] })
            } else {
              return Object.assign(obj, {})
            }
          }, {})
        } else {
          toolOptions = data.toolOptions.join(' ')
          jobOps = data.jobOptions
        }
        if (validOptions) {
            queuesObj.youtubeQueue.add({url: data.url, options: toolOptions}, jobOpts);
            return res.send('success')
        } else {
            return res.json({error: "Invalid options"})
        }
    })


    app.get('/youtube-dl/jobs', function(req, res) {

        queuesObj.youtubeQueue.getJobs(['waiting', 'active', 'completed', 'failed', 'delayed']).then(function(jobs) {
              res.json(JSON.stringify(jobs))
        })
    })

    app.post('/ripme/add-job', function(req, res) {

        const data = req.body
        console.log(data)
        const validOptions = helpers.verifyOptions(helpers.ripmeStaticOptions , data.toolOptions)

        var toolOptions, jobOpts;
        if (data.group) {
          toolOptions = data.group.ripmeOptions
          jobOpts = data.group.jobOptions.split(' ').reduce((obj, item,indx, src) => {
            if (jobOptions.includes(item)) {
              return Object.assign(obj, { [item]: src[indx +1] })
            } else {
              return Object.assign(obj, {})
            }
          }, {})
        } else {
          toolOptions = data.toolOptions.join(' ')
          jobOps = data.jobOptions
        }
        if (validOptions) {
            queuesObj.ripmeQueue.add({url: data.url, options:toolOptions}, jobOpts);
            res.send('success')
        }

    })


    app.get('/ripme/jobs', function(req, res) {

        queuesObj.ripmeQueue.getJobs(['waiting', 'active', 'completed', 'failed', 'delayed']).then(function(jobs) {
              res.json(JSON.stringify(jobs))
        })

    })

    app.post('/gallery-dl/add-job', function(req, res) {

        const data = req.body

        var toolOptions, jobOpts;
        if (data.group) {
          toolOptions = data.group.galleryOptions
          jobOpts = data.group.jobOptions.split(' ').reduce((obj, item,indx, src) => {
            if (jobOptions.includes(item)) {
              return Object.assign(obj, { [item]: src[indx +1] })
            } else {
              return Object.assign(obj, {})
            }
          }, {})
        } else {
          toolOptions = data.toolOptions.join(' ')
          jobOps = data.jobOptions
        }
        queuesObj.galleryQueue.add({url: data.url, options: data.toolOptions}, jobOps);
        res.send('success')

    })


    app.get('/gallery-dl/jobs', function(req, res) {

        queuesObj.galleryQueue.getJobs(['waiting', 'active', 'completed', 'failed', 'delayed']).then(function(jobs) {
              res.json(JSON.stringify(jobs))
        })

    })
    return app
}
