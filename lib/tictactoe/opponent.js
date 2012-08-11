Opponent = function(marker) {
  this.marker = marker;
};

Opponent.prototype.play = function(board) {
  this.board = board;

  var played = this.win() ||
  this.blockWin() ||
  this.blockSuperFork() ||
  this.blockFork() ||
  this.playCenter() ||
  this.playCorner() ||
  this.playEdge();

  if(!played) {
    throw('Opponent did not play, could not take the pressure.');
  }
};

Opponent.prototype.win = function() {
  var won = false;

  for(var i = 0; i < Board.winningCombinations.length; i++) {
    var winningIndex = this.winningIndex(Board.winningCombinations[i]);
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

  for(var i = 0; i < Board.winningCombinations.length; i++) {
    var losingIndex = this.losingIndex(Board.winningCombinations[i]);
    if(losingIndex) {
      this.board.clickIndex(losingIndex);
      blocked = true;
      break;
    }
  }

  return blocked;
};

Opponent.prototype.blockSuperFork = function() {
  var blocked = false;

  _.each(Board.oppositeCorners, function(corners) {
    if(this.indexTakenByOtherPlayer(corners[0]) &&
        this.indexTakenByOtherPlayer(corners[1])) {
      _.each(Board.edges, function(edge) {
        if(!blocked && this.board.indexIsOpen(edge)) {
          this.board.clickIndex(edge);
          blocked = true;
        }
      }, this);
    }
  }, this);

  return blocked;
};

Opponent.prototype.blockFork = function() {
  var blocked = false;

  for(var i = 0; i < Board.forkCombinations.length; i++) {
    var forkCombination = Board.forkCombinations[i];

    if(this.indexTakenByOtherPlayer(forkCombination[0]) &&
        this.indexTakenByOtherPlayer(forkCombination[1])) {
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

  for(var i = 0; i < Board.corners.length; i++) {
    var cornerIndex = Board.corners[i];
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

  for(var i = 0; i < Board.edges.length; i++) {
    var edgeIndex = Board.edges[i];
    if(this.board.indexIsOpen(edgeIndex)) {
      this.board.clickIndex(edgeIndex);
      playedEdge = true;
      break;
    }
  }

  return playedEdge;
};

Opponent.prototype.winningIndex = function(combination) {
  var winningIndex = null;

  var cellsMarked = _.reduce(combination, _.bind(function(total, index) {
    var newTotal = total;

    if(this.board.indexIsTakenBy(this.marker, index)) {
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

Opponent.prototype.losingIndex = function(combination) {
  var losingIndex = null;

  var cellsMarked = _.reduce(combination, _.bind(function(total, index) {
    var newTotal = total;

    if(this.indexTakenByOtherPlayer(index)) {
      newTotal++;
    }

    return newTotal;
  }, this), 0);

  if(cellsMarked == 2) {
    for(var i = 0; i < combination.length; i++) {
      if(this.board.indexIsOpen(combination[i])) {
        losingIndex = combination[i];
        break;
      }
    }
  }

  return losingIndex;
};

Opponent.prototype.indexTakenByOtherPlayer = function(index) {
  return !this.board.indexIsOpen(index) && !this.board.indexIsTakenBy(this.marker, index);
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
