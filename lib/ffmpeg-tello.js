"use strict";


const spawn  = require('child_process').spawn;
const merge  = require('mout/object/merge');
const Server = require('./_server');


class FFMpegTelloServer extends Server {

  constructor(server, opts) {
    super(server, merge({
      fps : 25,
    }, opts));
  }

  get_feed() {

    var args = [
      "-i", "udp://0.0.0.0:11111",
      "-framerate", this.options.fps,
      "-video_size", this.options.width + 'x' + this.options.height,
      "-c:v",  "libx264",
      "-vprofile", "baseline",
      "-tune", "zerolatency",
      "-f", "rawvideo",
      "-"
    ];

    console.log("ffmpeg " + args.join(' '));
    var streamer = spawn('ffmpeg', args);
    //streamer.stderr.pipe(process.stderr);

    streamer.on("exit", function(code){
      console.log("Failure", code);
    });

    return streamer.stdout;
  }

};


module.exports = FFMpegTelloServer;