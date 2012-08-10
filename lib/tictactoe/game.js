Game = function() {
  this.players = ['x', 'o'];
};

Game.prototype.play = function() {
  this.opponent = new Opponent();

  this.showBoard();
  this.startNewTurn();
};

Game.prototype.showBoard = function() {
  this.board = new Board();
  this.board.render(document.body);
  this.board.subscribeToCellSelection(this.cellSelected.bind(this));
};

Game.prototype.cellSelected = function(row, column) {
  if(this.board.covered()) {
    alert('Game Over');
  } else {
    this.board.placeMarker(this.currentPlayer, row, column);
    this.startNewTurn();
  }
};

Game.prototype.startNewTurn = function() {
  this.currentPlayer = this.nextPlayer();

  if(this.currentPlayer == 'o') {
    this.opponent.play(this.board);
  }
};

Game.prototype.nextPlayer = function() {
  var indexOfCurrentPlayer = _.indexOf(this.players, this.currentPlayer);
  return this.players[(indexOfCurrentPlayer + 1) % this.players.length];
};
