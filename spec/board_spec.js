describe('Board', function() {
  var board;

  beforeEach(function() {
    loadFixtures('board.html');
    board = new Board();
    board.initialize();
  });

  describe('#covered', function() {
    describe('with empty board', function() {
      it('returns false', function() {
        expect(board.covered()).toBe(false);
      });
    });

    describe('with covered board', function() {
      beforeEach(function() {
        _.times(3, function(row) {
          _.times(3, function(column) {
            board.placeMarker('x', row, column);
          });
        });
      });

      it('returns true', function() {
        expect(board.covered()).toBe(true);
      });
    });
  });

  describe('#placeMarker', function() {
    it('displays marker in cell', function() {
      board.placeMarker('x', 0, 1);
      expect($('#board td').eq(1)).toHaveText('x');
    });
  });

  describe('cell selected event', function() {
    describe('with subscription to cell selection', function() {
      var cellSelectedCallback;

      beforeEach(function() {
        cellSelectedCallback = jasmine.createSpy();
        board.subscribeToCellSelection(cellSelectedCallback);
      });

      it('publishes cell selection', function() {
        $('#board td').eq(1).click();
        expect(cellSelectedCallback).toHaveBeenCalledWith(0, 1);
      });
    });
  });
});
