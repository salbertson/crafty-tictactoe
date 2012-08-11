Player = function(marker, board, boardElement) {
  this.marker = marker;
  this.board = board;
  this.boardElement = boardElement;
};

Player.forkRules = [
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

Player.prototype.play = function() {
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
    throw('Player did not play. Maybe they could not take the pressure.');
  }
};

Player.prototype.clickCell = function(row, column) {
  this.boardElement.find('tr').eq(row).find('td').eq(column).click();
};

Player.prototype.clickIndex = function(cellIndex) {
  this.clickCell(
    this.board.rowFromIndex(cellIndex),
    this.board.columnFromIndex(cellIndex)
  );
};

Player.prototype.win = function() {
  var won = false;

  _.each(Board.winningCombinations, function(combination) {
    if(!won) {
      var winningIndex = this.winningIndexFor(this.marker, combination);
      if(winningIndex) {
        this.clickIndex(winningIndex);
        won = true;
      }
    }
  }, this);

  return won;
};

Player.prototype.blockWin = function() {
  var blocked = false;

  _.each(Board.winningCombinations, function(combination) {
    if(!blocked) {
      var winningIndex = this.winningIndexFor('x', combination);
      if(winningIndex) {
        this.clickIndex(winningIndex);
        blocked = true;
      }
    }
  }, this);

  return blocked;
};

Player.prototype.fork = function() {
  var forked = false;

  _.each(Player.forkRules, function(forkRule) {
    if(this.board.indexIsTakenBy(this.marker, forkRule.edges[0]) &&
        this.board.indexIsTakenBy(this.marker, forkRule.edges[1]) &&
        this.board.indexIsOpen(forkRule.corners[0]) &&
        this.board.indexIsOpen(forkRule.corners[1]) &&
        this.board.indexIsOpen(forkRule.keystone)) {
      if(!forked) {
        this.clickIndex(forkRule.keystone);
        forked = true;
      }
    }
  }, this);

  return forked;
};

Player.prototype.blockSuperFork = function() {
  var blocked = false;

  _.each(Board.oppositeCorners, function(corners) {
    if(this.indexTakenByOtherPlayer(corners[0]) &&
        this.indexTakenByOtherPlayer(corners[1])) {
      _.each(Board.edges, function(edge) {
        if(!blocked && this.board.indexIsOpen(edge)) {
          this.clickIndex(edge);
          blocked = true;
        }
      }, this);
    }
  }, this);

  return blocked;
};

Player.prototype.blockFork = function() {
  var blocked = false;

  _.each(Player.forkRules, function(forkRule) {
    if(this.indexTakenByOtherPlayer(forkRule.edges[0]) &&
        this.indexTakenByOtherPlayer(forkRule.edges[1]) &&
        this.board.indexIsOpen(forkRule.corners[0]) &&
        this.board.indexIsOpen(forkRule.corners[1]) &&
        this.board.indexIsOpen(forkRule.keystone)) {
      if(!blocked) {
        this.clickIndex(forkRule.keystone);
        blocked = true;
      }
    }
  }, this);

  return blocked;
};

Player.prototype.playCenter = function() {
  var playedCenter = false;

  if(this.board.indexIsOpen(4)) {
    this.clickCell(1, 1);
    playedCenter = true;
  }

  return playedCenter;
};

Player.prototype.playOppositeCorner = function() {
  var playedCorner = false;

  _.each(Board.oppositeCorners, function(corners) {
    if(!playedCorner) {
      if(this.indexTakenByOtherPlayer(corners[0]) && this.board.indexIsOpen(corners[1])) {
        this.clickIndex(corners[1]);
        playedCorner = true;
      } else if(this.indexTakenByOtherPlayer(corners[1]) && this.board.indexIsOpen(corners[0])) {
        this.clickIndex(corners[0]);
        playedCorner = true;
      }
    }
  }, this);

  return playedCorner;
};

Player.prototype.playCorner = function() {
  var playedCorner = false;

  for(var i = 0; i < Board.corners.length; i++) {
    var cornerIndex = Board.corners[i];
    if(this.board.indexIsOpen(cornerIndex)) {
      this.clickIndex(cornerIndex);
      playedCorner = true;
      break;
    }
  }

  return playedCorner;
};

Player.prototype.playEdge = function() {
  var playedEdge = false;

  for(var i = 0; i < Board.edges.length; i++) {
    var edgeIndex = Board.edges[i];
    if(this.board.indexIsOpen(edgeIndex)) {
      this.clickIndex(edgeIndex);
      playedEdge = true;
      break;
    }
  }

  return playedEdge;
};

Player.prototype.winningIndexFor = function(marker, combination) {
  var winningIndex = null;

  var cellsMarked = _.reduce(combination, _.bind(function(total, index) {
    var newTotal = total;

    if(this.board.indexIsTakenBy(marker, index)) {
      newTotal++;
    }

    return newTotal;
  }, this), 0);

  if(cellsMarked == 2) {
    _.each(combination, function(cell) {
      if(!winningIndex && this.board.indexIsOpen(cell)) {
        winningIndex = cell;
      }
    }, this);
  }

  return winningIndex;
};

Player.prototype.indexTakenByOtherPlayer = function(index) {
  return !this.board.indexIsOpen(index) &&
    !this.board.indexIsTakenBy(this.marker, index);
};
