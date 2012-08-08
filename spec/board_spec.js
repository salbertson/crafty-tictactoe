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
});
