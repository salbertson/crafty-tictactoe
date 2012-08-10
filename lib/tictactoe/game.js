Game = function() {
  this.players = ['x', 'o'];
  this.messageElement = $('#message');

  this.board = new Board();
  this.opponent = new Opponent(this.players[1]);
  this.referee = new Referee();
};

Game.prototype.play = function() {
  this.showBoard();
  this.startNewTurn();
};

Game.prototype.showBoard = function() {
  this.board.render(document.body);
  this.board.subscribeToCellSelection(_.bind(this.cellSelected, this));
};

Game.prototype.cellSelected = function(row, column) {
  if(!this.board.covered()) {
    if(this.board.placeMarker(this.currentPlayer, row, column)) {
      if(this.referee.checkWin(this.currentPlayer, this.board)) {
        this.showWinner();
      } else if(this.board.covered()) {
        this.showDrawMessage();
      } else {
        this.startNewTurn();
      }
    }
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

Game.prototype.showWinner = function() {
  if(this.currentPlayer == 'x') {
    this.messageElement.find('p').html('You won! Go celebrate.');
  } else {
    this.messageElement.find('p').html('Wow, can\'t believe you lost.');
  }

  this.messageElement.show();
};

Game.prototype.showDrawMessage = function() {
  this.messageElement.find('p').html('It\'s a draw.');
  this.messageElement.show();
};
