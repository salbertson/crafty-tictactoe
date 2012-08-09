Game = function(boardElement) {
  this.roundsPlayed = 0;
  $(boardElement).click($.proxy(this.cellSelected, this));
};

Game.players = ['x', 'o'];

Game.prototype.cellSelected = function(event) {
  $(event.target).html(this.currentPlayer());
  this.roundsPlayed++;
};

Game.prototype.currentPlayer = function() {
  return Game.players[this.roundsPlayed % 2];
};
