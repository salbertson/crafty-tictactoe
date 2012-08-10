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

Board.corners = [0, 2, 6, 8];
Board.edges = [1, 3, 5, 7];
Board.winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
  [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];
Board.forkCombinations = [
  [1, 5], [5, 7], [3, 7], [1, 3]
];

Board.prototype.render = function(destination) {
  this.boardElement = $(this.template);
  this.boardElement.click(_.bind(this.cellSelected, this));
  $(destination).append(this.boardElement);
};

Board.prototype.subscribeToCellSelection = function(callback) {
  this.cellSelectedCallbacks.push(callback);
};

Board.prototype.placeMarker = function(marker, row, column) {
  var markerPlaced = false;

  if(!this.data[row][column]) {
    this.data[row][column] = marker;
    this.boardElement.find('tr').eq(row).find('td').eq(column).html(marker);
    markerPlaced = true;
  }

  return markerPlaced;
};

Board.prototype.covered = function() {
  markers = _.chain(this.data).flatten().compact().value();
  return markers.length == Board.cellCount;
};

Board.prototype.clickCell = function(row, column) {
  this.boardElement.find('tr').eq(row).find('td').eq(column).click();
};

Board.prototype.clickIndex = function(cellIndex) {
  this.clickCell(
    this.rowFromIndex(cellIndex),
    this.columnFromIndex(cellIndex)
  );
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

Board.prototype.cellIsOpen = function(row, column) {
  var cellStates = _.flatten(this.data);
  return !cellStates[index];
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
