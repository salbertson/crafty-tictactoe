Game = function() {
  this.players = ['x', 'o'];
};

Game.prototype.play = function() {
  this.startNewTurn();
  this.showBoard();
};

Game.prototype.showBoard = function() {
  this.board = new Board();
  this.board.render(document.body);
  this.board.subscribeToCellSelection(this.cellSelected.bind(this));
};

Game.prototype.cellSelected = function(row, column) {
  this.board.placeMarker(this.currentPlayer, row, column);
  this.checkGameOver();
  this.startNewTurn();
};

Game.prototype.checkGameOver = function() {
  if(this.board.covered()) {
    alert('Game Over');
  }
};

Game.prototype.startNewTurn = function() {
  var indexOfCurrentPlayer = _.indexOf(this.players, this.currentPlayer);
  var nextPlayer = this.players[(indexOfCurrentPlayer + 1) % this.players.length];
  this.currentPlayer = nextPlayer;
};
