Game = function(boardElement) {
  $(boardElement).click($.proxy(function(event) {
    var columnElement = event.target;
    var rowElement = columnElement.parentElement;

    var columnIndex = _.indexOf(rowElement.children, columnElement);
    var rowIndex = _.indexOf(rowElement.parentElement.children, rowElement);

    $(columnElement).html('x');
  }, this));
};
