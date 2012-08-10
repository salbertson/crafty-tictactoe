Opponent = function() {
};

Opponent.corners = [0, 2, 6, 8];
Opponent.winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

Opponent.prototype.play = function(board) {
  this.board = board;

  this.win() ||
  this.blockWin() ||
  this.playCenter() ||
  this.playCorner();
};

Opponent.prototype.clickIndex = function(cellIndex) {
  this.board.clickCell(
    this.board.rowFromIndex(cellIndex),
    this.board.columnFromIndex(cellIndex)
  );
};

Opponent.prototype.win = function() {
  var won = false;

  for(var i = 0; i < Opponent.winningCombinations.length; i++) {
    var winningIndex = this.winningIndexFor('o', Opponent.winningCombinations[i]);
    if(winningIndex) {
      this.clickIndex(winningIndex);
      won = true;
      break;
    }
  }

  return won;
};

Opponent.prototype.blockWin = function() {
  var blocked = false;

  for(var i = 0; i < Opponent.winningCombinations.length; i++) {
    var winningIndex = this.winningIndexFor('x', Opponent.winningCombinations[i]);
    if(winningIndex) {
      this.clickIndex(winningIndex);
      blocked = true;
      break;
    }
  }

  return blocked;
};

Opponent.prototype.playCenter = function() {
  var playedCenter = false;

  if(this.board.indexIsOpen(4)) {
    this.board.clickCell(1, 1);
    playedCenter = true;
  }

  return playedCenter;
};

Opponent.prototype.playCorner = function() {
  var playedCorner = false;

  for(var i = 0; i < Opponent.corners.length; i++) {
    var cornerIndex = Opponent.corners[i];
    if(this.board.indexIsOpen(cornerIndex)) {
      this.clickIndex(cornerIndex);
      playedCorner = true;
      break;
    }
  }

  return playedCorner;
};

Opponent.prototype.winningIndexFor = function(marker, combination) {
  var winningIndex = null;

  var cellsMarked = _.reduce(combination, function(total, index) {
    var newTotal = total;

    if(this.board.indexIsTakenBy(marker, index)) {
      newTotal++;
    }

    return newTotal;
  }.bind(this), 0);

  if(cellsMarked == 2) {
    for(var i = 0; i < combination.length; i++) {
      if(this.board.indexIsOpen(combination[i])) {
        winningIndex = combination[i];
        break;
      }
    }
  }

  return winningIndex;
};
