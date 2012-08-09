Game = function() {
  this.roundsPlayed = 0;
  this.players = ['x', 'o'];
};

Game.prototype.play = function(boardElement) {
  $(boardElement).click($.proxy(this.cellClicked, this));
};

Game.prototype.cellClicked = function(event) {
  this.markCell(event.target);
  this.roundsPlayed++;
};

Game.prototype.currentPlayer = function() {
  return this.players[this.roundsPlayed % 2];
};

Game.prototype.markCell = function(cell) {
  $(cell).html(this.currentPlayer());
};
