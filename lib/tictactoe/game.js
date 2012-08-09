Game = function() {
  this.players = ['x', 'o'];
};

Game.prototype.play = function() {
  this.turnsTaken = 0;

  this.board = new Board();
  this.board.initialize();
  this.board.subscribeToCellSelection(this.cellSelected.bind(this));
};

Game.prototype.cellSelected = function(row, column) {
  this.board.placeMarker(this.currentPlayer(), row, column);
  this.turnsTaken++;
  if(this.board.covered()) {
    alert('Game Over');
  }
};

Game.prototype.currentPlayer = function() {
  return this.players[this.turnsTaken % 2];
};
