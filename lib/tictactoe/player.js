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

Player.prototype.play = function(opponentMarker) {
  var played = this.win() ||
  this.blockWin(opponentMarker) ||
  this.fork() ||
  this.blockSuperFork(opponentMarker) ||
  this.blockFork(opponentMarker) ||
  this.playCenter() ||
  this.playOppositeCorner(opponentMarker) ||
  this.playCorner() ||
  this.playEdge();

  if(!played) {
    throw('Player did not play. Maybe they could not take the pressure.');
  }
};

Player.prototype.clickIndex = function(cellIndex) {
  this.boardElement.find('td').eq(cellIndex).click();
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

Player.prototype.blockWin = function(opponentMarker) {
  var blocked = false;

  _.each(Board.winningCombinations, function(combination) {
    if(!blocked) {
      var winningIndex = this.winningIndexFor(opponentMarker, combination);
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

  var forkKeystone = this.forkKeystone(this.marker);
  if(forkKeystone) {
    this.clickIndex(forkKeystone);
    forked = true;
  }

  return forked;
};

Player.prototype.blockSuperFork = function(opponentMarker) {
  var blocked = false;

  _.each(Board.oppositeCorners, function(corners) {
    if(this.board.indexIsTakenBy(opponentMarker, corners[0]) &&
        this.board.indexIsTakenBy(opponentMarker, corners[1])) {
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

Player.prototype.blockFork = function(opponentMarker) {
  var blocked = false;

  var forkKeystone = this.forkKeystone(opponentMarker);
  if(forkKeystone) {
    this.clickIndex(forkKeystone);
    blocked = true;
  }

  return blocked;
};

Player.prototype.playCenter = function() {
  var playedCenter = false;

  if(this.board.indexIsOpen(4)) {
    this.clickIndex(4);
    playedCenter = true;
  }

  return playedCenter;
};

Player.prototype.playOppositeCorner = function(opponentMarker) {
  var playedCorner = false;

  _.each(Board.oppositeCorners, function(corners) {
    if(!playedCorner) {
      if(this.board.indexIsTakenBy(opponentMarker, corners[0]) &&
          this.board.indexIsOpen(corners[1])) {
        this.clickIndex(corners[1]);
        playedCorner = true;
      } else if(this.board.indexIsTakenBy(opponentMarker, corners[1]) &&
          this.board.indexIsOpen(corners[0])) {
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
    if(this.board.indexIsTakenBy(marker, index)) {
      total++;
    }
    return total;
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

Player.prototype.forkKeystone = function(marker) {
  var keystone = null;

  _.each(Player.forkRules, function(forkRule) {
    if(!keystone &&
        this.board.indexIsTakenBy(marker, forkRule.edges[0]) &&
        this.board.indexIsTakenBy(marker, forkRule.edges[1]) &&
        this.board.indexIsOpen(forkRule.corners[0]) &&
        this.board.indexIsOpen(forkRule.corners[1]) &&
        this.board.indexIsOpen(forkRule.keystone)) {
      keystone = forkRule.keystone;
    }
  }, this);

  return keystone;
};
