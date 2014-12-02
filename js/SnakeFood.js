function SnakeFood() {
  this.img = document.createElement('img');
  this.img.src = 'images/food1.png';
}
SnakeFood.prototype = new SnakeWorldObject();

SnakeFood.prototype.randomizePosition = function(maxX, maxY) {
  this.setX(Math.floor(Math.random() * maxX));
  this.setY(Math.floor(Math.random() * maxY));
};

SnakeFood.prototype.draw = function(context, spacing) {
  DrawUtil.drawImage(
    context,
    this.img,
    spacing * this.getX(),
    spacing * this.getY(),
    spacing,
    spacing
  );
};
