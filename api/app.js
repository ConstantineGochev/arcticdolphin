const express = require('express');
const app = express();
const helpers = require('./helpers');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');
const groupsClient = redis.createClient();

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
      const { youtubeDynamicOptions,youtubeStaticOptions,ripmeDynamicOptions, ripmeStaticOptions, galleryDynamicOptions, galleryStaticOptions, jobOptions } = req.body.group;


      groupsClient.hmset(name, [ ["youtubeDynamicOptions", youtubeDynamicOptions.toString()], ["youtubeStaticOptions", youtubeStaticOptions.toString()],
        ["ripmeDynamicOptions", ripmeDynamicOptions.toString()], ["ripmeStaticOptions", ripmeStaticOptions.toString()], ["galleryDynamicOptions", galleryDynamicOptions.toString()],
        ["galleryStaticOptions", galleryStaticOptions.toString()], ["jobOptions", jobOptions.toString()] ], function(err, response) {
            if (err) console.log('Err: ',err);

            res.send('success')
        })

    })

    app.delete('/groups/delete', function(req, res) {


    })

    app.get('/groups/', function(req, res) {


    })

    app.get('/groups/:groupname', function(req, res) {


    })
    app.put('/groups/update', function(req, res) {


    })
    app.post('/youtube-dl/add-job', function(req, res) {
        const data = req.body
        console.log(data);
        const validOptions = helpers.verifyOptions(helpers.youtubedlOptions, data.toolOptions)
        if (validOptions) {
            console.log("job options = ", data.jobOptions);
            //console.log(queuesObj.youtubeQueue.add({test: 'test'}))
            queuesObj.youtubeQueue.add({url: data.url, options: data.toolOptions.join(' ')}, data.jobOptions);
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
        if (validOptions) {
            queuesObj.ripmeQueue.add({url: data.url, options: data.toolOptions.join(' ')}, data.jobOptions);
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
        queuesObj.galleryQueue.add({url: data.url, options: data.toolOptions.join(' ')}, data.jobOptions);
        res.send('success')

    })


    app.get('/gallery-dl/jobs', function(req, res) {

        queuesObj.galleryQueue.getJobs(['waiting', 'active', 'completed', 'failed', 'delayed']).then(function(jobs) {
              res.json(JSON.stringify(jobs))
        })

    })
    return app
}
