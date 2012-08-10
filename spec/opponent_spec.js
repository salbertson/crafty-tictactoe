describe('Opponent', function() {
  var board, opponent;

  beforeEach(function() {
    loadFixtures('board.html');
    board = new Board();
    board.render(document.body);
    opponent = new Opponent();
  });

  afterEach(function() {
    $('#board').remove();
  });

  describe('#play', function() {
    beforeEach(function() {
      spyOn(board, 'clickCell');
    });

    describe('when x plays edge', function() {
      beforeEach(function() {
        board.placeMarker('x', 1, 0);
      });

      it('opponent plays center', function() {
        opponent.play(board);
        expect(board.clickCell).toHaveBeenCalledWith(1, 1);
      });
    });

    describe('when x plays center', function() {
      beforeEach(function() {
        board.placeMarker('x', 1, 1);
      });

      it('opponent plays corner', function() {
        opponent.play(board);
        expect(board.clickCell).toHaveBeenCalledWith(0, 0);
      });
    });
  });

  describe('#blockFork', function() {
    describe('with open fork corner', function() {
      beforeEach(function() {
        board.placeMarker('x', 0, 1);
        board.placeMarker('x', 1, 2);
        spyOn(board, 'clickCell');
      });

      it('opponent blocks fork', function() {
        opponent.board = board;
        opponent.blockFork();
        expect(board.clickCell).toHaveBeenCalledWith(0, 2);
      });
    });

    describe('with fork corner taken', function() {
      beforeEach(function() {
        board.placeMarker('x', 0, 1);
        board.placeMarker('x', 0, 2);
        board.placeMarker('x', 1, 2);
        spyOn(board, 'clickCell');
      });

      it('opponent cannot block and should not click', function() {
        opponent.board = board;
        opponent.blockFork();
        expect(board.clickCell).not.toHaveBeenCalledWith(0, 2);
      });
    });
  });
});
