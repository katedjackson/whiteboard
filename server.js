var path = require('path');

// var whiteboard = require();

var http = require('http');
var server = http.createServer();

var socketio = require('socket.io');

var express = require('express');
var app = express();

server.on('request', app);

var io = socketio(server);

var picture = [];

io.on('connection', function (socket) {
    /* This function receives the newly connected socket.
       This function will be called for EACH browser that connects to our server. */
    console.log('A new client has connected!');
    console.log(socket.id);

    picture.forEach(function (data) {

      socket.emit('draw', data[0], data[1], data[2]);
      //whiteboard.draw(data[0], data[1], data[2]);
    });

    socket.on('disconnect', function () {
      console.log(':(');
    });

    socket.on('draw', function (start, end, strokeColor) {
      picture.push(arguments);
      socket.broadcast.emit('draw', start, end, strokeColor);
    });
});

server.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
