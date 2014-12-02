function SnakeGame($outerContainer, maxX, maxY, spacing) {
  this.maxX = maxX;
  this.maxY = maxY;
  this.spacing = spacing;

  this.$snakeCanvas = $outerContainer.find('canvas');
  this.$message = $outerContainer.find('.message');
  this.$score = $outerContainer.find('.scores .current .score');
  this.$highScore = $outerContainer.find('.scores .high .score');

  var context = this.$snakeCanvas.get(0).getContext('2d');
  context.canvas.width = maxX * spacing;
  context.canvas.height = maxY * spacing;
  if (window.localStorage['snake-high-score']) {
    this.$highScore.html(window.localStorage['snake-high-score']);
  }

  var game = this;
  this.$message.click(function(e) {
    game.start();
  });
}

SnakeGame.prototype.update = function() {
  this.snake.startMove();
  var didGrow = this.snake.isSameLocation(this.food);
  this.snake.endMove(didGrow);
  if (didGrow) {
    this.score += 1;
    this.food.randomizePosition(this.maxX, this.maxY);
  }
  return !this.snake.hasCollided(this.maxX, this.maxY);
};

SnakeGame.prototype.start = function() {
  this.score = 0;
  this.$message.hide();
  this.snake = new Snake();
  this.snake.init(this.maxX, this.maxY);

  this.food = new SnakeFood();
  this.food.randomizePosition(this.maxX, this.maxY);
  this.loop();
};


SnakeGame.prototype.draw = function() {
  this.$score.html(this.score);
  this.$highScore.html(window.localStorage['snake-high-score']);
  var context = this.$snakeCanvas.get(0).getContext('2d');
  context.clearRect(0, 0, this.spacing * this.maxX, this.spacing * this.maxX);
  this.snake.draw(context, this.spacing);
  this.food.draw(context, this.spacing);
};

SnakeGame.prototype.loop = function() {
  var alive = this.update();

  if (alive) {
    this.draw();
    var game = this;
    setTimeout(function() {
      game.loop();
    }, 200);
  } else {
    this.recordHighScore();
    this.$message.html("Game over. Press to restart.");
    this.$message.show();
  }
};

SnakeGame.prototype.recordHighScore = function() {
  var highScore = window.localStorage['snake-high-score'];
  if (!highScore) {
    highScore = 0;
  }
  if (this.score > highScore) {
    window.localStorage['snake-high-score'] = this.score;
    this.$highScore.html(window.localStorage['snake-high-score']);
  }
};
