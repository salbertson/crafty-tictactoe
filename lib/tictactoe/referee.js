Referee = function(board) {
  this.board = board;
};

Referee.prototype.checkWin = function(marker) {
  var win = false;

  _.each(Board.winningCombinations, function(combination) {
    if(!win) {
      if(this.numberOfCellsMarked(marker, combination) == 3) {
        win = true;
      }
    }
  }, this);

  return win;
};

Referee.prototype.numberOfCellsMarked = function(marker, combination) {
  return _.reduce(combination, _.bind(function(total, index) {
    if(this.board.indexIsTakenBy(marker, index)) {
      total++;
    }

    return total;
  }, this), 0);
};
