Board = function() {
  this.data = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  this.cellSelectedCallbacks = [];
  this.template = $('#board-template').html();
};

Board.edgeCount = 3;
Board.cellCount = 9;

Board.prototype.render = function(destination) {
  this.boardElement = $(this.template);
  this.boardElement.click(this.cellSelected.bind(this));
  $(destination).append(this.boardElement);
};

Board.prototype.subscribeToCellSelection = function(callback) {
  this.cellSelectedCallbacks.push(callback);
};

Board.prototype.placeMarker = function(marker, row, column) {
  this.data[row][column] = marker;
  this.boardElement.find('tr').eq(row).find('td').eq(column).html(marker);
};

Board.prototype.covered = function() {
  markers = _.chain(this.data).flatten().compact().value();
  return markers.length == Board.cellCount;
};

Board.prototype.clickCell = function(row, column) {
  this.boardElement.find('tr').eq(row).find('td').eq(column).click();
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

Board.prototype.indexIsOpen = function(index) {
  var cellStates = _.flatten(this.data);
  return !cellStates[index];
};

Board.prototype.indexIsTakenBy = function(marker, index) {
  var cellStates = _.flatten(this.data);
  return cellStates[index] == marker;
};

Board.prototype.rowFromIndex = function(index) {
  return Math.floor(index / Board.edgeCount);
};

Board.prototype.columnFromIndex = function(index) {
  return index % Board.edgeCount;
};
