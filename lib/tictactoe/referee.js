Referee = function() {};

Referee.prototype.checkWin = function(marker, board) {
  var win = false;

  _.each(Board.winningCombinations, function(combination) {
    if(!win) {
      var cellsMarked = _.reduce(combination, _.bind(function(total, index) {
        var newTotal = total;
        if(board.indexIsTakenBy(marker, index)) {
          newTotal++;
        }
        return newTotal;
      }, this), 0);

      if(cellsMarked == 3) {
        win = true;
      }
    }
  }, this);

  return win;
};
