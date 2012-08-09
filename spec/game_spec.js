describe('Game', function() {
  var game, board;

  beforeEach(function() {
    loadFixtures('board.html');
    board = $('#board');
    game = new Game();
    game.play(board);
  });

  describe('board cell is clicked', function() {
    it('places x marker on board', function() {
      var cell = board.find('td').first();
      cell.click();
      expect(cell).toHaveText('x');
    });

    describe('then clicked again', function() {
      beforeEach(function() {
        board.find('td').first().click();
      });

      it('places o marker on board', function() {
        var cell = board.find('td').eq(3);
        cell.click();
        expect(cell).toHaveText('o');
      });
    });
  });

  describe('board is covered', function() {
    beforeEach(function() {
      spyOn(window, 'alert');

      _.times(9, function(cellIndex) {
        board.find('td').eq(cellIndex).click();
      });
    });

    it('alerts players that game is over', function() {
      expect(window.alert).toHaveBeenCalled();
    });
  });
});
