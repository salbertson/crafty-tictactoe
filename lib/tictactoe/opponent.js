Opponent = function() {
};

Opponent.corners = [0, 2, 6, 8];
Opponent.edges = [1, 3, 5, 7];
Opponent.forkCombinations = [
  [1, 5], [5, 7], [3, 7], [1, 3]
];
Opponent.winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
  [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];

Opponent.prototype.play = function(board) {
  this.board = board;

  var played = this.win() ||
  this.blockWin() ||
  // this.fork() ||
  this.blockFork() ||
  this.playCenter() ||
  // this.playOppositeCorner() ||
  this.playCorner() ||
  this.playEdge();

  if(!played) {
    throw('Opponent did not play, could not take the pressure.');
  }
};

Opponent.prototype.win = function() {
  var won = false;

  for(var i = 0; i < Opponent.winningCombinations.length; i++) {
    var winningIndex = this.winningIndexFor('o', Opponent.winningCombinations[i]);
    if(winningIndex) {
      this.board.clickIndex(winningIndex);
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
      this.board.clickIndex(winningIndex);
      blocked = true;
      break;
    }
  }

  return blocked;
};

Opponent.prototype.blockFork = function() {
  var blocked = false;

  for(var i = 0; i < Opponent.forkCombinations.length; i++) {
    var forkCombination = Opponent.forkCombinations[i];

    if(this.board.indexIsTakenBy('x', forkCombination[0]) &&
        this.board.indexIsTakenBy('x', forkCombination[1])) {
      var forkCorner = this.getForkCornerIndex(forkCombination);
      if(forkCorner) {
        this.board.clickIndex(forkCorner);
        blocked = true;
      }
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
      this.board.clickIndex(cornerIndex);
      playedCorner = true;
      break;
    }
  }

  return playedCorner;
};

Opponent.prototype.playEdge = function() {
  var playedEdge = false;

  for(var i = 0; i < Opponent.edges.length; i++) {
    var edgeIndex = Opponent.edges[i];
    if(this.board.indexIsOpen(edgeIndex)) {
      this.board.clickIndex(edgeIndex);
      playedEdge = true;
      break;
    }
  }

  return playedEdge;
};

Opponent.prototype.winningIndexFor = function(marker, combination) {
  var winningIndex = null;

  var cellsMarked = _.reduce(combination, _.bind(function(total, index) {
    var newTotal = total;

    if(this.board.indexIsTakenBy(marker, index)) {
      newTotal++;
    }

    return newTotal;
  }, this), 0);

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

Opponent.prototype.getForkCornerIndex = function(forkCombination) {
  var forkCorner = null;

  if(_.isEqual(forkCombination, [1, 5]) && this.board.indexIsOpen(2)) {
    forkCorner = 2;
  } else if(_.isEqual(forkCombination, [5, 7]) && this.board.indexIsOpen(8)) {
    forkCorner = 8;
  } else if(_.isEqual(forkCombination, [3, 7]) && this.board.indexIsOpen(6)) {
    forkCorner = 6;
  } else if(_.isEqual(forkCombination, [1, 3]) && this.board.indexIsOpen(0)) {
    forkCorner = 0;
  }

  return forkCorner;
};
