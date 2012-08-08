describe('Game', function() {
  var game, board;

  beforeEach(function() {
    loadFixtures('board.html');
    board = $('#board');
    game = new Game(board);
  });

  describe('board cell is clicked', function() {
    it('places x marker on board', function() {
      var cell = board.find('td').first();
      cell.click();
      expect(cell).toHaveText('x');
    });

    describe('when a board cell has already been clicked', function() {
      beforeEach(function() {
        board.find('td').first().click();
      });

      it('places y marker on board', function() {
        var cell = board.find('td').eq(3);
        cell.click();
        expect(cell).toHaveText('y');
      });
    });
  });
});
