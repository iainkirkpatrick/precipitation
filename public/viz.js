var QUALITY = 4,
  WIDTH = Math.floor(window.innerWidth / QUALITY),
  HEIGHT = Math.floor(window.innerHeight / QUALITY),
  SIZE = WIDTH * HEIGHT,

  context, image, data,
  buffer1, buffer2, tempbuffer,

  isUserInteracting, pointers;

function init() {

  var container, canvas;

  container = document.getElementById('container');

  canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  container.appendChild(canvas);

  context = canvas.getContext("2d");
  context.fillStyle = "rgb(0, 0, 0)";
  context.fillRect(0, 0, WIDTH, HEIGHT);
  image = context.getImageData(0, 0, WIDTH, HEIGHT);
  data = image.data;

  buffer1 = [];
  buffer2 = [];

  for (var i = 0; i < SIZE; i++) {

    buffer1[i] = 0;
    // buffer2[i] = i > WIDTH && i < SIZE - WIDTH && Math.random() > 0.995 ? 255 : 0;
    buffer2[i] = 0;
  }
}
