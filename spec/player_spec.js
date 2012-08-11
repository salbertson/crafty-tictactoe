describe('Player', function() {
  var board, player;

  beforeEach(function() {
    loadFixtures('board.html');
    board = new Board();
    player = new Player('o', board, $('#board'));
  });

  afterEach(function() {
    $('#board').remove();
  });

  describe('#play', function() {
    beforeEach(function() {
      spyOn(player, 'clickCell');
    });

    describe('when x plays edge', function() {
      beforeEach(function() {
        board.placeMarker('x', 1, 0);
      });

      it('player plays center', function() {
        player.play(board);
        expect(player.clickCell).toHaveBeenCalledWith(1, 1);
      });
    });

    describe('when x plays center', function() {
      beforeEach(function() {
        board.placeMarker('x', 1, 1);
      });

      it('player plays corner', function() {
        player.play(board);
        expect(player.clickCell).toHaveBeenCalledWith(0, 0);
      });
    });
  });

  describe('#blockFork', function() {
    describe('with open fork corner', function() {
      beforeEach(function() {
        board.placeMarker('x', 0, 1);
        board.placeMarker('x', 1, 2);
        spyOn(player, 'clickCell');
      });

      it('player blocks fork', function() {
        player.board = board;
        player.blockFork();
        expect(player.clickCell).toHaveBeenCalledWith(0, 2);
      });
    });
  });
});
