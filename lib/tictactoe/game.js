Game = function() {
  this.players = ['x', 'o'];
};

Game.prototype.play = function(boardElement) {
  this.board = new Board();
  this.turnsTaken = 0;

  $(boardElement).click($.proxy(this.cellClicked, this));
};

Game.prototype.cellClicked = function(event) {
  var clickedCell = event.target;
  this.board.placeMarker(
    this.currentPlayer(),
    this.rowClicked(clickedCell),
    this.columnClicked(clickedCell)
  );
  this.markCell(clickedCell);
  this.turnsTaken++;

  if(this.board.covered()) {
    alert('Game Over');
  }
};

Game.prototype.currentPlayer = function() {
  return this.players[this.turnsTaken % 2];
};

Game.prototype.markCell = function(cell) {
  $(cell).html(this.currentPlayer());
};

Game.prototype.columnClicked = function(cell) {
  var row = cell.parentElement;
  return _.indexOf(row.children, cell);
};

Game.prototype.rowClicked = function(cell) {
  var row = cell.parentElement;
  return _.indexOf(row.parentElement.children, row);
};

