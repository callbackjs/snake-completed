/* Base class for objects in Snake World */

function SnakeWorldObject() {}

SnakeWorldObject.prototype.getX = function() { return this.x; };
SnakeWorldObject.prototype.getY = function() { return this.y; };
SnakeWorldObject.prototype.setX = function(newX) { this.x = newX; };
SnakeWorldObject.prototype.setY = function(newY) { this.y = newY; };

SnakeWorldObject.prototype.draw = function(context, spacing) {
  throw 'Not yet implemented';
};

// Requires another SnakeWorldObject
SnakeWorldObject.prototype.isSameLocation = function(otherObject) {
  if (otherObject.getX() === this.getX() &&
      otherObject.getY() === this.getY()) {
    return true;
  }
  return false;
};
