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
      board.placeMarker('x', 0, 0);
      spyOn(board, 'clickCell');
    });

    it('clicks first available cell', function() {
      opponent.play(board);
      expect(board.clickCell).toHaveBeenCalledWith(0, 1);
    });
  });
});
