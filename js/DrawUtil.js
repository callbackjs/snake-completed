var EXCESS = 8;
var RADIUS_EXCESS = 2;
var DrawUtil = {

  drawImage: function (context, img, x, y, width, height) {
    context.drawImage(
      img,
      x - EXCESS,
      y - EXCESS,
      width + EXCESS * 2,
      height + EXCESS * 2
    );
  },

  drawCircle: function (context, centerX, centerY, radius, color) {
    context.beginPath();
    context.arc(centerX, centerY, radius + RADIUS_EXCESS, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
    context.closePath();
  }

};
