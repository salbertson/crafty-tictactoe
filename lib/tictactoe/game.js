Game = function() {
  this.players = ['x', 'o'];
  this.opponent = new Opponent(this.players[1]);
};

Game.prototype.play = function() {
  this.showBoard();
  this.startNewTurn();
};

Game.prototype.showBoard = function() {
  this.board = new Board();
  this.board.render(document.body);
  this.board.subscribeToCellSelection(_.bind(this.cellSelected, this));
};

Game.prototype.cellSelected = function(row, column) {
  if(this.board.placeMarker(this.currentPlayer, row, column)) {
    if(this.board.covered()) {
      alert('Game Over');
    } else {
      this.startNewTurn();
    }
  } else {
    alert('You cannot play that cell.');
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
