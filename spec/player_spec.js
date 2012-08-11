describe('Player', function() {
  var board, player;

  beforeEach(function() {
    loadFixtures('board.html');
    board = new Board();
    board.render(document.body);
    player = new Player('o');
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

      it('player plays center', function() {
        player.play(board);
        expect(board.clickCell).toHaveBeenCalledWith(1, 1);
      });
    });

    describe('when x plays center', function() {
      beforeEach(function() {
        board.placeMarker('x', 1, 1);
      });

      it('player plays corner', function() {
        player.play(board);
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

      it('player blocks fork', function() {
        player.board = board;
        player.blockFork();
        expect(board.clickCell).toHaveBeenCalledWith(0, 2);
      });
    });
  });
});
