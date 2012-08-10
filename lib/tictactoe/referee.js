Referee = function() {

};

Referee.winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
  [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];

Referee.prototype.checkWin = function(marker, board) {
  var win = false;

  for(var i = 0; i < Referee.winningCombinations.length; i++) {
    var cellsMarked = _.reduce(Referee.winningCombinations[i], _.bind(function(total, index) {
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
