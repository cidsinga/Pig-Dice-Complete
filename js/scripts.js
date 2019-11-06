


function Player(name) {
  this.name = name;
  this.score = 0;
  this.gamesWon = 0;
}

function Game() {
  this.players = [];
  this.isOver = false;
  this.winner = null;
  this.currentPlayer = 0;
  this.turnScore = 0;
}

Game.prototype.nextPlayer = function () {
  if (!isOver) {
    if (this.currentPlayer === players.length - 1) {
      this.currentPlayer = 0;
    } else {
      this.currentPlayer++;
    }
  }

};

Game.prototype.takeTurn = function (player) {
  var diceRoll = this.rollDice();
  if (diceRoll === 1) {
    this.turnScore = 0;
    this.nextPlayer();
  } else {
    this.turnScore += diceRoll;
  }
  return null;
};

Game.prototype.endTurn = function (player) {
  player.score += this.turnScore;
  if (player.score >= 100) {
    this.winner = player;
    this.isOver = true;
  }
  turnScore = 0;
  this.nextPlayer();
  return null;
};

Game.prototype.rollDice = function () {
  return Math.floor(Math.random() * 6) +1; // return 1-6
};


var game = new Game();
console.log(game.rollDice());





$(document).ready(function() {


});
