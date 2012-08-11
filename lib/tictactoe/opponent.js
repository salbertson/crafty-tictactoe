Opponent = function(marker) {
  this.marker = marker;
};

Opponent.forkRules = [
  {
    edges: [1, 5],
    corners: [0, 8],
    keystone: 2
  }, {
    edges: [5, 7],
    corners: [2, 6],
    keystone: 8
  }, {
    edges: [3, 7],
    corners: [0, 8],
    keystone: 6
  }, {
    edges: [1, 3],
    corners: [2, 6],
    keystone: 0
  }
];


Opponent.prototype.play = function(board) {
  this.board = board;

  var played = this.win() ||
  this.blockWin() ||
  this.fork() ||
  this.blockSuperFork() ||
  this.blockFork() ||
  this.playCenter() ||
  this.playOppositeCorner() ||
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

Opponent.prototype.fork = function() {
  var forked = false;

  _.each(Opponent.forkRules, function(forkRule) {
    if(this.board.indexIsTakenBy(this.marker, forkRule.edges[0]) &&
        this.board.indexIsTakenBy(this.marker, forkRule.edges[1]) &&
        this.board.indexIsOpen(forkRule.corners[0]) &&
        this.board.indexIsOpen(forkRule.corners[1])) {
      if(!forked) {
        this.board.clickIndex(forkRule.keystone);
        forked = true;
      }
    }
  }, this);

  return forked;
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

  _.each(Opponent.forkRules, function(forkRule) {
    if(this.indexTakenByOtherPlayer(forkRule.edges[0]) &&
        this.indexTakenByOtherPlayer(forkRule.edges[1]) &&
        this.board.indexIsOpen(forkRule.corners[0]) &&
        this.board.indexIsOpen(forkRule.corners[1])) {
      if(!blocked) {
        this.board.clickIndex(forkRule.keystone);
        blocked = true;
      }
    }
  }, this);

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

Opponent.prototype.playOppositeCorner = function() {
  var playedCorner = false;

  _.each(Board.oppositeCorners, function(corners) {
    if(!playedCorner) {
      if(this.indexTakenByOtherPlayer(corners[0]) && this.board.indexIsOpen(corners[1])) {
        this.board.clickIndex(corners[1]);
        playedCorner = true;
      } else if(this.indexTakenByOtherPlayer(corners[1]) && this.board.indexIsOpen(corners[0])) {
        this.board.clickIndex(corners[0]);
        playedCorner = true;
      }
    }
  }, this);

  return playedCorner;
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
  return !this.board.indexIsOpen(index) &&
    !this.board.indexIsTakenBy(this.marker, index);
};
