// ############ GLOBAL VARIABLES ###############
// Create array that computer uses to select for play
var words = ["Shinedown", "Rival Sons", "Greta Van Fleet"];

// Var used to show how many guesses user has left
var guessesLeft = 6;

// Empty arrays that hold the keys the user pressed for guess  
var rightGuess = [];
var wrongGuess = []; 

// Empty array to hold the number of underscores for new word
var underScores = [];

// Choose band from words array
var randNum = Math.floor(Math.random() * words.length);
var chosenWord = words[randNum];



// ############ MAIN GAME ENGINE ##############
// Create underscores based on length of word
var generateUnderscore = function(){
    for (var 1 = 0; i < chosenWord.length; i++){
        underScores.push("_");
    }
    return underScores;
}