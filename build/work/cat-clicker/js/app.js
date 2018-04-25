(function() {

    let model = {
        thisCat: null,
        cats: [
            {
                name : 'Cocoa',
                clickCounter : 0,
                imgSrc : 'images/cat1.jpg'
            },
            {
                name : 'Xerxes',
                clickCounter : 0,
                imgSrc : 'images/cat2.jpg'
            },
            {
                name : 'Solomon',
                clickCounter : 0,
                imgSrc : 'images/cat3.jpg'
            },
            {
                name : 'Myrrh',
                clickCounter : 0,
                imgSrc : 'images/cat4.jpg'
            },
            {
                name : 'Lily',
                clickCounter : 0,
                imgSrc : 'images/cat5.jpg'
            }
        ]
    };


    let octopus = {
        thisCat: null,

        init: function() {
            model.thisCat = model.cats[0];

            sidebarView.init();
            mainView.init();
        },

        getCat: function() {
            return model.thisCat;
        },

        getCats: function() {
            return model.cats;
        },

        selectCat: function(cat) {
            model.thisCat = cat;
        },

        counterUp: function() {
            model.thisCat.clickCounter ++;
            mainView.render();
        },

        openAdmin: function() {
            document.getElementById('admin-console').style.display = 'block';
        },

        cancelAdmin: function() {
            document.getElementById('admin-console').style.display = 'none';
        },

        submitAdmin: function() {
            document.getElementById('admin-console').style.display = 'none';
            model.thisCat.name = document.getElementById('name-input').value;
            model.thisCat.imgSrc = document.getElementById('img-src-input').value;
            model.thisCat.clickCounter = document.getElementById('click-counter-input').value;

            mainView.render();
        }
    };

    let mainView = {
        init: function() {
            this.catNameElem = document.getElementById('cat-name');
            this.catImgElem = document.getElementById('cat-image');
            this.catCounterElem = document.getElementById('cat-counter-text');

            document.getElementById('cat-image').addEventListener('click', function() {
                octopus.counterUp();
            });

            this.render();
        },

        render: function() {
            let cat = octopus.getCat();
            document.getElementById('cat-counter-text').textContent = cat.clickCounter;
            document.getElementById('cat-name').textContent = cat.name;
            document.getElementById('cat-image').src = cat.imgSrc;

            document.getElementById('name-input').value = cat.name;
            document.getElementById('img-src-input').value = cat.imgSrc;
            document.getElementById('click-counter-input').value = cat.clickCounter;
        }
    };

    let sidebarView = {
        init: function() {
            this.sidebar = document.getElementById('sidebar');

            this.render();
        },

        render: function() {
            let cats = octopus.getCats();
            document.getElementById('sidebar').innerHTML = '';

            // creates a tags in HTML, populates them with the cats' names, creates an event listener for each, appends the elements to the sidebar
            for (let i = 0; i < cats.length; i++) {
                let elem = document.createElement('a');
                elem.innerHTML = cats[i].name;
                elem.addEventListener('click', function() {
                    octopus.selectCat(cats[i]);
                    mainView.render();
                });

                document.getElementById('sidebar').appendChild(elem);
            };

            document.getElementById('admin-button').addEventListener('click', function() {
                octopus.openAdmin();
            });
            document.getElementById('cancel-input').addEventListener('click', function() {
                octopus.openAdmin();
            });
            document.getElementById('submit-input').addEventListener('click', function(event) {
                event.preventDefault();
                octopus.submitAdmin();
            });
        }
    };


    octopus.init();
})();
