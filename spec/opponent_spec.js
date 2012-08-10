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
});
