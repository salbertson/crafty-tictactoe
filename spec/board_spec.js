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
  });

  describe('#placeMarker', function() {
    describe('in one cell', function() {
      beforeEach(function() {
        board.placeMarker('x', 0, 0);
      });

      it('does not cover the board', function() {
        expect(board.covered()).toBe(false);
      });
    });

    describe('in every cell', function() {
      beforeEach(function() {
        _.times(3, function(row) {
          _.times(3, function(column) {
            board.placeMarker('x', row, column);
          });
        });
      });

      it('covers the board', function() {
        expect(board.covered()).toBe(true);
      });
    });
  });
});
