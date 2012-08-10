Opponent = function() {
};

Opponent.prototype.play = function(board) {
  var boardState = board.currentState();

  var indexOfFirstEmptyCell = _.indexOf(_.flatten(boardState), null);
  var numberOfColumns = boardState[0].length;
  var column = indexOfFirstEmptyCell % numberOfColumns;
  var row = Math.floor(indexOfFirstEmptyCell / numberOfColumns);
  board.clickCell(row, column);
};
