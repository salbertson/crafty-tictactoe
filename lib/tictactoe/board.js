Board = function() {
  this.data = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  this.cellSelectedCallbacks = [];
};

Board.cellCount = 9;

Board.prototype.initialize = function() {
  this.boardElement = $('#board');
  this.boardElement.click(this.cellSelected.bind(this));
};

Board.prototype.covered = function() {
  markers = _.chain(this.data).flatten().compact().value();
  return markers.length == Board.cellCount;
};

Board.prototype.placeMarker = function(marker, row, column) {
  this.data[row][column] = marker;
  this.boardElement.find('tr').eq(row).find('td').eq(column).html(marker);
};

Board.prototype.subscribeToCellSelection = function(callback) {
  this.cellSelectedCallbacks.push(callback);
};

Board.prototype.cellSelected = function(event) {
  var cell = event.target;
  var row = this.cellRow(cell);
  var column = this.cellColumn(cell);

  _.each(this.cellSelectedCallbacks, function(callback) {
    callback(row, column);
  });
};

Board.prototype.cellColumn = function(cell) {
  var row = cell.parentElement;
  return _.indexOf(row.children, cell);
};

Board.prototype.cellRow = function(cell) {
  var row = cell.parentElement;
  return _.indexOf(row.parentElement.children, row);
};
