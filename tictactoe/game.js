Game = function(boardElement) {
  this.roundsPlayed = 0;
  $(boardElement).click($.proxy(this.cellClicked, this));
};

Game.players = ['x', 'o'];

Game.prototype.cellClicked = function(event) {
  var columnElement = event.target;
  var rowElement = columnElement.parentElement;

  var columnIndex = _.indexOf(rowElement.children, columnElement);
  var rowIndex = _.indexOf(rowElement.parentElement.children, rowElement);

  $(columnElement).html(this.currentPlayer());

  this.roundsPlayed++;
};

Game.prototype.currentPlayer = function() {
  return Game.players[this.roundsPlayed % 2];
};
