const Animal = function() {
    this.clickCounter = 0;
}
const Cat = function(num, name) {
    Animal.call(this);
    this.num = num;
    this.name = name;
};

Cat.prototype = Object.create(Animal.prototype);

// creates HTML for cat-name and cat-image src attribute
Cat.prototype.createHTML = function() {
    document.getElementById('cat-name').textContent = this.name;
    document.getElementById('cat-image').src=`images/cat${this.num}.jpg`;
    thisCat = this;
    this.updateCounterHTML();
    this.addClickListener(thisCat);
};

// adds listener to clicked image and runs counterUp function
Cat.prototype.addClickListener = function(thisCat) {
    // removes all event listeners on image
    // source: https://stackoverflow.com/questions/19469881/remove-all-event-listeners-of-specific-type/29930689
    var el = document.getElementById('cat-image'),
    elClone = el.cloneNode(true);
    el.parentNode.replaceChild(elClone, el);

    document.getElementById('cat-image').addEventListener('click', function() {
        thisCat.counterUp();
    });
};

// increments counter variable
Cat.prototype.counterUp = function() {
    this.clickCounter += 1;
    this.updateCounterHTML();
};

// updates cat-counter-text in HTML
Cat.prototype.updateCounterHTML = function() {
    document.getElementById('cat-counter-text').innerHTML = this.clickCounter;
};

// instantiations of cat objects
let cat1 = new Cat(1, 'Cocoa');
let cat2 = new Cat(2, 'Xerxes');
let cat3 = new Cat(3, 'Solomon');
let cat4 = new Cat(4, 'Myrrh');
let cat5 = new Cat(5, 'Lily');
let cat6 = new Cat(6, 'Gino');

// array of cat objects
const cats = [cat1, cat2, cat3, cat4, cat5, cat6];


// creates a tags in HTML, populates them with the cats' names, creates an event listener for each, appends the elements to the sidebar
const loadCats = function() {
    for (let i = 0; i < cats.length; i++) {
        let elem = document.createElement('a');
        elem.innerHTML = cats[i].name;
        elem.addEventListener('click', function() {
            cats[i].createHTML();
        });

        document.getElementById('sidebar').appendChild(elem);
    };

    cat1.createHTML();
}();
