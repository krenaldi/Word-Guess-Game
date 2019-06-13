// ############ GLOBAL VARIABLES ###############
// Create array that computer uses to select for play
var words = ["shinedown", "motorhead", "queen", "rival sons", "led zepplin", "black sabbath", "metallica", "foo fighters", "soundgarden", "nirvana", "three days grace", "halestorm", "five finger death punch", "disturbed", "motley crue", "volbeat", "zz top"];

//Empty variable that holds the word selected from the words array
var chosenWord = "";

// Var used to show how many guesses user has left
var guessesLeft = 8;

// Empty arrays that holds the wrong guesses the user pressed 
var wrongGuesses = [];

// Empty array to hold the number of underscores and correct letters
var underScores = [];

// Empty array that stores the individual letters of the chosenWord variable
var wordLetters = [];

// This will be the number of blanks we show based on the solution
var numBlanks = 0;

// Variables for DOM manipulation
var guessesLeftCounter = document.getElementById("guessesleft");
var docUnderScore = document.getElementById("underscores");
var docWrongGuess = document.getElementById("wrongguess");

// checkLetters function is called on the keypress event to check if the key pressed is part of the word
function checkLetters(letter) {

    // Boolean variable that is toggled depending on whether the letter is in the word or not
    var letterInWord = false;

    // Loop to check if letter exists inside the word
    for (var i = 0; i < numBlanks; i++) {
        if (chosenWord[i] === letter) {
            // If letter exists then toggle this Boolean to true
            letterInWord = true;
        }
    }
    // If letter exists somewhere in the word then determine which indices to place the letter
    if (letterInWord) {
        for (var j = 0; j < numBlanks; j++) {
            // Populate the underScores with every instance of the letter
            if (chosenWord[j] === letter) {
                // Replace the specific blanks with the matching letter
                underScores[j] = letter;
            }
        }
        // Logging for testing
        console.log(underScores);
    }
    // If the letter doesn't exist, add to the wrongGuesses array
    else {
        wrongGuesses.push(letter);
        console.log(wrongGuesses);
        guessesLeft--;
    }
}


function gameStart() {
    // Resets the number of guesses back to 0 after last round
    guessesLeft = 8;

    // Band chosen randomly from words array
    chosenWord = words[Math.floor(Math.random() * words.length)];

    // Break the word into individual letters
    wordLetters = chosenWord.split("");

    // Count the number of letters in the word
    numBlanks = wordLetters.length;

    console.log(chosenWord);
    console.log(numBlanks);

    // Reset the guess and success array at each round
    underScores = [];

    // Reset the wrong guesses from the previous round.
    wrongGuesses = [];

    // Create the underscores based on the number of letters from the words array
    for (var i = 0; i < numBlanks; i++) {
        underScores.push("_");
    }
    console.log(underScores);

    // Resets number of guessLeft to 8
    guessesLeftCounter.innerHTML = guessesLeft;

    // Prints the blanks at the beginning of each round in the HTML
    docUnderScore.innerHTML = underScores.join(" ");

    // Clears the wrong guesses from the previous round
    docWrongGuess.innerHTML = wrongGuesses.join(" ");
}

// This function has all the code that needs to be run after each guess is made
function guesses() {
    // Log status update telling how many wins and guesses are left
    console.log("guessesLeft: " + guessesLeft);


    // Update the HTML DOM
    // Update the number of guesses left
    guessesLeftCounter.innerHTML = guessesLeft;
    // Print the array of correct guesses and remaining blanks
    docUnderScore.innerHTML = underScores.join(" ");
    // Print the wrong guesses so as to not repeat the same guess
    docWrongGuess.innerHTML = wrongGuesses.join(" ");

    // If all letters match the word
    if (wordLetters.toString() === underScores.toString()) {
        //add to win counter & give user alert
        //winCounter++;
        alert("You win!");

        // Update the win counter & restart the game
        // document.getElementById("win-counter").innerHTML = winCounter;
        gameStart();
    }

    // If run out of guesses
    else if (guessesLeft === 0) {
        // Add to loss counter
        //lossCounter++
        // Give user an alert
        alert("You lose!");

        // Update the loss counter
        //document.getElementById("loss-counter").innerHTML = lossCounter;
        // Restart the game
        gameStart();
    }
}

// ############ MAIN GAME ENGINE ##############
// Call to function to start the game
gameStart();

// Event listener to capture users key clicks
document.addEventListener("keypress", function (event) {
    // Variable that concerts the event.keyCode character and converts it to lowercase
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    console.log(letterGuessed);
    // Run function that checks if letter is in word
    checkLetters(letterGuessed);
    // Run function after each round is done
    guesses();
})