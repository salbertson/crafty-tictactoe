describe('Game', function() {
  var game;

  beforeEach(function() {
    loadFixtures('board.html');
    game = new Game($('#board'));
  });

  describe('when board cell is clicked', function() {
    it('places marker on board', function() {
      var cellElement = $('#board td').first()
      cellElement.click();
      expect(cellElement).toHaveText('x');
    });
  });
});
