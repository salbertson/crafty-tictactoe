Referee = function() {};

Referee.prototype.checkWin = function(marker, board) {
  var win = false;

  for(var i = 0; i < Board.winningCombinations.length; i++) {
    var cellsMarked = _.reduce(Board.winningCombinations[i], _.bind(function(total, index) {
      var newTotal = total;

      if(board.indexIsTakenBy(marker, index)) {
        newTotal++;
      }

      return newTotal;
    }, this), 0);

    if(cellsMarked == 3) {
      win = true;
      break;
    }
  }

  return win;
};
