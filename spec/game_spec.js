describe('Game', function() {
  var game, board;

  beforeEach(function() {
    loadFixtures('board.html');
    game = new Game();
    game.play();
    board = $('#board');
  });

  afterEach(function() {
    board.remove();
  });

  describe('board cell is clicked', function() {
    it('places x marker on board', function() {
      var cell = board.find('td').first();
      cell.click();
      expect(cell).toHaveText('x');
    });

    it('places o marker on board', function() {
      var cell = board.find('td').first();
      cell.click();
      expect(board.find('td').eq(4)).toHaveText('o');
    });

    describe('and same cell is clicked again', function() {
      beforeEach(function() {
        spyOn(window, 'alert');
      });

      it('alerts player', function() {
        var cell = board.find('td').first();
        cell.click();
        cell.click();
        expect(window.alert).toHaveBeenCalled();
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
