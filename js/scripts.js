


function Player(name) {
  this.name = name;
  this.score = 0;
  this.gamesWon = 0;
}

function Game() {
  this.players = [];
  this.isOver = true;
  this.winner = null;
  this.currentPlayer = 0;
  this.turnScore = 0;
  this.lastRoll = 0;
}

Game.prototype.compTurn = function () {
  var computerPlayer = this.players[this.currentPlayer];
  var rolledOne = false;
  while (!rolledOne && this.turnScore < 9 && !this.isOver) {
    if (computerPlayer.score >= 100) {
      return null;
    }
    rolledOne = game.takeTurn(computerPlayer);
  }
  game.endTurn(computerPlayer);
};

Game.prototype.nextPlayer = function () {
  if (this.isOver) {
    console.log("WINNER!");
    this.turnScore = 0;
    this.currentPlayer = 0;
  } else {
    if (this.currentPlayer === this.players.length - 1) {
      this.currentPlayer = 0;
    } else {
      this.currentPlayer++;
    }
  }
  if (this.players[this.currentPlayer].name === "COMP") {
    this.compTurn();
  }
};

Game.prototype.takeTurn = function (player) {
  var diceRoll = this.rollDice();
  console.log(`${player.name} rolled ${diceRoll}`);
  if (diceRoll === 1) {
    this.turnScore = 0;
    console.log(`${player.name} rolled a 1!`);
    this.nextPlayer();
    return true;
  } else {
    this.turnScore += diceRoll;
  }
  return false;
};

Game.prototype.endTurn = function (player) {
  console.log(`${player.name} ended turn and got ${this.turnScore}`);
  player.score += this.turnScore;
  this.turnScore = 0;
  if (player.score >= 100) {
    this.winner = player;
    this.isOver = true;
    this.turnScore = 0;
  }
  this.nextPlayer();
  return null;
};

Game.prototype.rollDice = function () {
  var newRoll = Math.floor(Math.random() * 6) +1;
  this.lastRoll = newRoll;
  return newRoll;// return 1-6
};

Game.prototype.getScores = function () {
  var scores = [];
  this.players.forEach(function(player) {
    scores.push([player.name, player.score]);
  });
  return scores;
};


// var player1 = new Player("Sam");
// var player2 = new Player("Sue");
var game = new Game();
// game.players.push(player1, player2);
// console.log(game);




$(document).ready(function() {

  $(".new-player").submit(function(event) {
    event.preventDefault();
  })

  function buildPlayer(newPlayerName) {
    var newPlayer = new Player(newPlayerName);
    game.players.push(newPlayer);
    $("#nameInput").val("");
  }

  function buildCurrentScore() {
    var scoreArray = game.getScores();
    var result = "<p>";
    var allScores = scoreArray.map(function(score) {
      return `[ ${score[0]}: ${score[1]} ]`;
    })
    result += allScores.join("  ");
    return result += "</p>"
  }

  function refresh() {
    var playerName = game.players[game.currentPlayer].name;
    if (game.isOver) {
      alert(`${game.winner.name} WON!!!`);
      $(".start").fadeIn();
      $(".play").hide();
      $(".running-totals").hide();
    }
    $(".running-totals").text('');
    var currentScores = buildCurrentScore();
    $(".running-totals").append(currentScores);
    $("#activePlayerName").text(playerName);
    $("#turnScore").text(game.turnScore);
    $(".lastRoll").hide();
    $(".lastRoll").text('');
    if (game.lastRoll != 0) {
      $(".lastRoll").append(`<img src="img/${game.lastRoll}.png" alt="Dice ${game.lastRoll}">`);
    }
    $(".lastRoll").fadeIn();
  }

  $("#addNext").click(function() {
    var newPlayerName = $("#nameInput").val();
    if (newPlayerName) {
      buildPlayer(newPlayerName);
      $("#go").show();
    }
  })

  $("#go").click(function(){
    var newPlayerName = $("#nameInput").val();
    if (newPlayerName) {
      buildPlayer(newPlayerName);
    }
    game.isOver = false;
    $(".start").hide();
    $(".play").fadeIn();
    $(".running-totals").fadeIn();
    refresh();
  })

  $("#roll").click(function(){
    var player = game.players[game.currentPlayer];
    var isOne = game.takeTurn(player);
    if (isOne) {
      alert("You rolled a 1!!! Next player's turn!");
      game.lastRoll = 0;
    }
    refresh();
  })

  $("#hold").click(function(){
    var player = game.players[game.currentPlayer];
    game.endTurn(player);
    game.lastRoll = 0;
    refresh();
  })

});
