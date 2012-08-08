Board = function() {
  this.data = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
};

Board.cellCount = 9;

Board.prototype.covered = function() {
  markers = _.chain(this.data).flatten().compact().value();
  return markers.length == Board.cellCount;
};

Board.prototype.placeMarker = function(marker, row, column) {
  this.data[row][column] = marker;
};
