"use strict";

/**
* Run this on windows desktop
* then browse (using google chrome/firefox) to http://[pi ip]:8080/
*/


const http    = require('http');
const express = require('express');


const WebStreamerServer = require('./lib/ffmpeg-tello');

const app  = express();

  //public website
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/vendor/dist'));


const server  = http.createServer(app);
const silence = new WebStreamerServer(server, {
  width : 960,
  height: 720,
});

server.listen(8080);
