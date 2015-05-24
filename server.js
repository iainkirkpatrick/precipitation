//Setup web server and socket
var twitter = require('twitter'),
  express = require('express'),
  app = express(),
  http = require('http'),
  server = http.createServer(app),
  io = require('socket.io').listen(server);

//Setup twitter stream api
var twit = new twitter({
    // consumer_key: 'b3nYDw97IzrsLceveyVh5TdhS',
    // consumer_secret: 'nIiBGOaTMVjDLknQR7OqTFjokDKcOT31CvGoM5zgP8B1FvbmVN',
    // access_token_key: '40796586-LqYvnVifIvwZAmyXEXoXE8C2SwEkxrKZ8w5C111F7',
    // access_token_secret: 'm95MDjBGq57ZHXjvofVf0Hl2di7m3q09BKJakTNbm6XVN'
    consumer_key: process.env.twitterConsumerKey,
    consumer_secret: process.env.twitterConsumerSecret,
    access_token_key: process.env.twitterTokenKey,
    access_token_secret: process.env.twitterTokenSecret
  }),
  stream = null;

console.log('node server running, "localhost:8081"')

//Use the default port (for beanstalk) or default to 8081 locally
server.listen(process.env.PORT || 8081);

//Setup rotuing for app
app.use(express.static(__dirname + '/public'));

//Create web sockets connection.
io.sockets.on('connection', function(socket) {

  //Code to run when socket.io is setup.
  socket.on("start precipitation", function() {

    if (stream === null) {
      //Connect to twitter stream passing in filter for Wellington.
      twit.stream('statuses/filter', {
        //'locations': '174.70414, -41.35505, 174.85245, -41.19714'
        'track': 'code'
      }, function(stream) {
        stream.on('data', function(tweet) {
          socket.broadcast.emit("precipitate", tweet);

          //Send out to web sockets channel.
          socket.emit('precipitate', tweet);
        });
        stream.on('error', function(error) {
          console.log(error);
        });
      });
    }
  });

  // Emits signal to the client telling them that the
  // they are connected and can start receiving Tweets
  socket.emit("connected");

});
