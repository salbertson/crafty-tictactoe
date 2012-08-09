describe('Board', function() {
  var board;

  beforeEach(function() {
    board = new Board();
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
});
