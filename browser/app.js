var socket = io(window.location.origin);

socket.on('connect', function () {
    console.log('I have made a persistent two-way connection to the server!');
});

whiteboard.on('draw', function (start, end, strokeColor, shouldBroadcast) {
  // console.log(JSON.stringify(data));
  console.log(arguments);
  socket.emit('draw', start, end, strokeColor, shouldBroadcast);
});

socket.on('draw', function (start, end, strokeColor, shouldBroadcast) {
  whiteboard.draw(start, end, strokeColor, shouldBroadcast);
});
