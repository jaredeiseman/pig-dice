// Business Logic
// Constructor for Game
  // properties: players, activePlayers, winningScore
function Game () {
  this.players = [];
  this.activePlayer = {};
  this.winningScore = 60;
}

// Constructor for players
  // properties: totalScore, playerNumber, runScore
function Player (playerNumber) {
  this.totalScore = 0;
  this.playerNumber = playerNumber;
  this.runScore = [];
}

// player prototype to roll Dice
  // generate a random # between 1 and 6 and return it
Player.prototype.roll = function() {
  return Math.floor((Math.random() * 6) + 1);
}

// player prototype to add up the run score array
  // loop over array adding each index to a result, return the result

// Game prototype to switch the active player

// Game proto to check the players scores and see if someone has won

// Player prototype for taking a turn
// takes in if it's a roll or hold
// if roll it rolls
// if 1, set run to 0 and end the turn switching the active player
// if not 1, add roll to runScore
// if hold
// add run score to totalScore
// switch the active player
//returns something?

// User Interface Logic
