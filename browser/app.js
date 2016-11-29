var socket = io(window.location.origin);

socket.on('connect', function () {
    console.log('I have made a persistent two-way connection to the server!');
});

whiteboard.on('draw', function (data) {
  // console.log(JSON.stringify(data));

  socket.emit('draw', data);
});


