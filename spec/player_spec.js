describe('Player', function() {
  var board, player;

  beforeEach(function() {
    board = new Board();
    player = new Player('o', board, $('#board'));
  });

  afterEach(function() {
    $('#board').remove();
  });

  describe('#blockFork', function() {
    describe('with open fork corner', function() {
      beforeEach(function() {
        board.placeMarker('x', 0, 1);
        board.placeMarker('x', 1, 2);
        spyOn(player, 'clickIndex');
      });

      it('player blocks fork', function() {
        player.blockFork('x');
        expect(player.clickIndex).toHaveBeenCalledWith(2);
      });
    });
  });
});
