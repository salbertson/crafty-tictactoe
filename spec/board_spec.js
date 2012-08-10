describe('Board', function() {
  var board, element;

  beforeEach(function() {
    loadFixtures('board.html');
    board = new Board();
    board.render(document.body);
    element = $('#board');
  });

  afterEach(function() {
    element.remove();
  });

  describe('#covered', function() {
    describe('with empty board', function() {
      it('returns false', function() {
        expect(board.covered()).toBe(false);
      });
    });

    describe('with covered board', function() {
      beforeEach(function() {
        _.times(3, function(row) {
          _.times(3, function(column) {
            board.placeMarker('x', row, column);
          });
        });
      });

      it('returns true', function() {
        expect(board.covered()).toBe(true);
      });
    });
  });

  describe('#placeMarker', function() {
    it('displays marker in cell', function() {
      board.placeMarker('x', 0, 1);
      expect(element.find('td').eq(1)).toHaveText('x');
    });

    it('returns true', function() {
      expect(board.placeMarker('x', 0, 1)).toBe(true);
    });

    describe('twice for the same cell', function() {
      it('returns false', function() {
        board.placeMarker('x', 0, 1);
        expect(board.placeMarker('x', 0, 1)).toBe(false);
      });
    });
  });

  describe('#clickCell', function() {
    var cell, clickTriggered;

    beforeEach(function() {
      clickTriggered = false;
      cell = element.find('tr').eq(0).find('td').eq(2);
      cell.click(function() {
        clickTriggered = true;
      });
    });

    it('clicks cell for given row and column', function() {
      board.clickCell(0, 2);

      waitsFor(function() {
        return clickTriggered;
      }, 'cell element to be clicked');
    });
  });

  describe('cell selected event', function() {
    describe('with subscription to cell selection', function() {
      var cellSelectedCallback;

      beforeEach(function() {
        cellSelectedCallback = jasmine.createSpy();
        board.subscribeToCellSelection(cellSelectedCallback);
      });

      it('publishes cell selection', function() {
        element.find('td').eq(1).click();
        expect(cellSelectedCallback).toHaveBeenCalledWith(0, 1);
      });
    });
  });
});
