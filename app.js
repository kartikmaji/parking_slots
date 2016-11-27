/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// // This application uses express as its web server
// // for more info, see: http://expressjs.com
// var express = require('express');

// // cfenv provides access to your Cloud Foundry environment
// // for more info, see: https://www.npmjs.com/package/cfenv
// var cfenv = require('cfenv');

// // create a new express server
// var app = express();

// // serve the files out of ./public as our main files
// app.use(express.static(__dirname + '/public'));

// // get the app environment from Cloud Foundry
// var appEnv = cfenv.getAppEnv();

// // start server on the specified port and binding host
// app.listen(appEnv.port, '0.0.0.0', function() {
//   // print a message when the server starts listening
//   console.log("server starting on " + appEnv.url);
// });


var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + 'public/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});