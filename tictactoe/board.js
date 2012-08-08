Board = function() {
  this.data = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
};

Board.cellCount = 9;

Board.prototype.covered = function() {
  markers = _.compact(this.data);
  return markers.length == Board.cellCount;
};
