Board = function() {
  this.data = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
};

Board.edgeCount = 3;
Board.cellCount = 9;

Board.corners = [0, 2, 6, 8];
Board.oppositeCorners = [[0, 8], [2, 6]];
Board.edges = [1, 3, 5, 7];
Board.winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
  [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];
Board.forkCombinations = [
  [1, 5], [5, 7], [3, 7], [1, 3]
];

Board.prototype.placeMarker = function(marker, row, column) {
  var markerPlaced = false;

  if(!this.data[row][column]) {
    this.data[row][column] = marker;
    markerPlaced = true;
  }

  return markerPlaced;
};

Board.prototype.covered = function() {
  markers = _.chain(this.data).flatten().compact().value();
  return markers.length == Board.cellCount;
};

Board.prototype.indexIsOpen = function(index) {
  var cellStates = _.flatten(this.data);
  return !cellStates[index];
};

Board.prototype.indexIsTakenBy = function(marker, index) {
  var cellStates = _.flatten(this.data);
  return cellStates[index] == marker;
};
