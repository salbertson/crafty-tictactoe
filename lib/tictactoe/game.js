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

Game.prototype.startNewTurn = function() {
  var indexOfCurrentPlayer = _.indexOf(this.players, this.currentPlayer);
  var nextPlayer = this.players[(indexOfCurrentPlayer + 1) % this.players.length];
  this.currentPlayer = nextPlayer;

  if(this.currentPlayer == 'o') {
    this.letOpponentPlay()
  }
};

Game.prototype.letOpponentPlay = function() {
  this.opponent.play(this.board);
};

Game.prototype.cellSelected = function(row, column) {
  if(this.board.covered()) {
    alert('Game Over');
  } else {
    this.board.placeMarker(this.currentPlayer, row, column);
    this.startNewTurn();
  }
};
