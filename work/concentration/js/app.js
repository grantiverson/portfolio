/* FUNCTIONS */
//function shows the card clicked
const showCard = function (card) {
    if (card.srcElement.classList.contains("open") || card.srcElement.classList.contains("match")) {
        return;                                 // ignores "click" if card is already shown or a match
    }
    if (openCards.length > 1) {                 // if there is more than one "open" card, hide the cards
        hideCards();
    }
    card.srcElement.classList.add("open");      // adds "open" and "show" classes to clicked cards
    card.srcElement.classList.add("show");
    openCards.push(card.srcElement.outerHTML);  // adds the clicked card to the "open" card list
    if (openCards.length > 1) {                 // if there is more than one "open" card, check to see if the cards match
        checkCards();
    }
    movesUp();                                // increment the move counter
};

//function adds ".match" if two cards match
const checkCards = function () {
    if (openCards[0] === openCards[1]) {
        document.querySelectorAll(".open")[0].classList.add("match");   // if two match, adds "match" class
        document.querySelectorAll(".open")[1].classList.add("match");
    }
};

//hides all "shown" cards
const hideCards = function () {
    for (var i = 0; i < deckArray.length; i++) {    // iterates through "deck" removing "show" and "open" classes
        deck[i].classList.remove("show");
        deck[i].classList.remove("open");
    }

    openCards = [];                                 // resets the list of "open" cards to empty
};

//function rearranges the order of the cards on the page
const deal = function () {
    let currentIndex = deckArray.length, temporaryValue, randomIndex;   // code provided by project documentation
    while (currentIndex !== 0) {                                        // shuffles the list
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = deckArray[currentIndex];
        deckArray[currentIndex] = deckArray[randomIndex];
        deckArray[randomIndex] = temporaryValue;
    }

    let dealtCards = "";                                                // variable that will store "card" HTML text

    for (let i = 0; i < deckArray.length; i++) {                        // concatinates the "cards" array into one string
        dealtCards += deckArray[i];                                     // by looping through each card and adding its HTML
    }

    document.querySelector("#deck").innerHTML = dealtCards;             // inserts "cards" HTML string into index.html's deck ul tag

    for (let i = 0; i < deck.length; i++) {                             // adds "Click a card" event listeners
        deck[i].addEventListener("click", showCard);
    }

    //re-generates the deck array and hides all cards
    makeDeckArray();                                                    // turns the new "card" HTML into a new array
    hideCards();                                                        // removes any "show" and "open" classes from deleted HTML
    moves = 0;
    document.querySelector("span").textContent = moves;                 // resets the moves counter to 0
    resetTimer();                                                        // resets the timer
    resetStarRating();                                                          // resets the stars counter
};

//function generates the deck array
function makeDeckArray() {
    deck = document.querySelectorAll("#deck li");                             // stores the new HTML in the "deck" variable
    for (let i = 0; i < deck.length; i++) {                             // iterates through li items and stores their HTML as an array element
        deckArray[i] = deck[i].outerHTML;

        for (let i = 0; i < deck.length; i++) {                         // iterates through array elements and adds event listeners
            deck[i].addEventListener("click", showCard);
        }
    }
}

//function that controls the counter
const movesUp = function () {
    moves++;
    document.querySelector("span").textContent = moves;         // replaces the HTML in the span element with the number of moves
    if (moves % 5 === 0 && moves < 46) {
        starRating();
    }
    if (document.querySelectorAll(".match").length === 16) {
        finished();
    }
};

//function that creates a modal when all matches have been made
const finished = function () {
    setTimeout(function() {                                          // setTimeout causes a slight delay before the alert window appears
        const playAgain = confirm("You won after " + moves + " moves!\nYou got " + stars + " stars.\nYour time was " + minutes + ":" + seconds + "\nPress OK to play again!");              // allows the last pair of cards does not display as matching
        if (playAgain) {
            deal();
        }
    }, 100);
    clearInterval(timerInterval);
};

//makes timer counter work
const timerUp = function () {
    if (seconds == 60) {
        seconds = 0;                                // increments minutes
        minutes++;
        minutesHTML.textContent = minutes;
    }
    if (seconds < 10) {                             // adds leading 0 if necessary then adds text to HTML
        secondsHTML.textContent = "0" + seconds;
    } else{
        secondsHTML.textContent = seconds;
    }
    seconds++;
}

//part of the timer
var timerInterval = setInterval(function() {
    timerUp();                  // runs timerUp ever 1 second
}, 1000);

const resetTimer = function () {
    minutes = 0;
    seconds = 0;
    minutesHTML.textContent = minutes;
    minutesHTML.textContent = seconds;
}

const starRating = function () {
    if (moves === 25) {
        document.querySelector("#first-star").classList.add("fa-star-o");
        stars = 2;
    }
    if (moves === 35) {
        document.querySelector("#second-star").classList.add("fa-star-o");
        stars = 1;
    }
    if (moves === 45) {
        document.querySelector("#third-star").classList.add("fa-star-o");
        stars = 0;
    }
}

const resetStarRating = function () {
    document.querySelector("#first-star").classList.remove("fa-star-o");
    document.querySelector("#second-star").classList.remove("fa-star-o");
    document.querySelector("#third-star").classList.remove("fa-star-o");
    stars = 3;
}

/* VARIABLES */

//NodeList of cards
let deck;
//Array of cards
let deckArray = [];
//Array of "open" cards
let openCards = [];

//Move counter
let moves = 0;

//Stars counter
let stars = 3;

//variables for timer
let minutes = 0, seconds = 0;
let minutesHTML = document.querySelector("#minutes");
let secondsHTML = document.querySelector("#seconds");

/* OTHER CODE */

makeDeckArray();

deal();

//"Restart" event listener
const restart = document.querySelector("#restart");
restart.addEventListener("click", deal);

//"Click a card" event listener
for (let i = 0; i < deck.length; i++) {
    deck[i].addEventListener("click", showCard);
}
