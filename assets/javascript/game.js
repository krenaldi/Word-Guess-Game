// ############ GLOBAL VARIABLES ###############
// Create array that computer uses to select for play
var words = ["Shinedown", "Rival Sons", "Greta Van Fleet"];

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
//var docUnderScore = document.querySelector("underscores");
//var docRightGuess = document.querySelector("rightguess");
//var docWrongGuess = document.querySelector("wrongguess");

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
    document.querySelector("#underscores").innerHTML = wordLetters;
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
        matchedLetters.push(keyword.toUpperCase());
        console.log(matchedLetters);
        // and replace underscore with right letter
        // underScores[chosenWord.indexOf(keyword)] = keyword;
        //docUnderScore[0].innerHTML = underScores.join(" ");
        //docRightGuess.innerHTML = matchedLetters;
        // Checks to see if user completes the word
        //   if (underScore.join(" ") == chosenWord) {
        //      alert("you win");
        //}    
    }
    else {
        guessedLetters.push(keyword.toUpperCase());
        console.log(guessedLetters);
        //docWrongGuess.innerHTML = guessedLetters;
    }
})