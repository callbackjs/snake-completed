var NUM_INTIAL_SECTIONS = 3;
// Directions
var UP = 0;
var UP_KEY_CODE = 38;
var DOWN = 1;
var DOWN_KEY_CODE = 40;
var LEFT = 2;
var LEFT_KEY_CODE = 37;
var RIGHT = 3;
var RIGHT_KEY_CODE = 39;

function Snake() {
  this.img = document.createElement('img');
  this.img.src = 'images/snake2.png';
}

Snake.prototype = new SnakeWorldObject();

Snake.prototype.setupSnake = function(maxX, maxY) {
  var startingX = Math.floor(maxX / 2);
  var startingY = Math.floor(maxY / 2);
  this.setX(startingX);
  this.setY(startingY);

  this.sections = [];

  for (var i = 0; i < NUM_INTIAL_SECTIONS; i++) {
    var y = startingY + i + 1;
    this.sections.unshift(new SnakeSection(startingX, y));
  }
};

Snake.prototype.hasCollided = function(maxX, maxY) {
  var x = this.getX();
  var y = this.getY();

  // Out of bounds case
  if (x < 0 || x >= maxX || y < 0 || y >= maxY) {
    return true;
  }

  // collide with its tail case
  for (var i = 0; i < this.sections.length; i++) {
    if (this.isSameLocation(this.sections[i])) {
      return true;
    }
  }

  return false;
};

Snake.prototype.endMove = function(didGrow) {
  if (!didGrow) {
    this.sections.shift();
  }
};

Snake.prototype.startMove = function() {
  this.direction = this.nextDirection;
  var x = this.getX();
  var y = this.getY();

  if (this.direction === UP) {
    this.setY(y - 1);
  } else if (this.direction === DOWN) {
    this.setY(y + 1);
  } else if (this.direction === LEFT) {
    this.setX(x - 1);
  } else if (this.direction === RIGHT) {
    this.setX(x + 1);
  }

  this.sections.push(new SnakeSection(x, y));
};

Snake.prototype.draw = function(context, spacing) {
  for (var i = 0; i < this.sections.length; i++) {
    this.sections[i].draw(context, spacing);
  }

  DrawUtil.drawImage(
    context,
    this.img,
    spacing * this.getX(),
    spacing * this.getY(),
    spacing,
    spacing
  );
};

Snake.prototype.init = function(maxX, maxY) {
  this.setupListeners();
  this.setupSnake(maxX, maxY);
};

Snake.prototype.setupListeners = function() {
  this.direction = UP;
  this.nextDirection = UP;
  var snake = this;
  document.addEventListener('keydown', function(e) {
    if (e.keyCode === UP_KEY_CODE && snake.direction !== DOWN) {
      snake.nextDirection = UP;
    } else if (e.keyCode === DOWN_KEY_CODE && snake.direction !== UP) {
      snake.nextDirection = DOWN;
    } else if (e.keyCode === LEFT_KEY_CODE && snake.direction !== RIGHT) {
      snake.nextDirection = LEFT;
    } else if (e.keyCode === RIGHT_KEY_CODE && snake.direction !== LEFT) {
      snake.nextDirection = RIGHT;
    } else {
      return;
    }
    e.preventDefault();
  });
};

