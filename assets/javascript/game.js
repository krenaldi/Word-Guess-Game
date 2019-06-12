// ############ GLOBAL VARIABLES ###############
// Create array that computer uses to select for play
var words = ["shinedown", "rival sons", "greta van fleet"];

// Var used to show how many guesses user has left
var guessesLeft = 6;

// Empty arrays that hold the keys the user pressed for guess  
var matchedLetters = [];
var guessedLetters = [];

// Empty array to hold the number of underscores for new word
//var underScores = [];

// Choose band from words array
var randNum = Math.floor(Math.random() * words.length);
var chosenWord = words[randNum].toLowerCase();

var underScores = chosenWord.split(" ");
console.log(chosenWord);


// Variables for DOM manipulation
var docUnderScore = document.querySelector("#underscores");
var docRightGuess = document.querySelector("#rightguess");
var docWrongGuess = document.querySelector("#wrongguess");

// ############ MAIN GAME ENGINE ##############
// Create underscores based on length of word & update based on user's guesses
function generateUnderscore() {
    // Create empty string variable to hold the letters of chosenWord
    var wordLetters = " ";

    // Loop through the letters of the chosenWord
    for (var i = 0; i < chosenWord.length; i++) {
        // If the current letter has been guessed, then display that letter
        if (matchedLetters.indexOf(chosenWord[i]) !== -1) {
            wordLetters += chosenWord[i];
        }
        // If it hasn't been guessed then display an underscore
        else {
            wordLetters += "&nbsp;_&nbsp;";
        }
    }
    // Update the page with the new string we built.
    docUnderScore.innerHTML = wordLetters;
}

function gameStart() {
    // Splits the word into individual letters
    //underScores = chosenWord.split(" ");

    // Builds the underscores based on length of the word
    // generateUnderscore();
}
generateUnderscore();
//console.log(generateUnderscore());

// Event listener to save users choice and compare to the chosen word
document.addEventListener("keypress", function (event) {
    var keyword = String.fromCharCode(event.keyCode);
    // if user guess is right
    console.log(keyword);
    if (chosenWord.indexOf(keyword) > -1) {
        // add to rightGuess array
        matchedLetters.push(keyword);
        console.log(matchedLetters);
        // and replace underscore with right letter
        underScores[chosenWord.indexOf(keyword)] = keyword;
        docUnderScore.innerHTML = underScores.join(" ");
        docRightGuess.innerHTML = matchedLetters;
        // Checks to see if user completes the word
        //   if (underScore.join(" ") == chosenWord) {
        //      alert("you win");
        //}    
    }
    else {
        guessedLetters.push(keyword);
        console.log(guessedLetters);
        docWrongGuess.innerHTML = guessedLetters;
    }
})

  // This function is run whenever the user guesses a letter..
  function updatePage(letter) {
    // If the user has no guesses left, restart the game.
    //if (this.guessesLeft === 0) {
     // this.restartGame();
    //}
    // Otherwise...
    //else {
      // Check for and handle incorrect guesses.
      updateGuesses(letter);

      // Check for and handle correct guesses.
      updateMatchedLetters(letter);

      // Rebuild the view of the word. Guessed letters are revealed, non-guessed letters have a "_".
      generateUnderscore();

      // If the user wins, restart the game.
    //   if (this.updateWins() === true) {
    //     this.restartGame();
    //   }
    //}

}