// var $ = require('jquery');
// var io = require('socket.io')

$(document).ready(function() {
  console.log("ready to rock!");

  if (io !== undefined) {
    var socket = io.connect();

    socket.on('precipitate', function(data) {
      console.log(data);
      emit(Math.random() * WIDTH, Math.random() * HEIGHT);
    });

    socket.on("connected", function(res) {
      console.log("socket connected");
      socket.emit("start precipitation")
    });
  }

  $('.heroText').fitText(0.55);
});
