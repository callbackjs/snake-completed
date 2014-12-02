var SNAKE_SECTION_GREEN = "#00DD00";
function SnakeSection(x, y) {
  this.setX(x);
  this.setY(y);
}
SnakeSection.prototype = new SnakeWorldObject();

SnakeSection.prototype.draw = function(context, spacing) {
  DrawUtil.drawCircle(
    context,
    spacing * this.getX() + spacing / 2,
    spacing * this.getY() + spacing / 2,
    spacing / 2,
    SNAKE_SECTION_GREEN
  );
};
