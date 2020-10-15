const Queue = require('bull');
const util = require('util');
const p_event = require('p-event')
const http = require('http');
const helpers = require('./helpers')

var youtubeQueue = new Queue('youtube-dl', 'redis://127.0.0.1:6379');
var ripmeQueue = new Queue('ripme', 'redis://127.0.0.1:6379');
var galleryQueue = new Queue('galley-dl', 'redis://127.0.0.1:6379');

async function createServerListen(app, port, host) {
    const server = http.createServer(app);
    server.listen(port, host);
    console.log('Server listening on port ', port);

    await p_event(server, 'listening');

    return server;
};

async function main() {
  let server;
   try {
      const app = require('./app.js')({youtubeQueue, ripmeQueue, galleryQueue})
      const port = 8000;
      server = await createServerListen(app, port, 'localhost');

      await Promise.race([
         ...['SIGNINT', 'SIGHUP', 'SIGTERM'].map((s) =>
            p_event(process, s, {
               rejectionEvents: ['uncaughtException', 'unhandledRejection']
            })
         )
      ]);
   } catch (err) {
      process.exitCode = 1;
   }

}

main()


helpers.containerDiscovery(function(containersObj){
  youtubeQueue.process(function(job, done){

      console.log('job data = ',job.data);

        const ytBalanced = helpers.containerLoadBalance(containersObj.ytdl.containers)
        const b = ytBalanced();
        helpers.runExec(b, containersObj.ytdl.run(job.data.options, job.data.url), function(data){
              job.progress(100);
              done()
        })
  });

  ripmeQueue.process(function(job, done){

        const ripmeBalanced = helpers.containerLoadBalance(containersObj.ripme.containers)
        const b = ripmeBalanced();
        helpers.runExec(b, containersObj.ripme.run(job.data.options, job.data.url), function(data){
           job.progress(100);
           done()
      })
  });

  galleryQueue.process(function(job, done){

        const gdlBalanced = helpers.containerLoadBalance(containersObj.gdl.containers)
        const b = gdlBalanced();
        helpers.runExec(b, containersObj.gdl.run(job.data.options, job.data.url), function(data){
           job.progress(100);
           done()
       })
  })
})

