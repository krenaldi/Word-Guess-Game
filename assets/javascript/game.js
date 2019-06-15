// ############ GLOBAL VARIABLES ###############
// Create array that computer uses to select for play
var words = ["shinedown", "motorhead", "queen", "rival sons", "led zepplin", "black sabbath", "metallica", "foo fighters",
    "soundgarden", "nirvana", "three days grace", "halestorm", "five finger death punch", "disturbed", "motley crue", "volbeat", "zz top",
    "mastodon", "slayer", "def leppard", "pantera", "papa roach", "pink floyd", "pop evil", "rage against the machine"];

 //console.log(words.length);   
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

// This will be the number of blanks we show based on the chosenWord selected
var numBlanks = 0;

// Variables for DOM manipulation
var guessesLeftCounter = document.getElementById("guessesleft");
var docUnderScore = document.getElementById("underscores");
var docWrongGuess = document.getElementById("wrongguess");
var notice = document.getElementById("notice");

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
        //console.log(underScores);
    }

    // Code to compare if letter pressed already exists in wrongGuesses array and alerts user that they already guessed that letter
    else if (wrongGuesses.includes(letter)) {
        alert("LETTER ALREADY GUESSED. PLEASE SELECT ANOTHER LETTER.")
    }

    // If the letter doesn't exist, add to the wrongGuesses array
    else {
        // Pushes incorrect letter into the wrongGuesses array
        wrongGuesses.push(letter);
        // Logs array of any wrong guesses
        // console.log(wrongGuesses);
        // Decreases the number of guesses left by 1
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

    // Testing variables in console
    // console.log(chosenWord);
    // console.log(numBlanks);
    // console.log(wordLetters);

    // Reset the guess and success array at each round
    underScores = [];

    // Reset the wrong guesses from the previous round.
    wrongGuesses = [];

    // Create the underscores based on the number of letters from the words array
    for (var i = 0; i < numBlanks; i++) {
        // Loop to see if chosenWord has space in it and if it does use the nbsp HTML tag when generating the underscores
        if (wordLetters[i] == " ") {
            underScores.push("&nbsp;&nbsp;");
            //wordLetters.splice();
            // Otherwise push the underscore    
        } else {
            underScores.push("_");
        }
    }

    // Testing underScores variable before triggering the checkLetter function 
    // console.log(underScores);

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

    // Variables that filters the space characters from the wordLetters and underScores arrays so they are 
    // not considered when the word hs been complete
    var filteredWordLetters = wordLetters.filter(function (element) {
        return element !== " "
    })
    var filteredUnderScores = underScores.filter(function (element) {
        return element !== "&nbsp;&nbsp;"
    })
    // Logging the filteredWordLetters & filteredUnderScores variables to make sure spaces have been removed from array
    // console.log(filteredWordLetters)
    // console.log(filteredUnderScores) 

    // If all letters match the word
    if (wordLetters.toString() === underScores.toString()) {
        // Show notice that the player won
        notice.innerHTML = "You Rock!! Let's keep rocking!!<br>" + chosenWord.toUpperCase();
        // Restart the game
        gameStart();
    }

    // if filtered elements match
    else if (filteredUnderScores.toString() === filteredWordLetters.toString()) {
        // Show notice that the player won
        notice.innerHTML = "You Rock!! Let's keep rocking!!<br>" + chosenWord.toUpperCase();
        // Restart the game
        gameStart();
    }

    // If run out of guesses
    else if (guessesLeft === 0) {
        // Show notice that the player lost
        notice.innerHTML = "Bogus!! Let's start rocking again!!";
        // Restart the game
        gameStart();
    }
}

// ############ MAIN GAME ENGINE ##############
// Call to function to start the game
gameStart();

// Event listener to capture users key clicks
document.onkeyup = function (event) {
    // Checks to see if key pressed is a letter
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        // Converts all key clicks to lowercase
        var letterGuessed = event.key.toLowerCase();
        // console.log(letterGuessed);
        // Run function that checks if letter is in word
        checkLetters(letterGuessed);
        // Run function after each round is done
        guesses();
    }
}