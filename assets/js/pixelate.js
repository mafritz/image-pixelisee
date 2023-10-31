const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const image = new Image();
const canvasWidth = 700;
const canvasHeight = 500;

function loadImage() {
  const select = document.getElementById("image-select");
  const file = document.getElementById("file-input").files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      image.onload = function () {
        drawImage();
      };
      image.src = event.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    image.onload = function () {
      drawImage();
    };
    image.src = select.value;
  }
}

function drawImage() {
  let width, height;
  if (image.width > image.height) {
    width = canvasWidth;
    height = image.height * (canvasWidth / image.width);
  } else {
    width = image.width * (canvasHeight / image.height);
    height = canvasHeight;
  }
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  ctx.drawImage(image, 0, 0, width, height);
  pixelate();
}

function pixelate() {
  const size = parseInt(document.getElementById("pixel-slider").value);
  const w = canvas.width / size;
  const h = canvas.height / size;
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, w, h);
  ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
}
