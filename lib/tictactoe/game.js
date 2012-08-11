Game = function() {
  this.players = ['x', 'o'];
  this.boardElement = $('#board');
  this.messageElement = $('#message');

  this.board = new Board();
  this.player = new Player(this.players[1], this.board, this.boardElement);
  this.referee = new Referee(this.board);
};

Game.prototype.play = function() {
  this.boardElement.click(_.bind(this.boardClicked, this));
  this.startNewTurn();
};

Game.prototype.boardClicked = function(event) {
  var cell = event.target;
  var row = this.cellRow(cell);
  var column = this.cellColumn(cell);

  if(!this.board.covered()) {
    if(this.board.placeMarker(this.currentPlayer, row, column)) {
      this.displayMarker(this.currentPlayer, row, column);

      if(this.referee.checkWin(this.currentPlayer)) {
        this.showWinner();
      } else if(this.board.covered()) {
        this.showDrawMessage();
      } else {
        this.startNewTurn();
      }
    }
  }
};

Game.prototype.displayMarker = function(marker, row, column) {
  this.boardElement.find('tr').eq(row).find('td').eq(column).html(marker);
};

Game.prototype.startNewTurn = function() {
  this.currentPlayer = this.nextPlayer();

  if(this.currentPlayer == 'o') {
    this.player.play('x');
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

Game.prototype.cellColumn = function(cell) {
  var row = cell.parentElement;
  return _.indexOf(row.children, cell);
};

Game.prototype.cellRow = function(cell) {
  var row = cell.parentElement;
  return _.indexOf(row.parentElement.children, row);
};
