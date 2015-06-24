// var $ = require('jquery');
// var io = require('socket.io')

//function for taking the value of trackText, and passing it down the socket

$(document).ready(function() {
  console.log("ready to rock!");

  //initial value of trackText
  var trackText = $('#trackText').html();

  //listen for change in value of trackText
  document.getElementById("trackText")
    .addEventListener("input", function() {
      trackText = $('#trackText').html();
      console.log(trackText);
    });

  if (io !== undefined) {
    var socket = io.connect();

    socket.on('precipitate', function(data) {
      console.log(data);
      emit(Math.random() * WIDTH, Math.random() * HEIGHT);
    });

    socket.on("connected", function(res) {
      console.log("socket connected");
      socket.emit("start precipitation", trackText)
    });
  }

  $('.heroText').fitText(0.55);
});
