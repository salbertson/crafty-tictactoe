describe('Referee', function() {
  var referee, board, element;

  beforeEach(function() {
    loadFixtures('board.html');
    referee = new Referee();
    board = new Board();
    board.render(document.body);
    element = $('#board');
  });

  afterEach(function() {
    element.remove();
  });

  describe('#checkWin', function() {
    describe('with winning combination', function() {
      beforeEach(function() {
        board.placeMarker('x', 0, 0);
        board.placeMarker('x', 0, 1);
        board.placeMarker('x', 0, 2);
      });

      it('return true', function() {
        expect(referee.checkWin('x', board)).toBe(true);
      });
    });

    describe('without winning combination', function() {
      beforeEach(function() {
        board.placeMarker('x', 0, 0);
        board.placeMarker('x', 0, 1);
        board.placeMarker('o', 0, 2);
      });

      it('return false', function() {
        expect(referee.checkWin('x', board)).toBe(false);
      });
    });
  });
});