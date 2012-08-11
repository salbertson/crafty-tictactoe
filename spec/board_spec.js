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

  describe('#placeMarker', function() {
    it('displays marker in cell', function() {
      board.placeMarker('x', 0, 1);
      expect(board.data[0][1]).toBe('x');
    });

    it('returns true', function() {
      expect(board.placeMarker('x', 0, 1)).toBe(true);
    });

    describe('twice for the same cell', function() {
      it('returns false', function() {
        board.placeMarker('x', 0, 1);
        expect(board.placeMarker('x', 0, 1)).toBe(false);
      });
    });
  });
});
