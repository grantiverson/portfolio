/* FUNCTIONS */

//function shows the card clicked
const showCard = function (card) {
    if (openCards.length > 1) {                 // if there is more than one "open" card, hide the cards
        hideCards();
    }
    card.srcElement.classList.add("open");      // adds "open" and "show" classes to clicked cards
    card.srcElement.classList.add("show");
    openCards.push(card.srcElement.outerHTML);  // adds the clicked card to the "open" card list
    if (openCards.length > 1) {                 // if there is more than one "open" card, check to see if the cards match
        checkCards();
    }
    counterUp();                                // increment the move counter
};

//function adds ".match" if two cards match
const checkCards = function () {
    for (var i = 0; i < openCards.length; i++) {                                // iterate through the possible combinations of "open" cards
        for (var j = 0; j < openCards.length; j++) {                            // looking for a matched pair
            if (openCards[i] === openCards[j] && i != j) {
                document.querySelectorAll(".open")[j].classList.add("match")    // if two match, adds "match" class
            }
        }
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
    deck = document.querySelectorAll("li");                             // stores the new HTML in the "deck" variable
    makeDeckArray();                                                    // turns the new "card" HTML into a new array
    hideCards();                                                        // removes any "show" and "open" classes from deleted HTML
    moves = 0;
    document.querySelector("span").textContent = moves;                 // resets the moves counter to 0
};

//function generates the deck array
function makeDeckArray() {
    for (let i = 0; i < deck.length; i++) {                             // iterates through li items and stores their HTML as an array element
        deckArray[i] = document.querySelectorAll("li")[i].outerHTML;

        for (let i = 0; i < deck.length; i++) {                         // iterates through array elements and adds event listeners
            deck[i].addEventListener("click", showCard);
        }
    }
}

//function that controls the counter
const counterUp = function () {
    moves++;
    document.querySelector("span").textContent = moves;         // replaces the HTML in the span element with the number of moves
    if (document.querySelectorAll(".match").length === 16) {
        finished();
    }
};

//function that creates an alert when all matches have been made
const finished = function () {
    setTimeout(function() {                                          // setTimeout causes a slight delay before the alert window appears
            alert("You won with " + moves + " moves!");              // allows the last pair of cards does not display as matching
                deal();
        }, 100);
};

/* VARIABLES */

//NodeList of cards
let deck = document.querySelectorAll("li");
//Array of cards
let deckArray = [];
//Array of "open" cards
let openCards = [];

//Move counter
let moves = 0;

/* OTHER CODE */

makeDeckArray();

deal();

//"Restart" event listener
const restart = document.querySelector(".restart");
restart.addEventListener("click", deal);

//"Click a card" event listener
for (let i = 0; i < deck.length; i++) {
    deck[i].addEventListener("click", showCard);
}
