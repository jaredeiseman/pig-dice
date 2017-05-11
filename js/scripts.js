// Business Logic
// var game = {
//   players: [{
//               totalScore = 0;
//               playerNumber = playerNumber;
//               runScore = [];
//             },
//             {
//               totalScore = 0;
//               playerNumber = playerNumber;
//               runScore = [];
//             }],
//   activePlayer: 0,
//   winningScore: 60
// }


// Constructor for Game
  // properties: players, activePlayers, winningScore
  // this.activePlayer begins at index 0 (player 1) activePlayer is index of player who's turn it is
function Game () {
  this.players = [];
  this.activePlayer = 0;
  this.winningScore = 100;
}

// Constructor for players
  // properties: totalScore, playerNumber, runScore
function Player (playerNumber) {
  this.totalScore = 0;
  this.playerNumber = playerNumber;
  this.runScore = [];
  this.recentRoll = 0;
}

// player prototype to roll Dice
Player.prototype.roll = function() {
  // generate a random # between 1 and 6 and return it
  return Math.floor((Math.random() * 6) + 1);
}

// player prototype to add up the run score array
Array.prototype.accumulateArray = function() {
  var result = 0;
  // loop over array adding each index to a result, return the result
  this.forEach(function(number) {
    result += number;
  });
  return result;
}

// Game prototype to switch the active player
Game.prototype.switchActive = function() {
  if (this.activePlayer === 0) {
    this.activePlayer = 1;
  } else {
    this.activePlayer = 0;
  }
}

// Game proto to check the players scores and see if someone has won
Game.prototype.checkForWinner = function() {
  if (this.players[this.activePlayer].totalScore >= this.winningScore) {
    return this.activePlayer;
  } else {
    return false;
  }
}

// Player prototype for taking a turn
// takes in if it's a roll or hold
Player.prototype.turn = function(game, action) {
  // if roll it rolls
  if (action === "roll") {
    var rollValue = this.roll();
    this.recentRoll = rollValue;
    // if 1, set run to 0 and end the turn switching the active player
    if (rollValue === 1) {
      //empty the runScore array
      this.runScore = [];
      return false;
    } else {
      // if not 1, add roll to runScore
      this.runScore.push(rollValue);
    }
  }
  // if hold
  if (action === "hold") {
    // add run score to totalScore
    var totalRunScore = this.runScore.accumulateArray();
    this.totalScore += totalRunScore;
    this.runScore = [];
    var potentialWinner = game.checkForWinner();
    if (potentialWinner === 0 || potentialWinner === 1) {
      return game.checkForWinner();
    }
  }
}

// User Interface Logic
$(document).ready(function() {
  //construct our game
  var game = new Game();
  game.players.push(new Player(1));
  game.players.push(new Player(2));
  //click event for roll and hold button
  $('button').click(function() {
    //when the button is clicked, run the players turn
    var action = $(this).prop("name");
    var turnResult = game.players[game.activePlayer].turn(game, action);
    $('#dice').effect("shake", { times: 5 }, 300);
    $('.recent').text(game.players[game.activePlayer].recentRoll);
    //if the hold button was the one clicked
    if (action === "hold") {
      //update the total score on the page
      $('#' + game.activePlayer).find('h4.run-score').text("0");
      $('#' + game.activePlayer).find('h4.total').text(game.players[game.activePlayer].totalScore);
      //check the retuned value from the turn for if it was a winner
      //if winner, display to page some how
      //switch the active player
      game.switchActive();
      if (turnResult === 0) {
        $('#game').hide();
        $('.winner').text("1");
        $('#win-screen').fadeIn('slow');
      } else if (turnResult === 1) {
        $('#game').hide();
        $('.winner').text("2");
        $('#win-screen').fadeIn('slow');
      }
    } else {
      //if it was the roll button that was clicked
      $('#' + game.activePlayer).find('h4.run-score').text(game.players[game.activePlayer].runScore.accumulateArray());
      //update the run score
      if (turnResult === false) {
        game.switchActive();
      }
    }
    if (game.activePlayer === 1) {
      $('#0').find('button').each(function() {
        $(this).prop('disabled', true);
        $(this).removeClass('spin');
      });
      $('#1').find('button').each(function() {
        $(this).prop('disabled', false);
        $(this).addClass('spin');
      });
    } else {
      $('#1').find('button').each(function() {
        $(this).prop('disabled', true);
        $(this).removeClass('spin');
      });
      $('#0').find('button').each(function() {
        $(this).prop('disabled', false);
        $(this).addClass('spin');
      });
    }
  });
});
