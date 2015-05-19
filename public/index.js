$(document).ready(function() {
  console.log("ready to rock!");

  if(io !== undefined) {
    var socket = io.connect('http://localhost:8081/');

    socket.on('precipitate', function(data) {
      console.log(data);
    });

    socket.on("connected", function(res) {
      console.log("socket connected");
      socket.emit("start precipitation")
    });
  }
});
