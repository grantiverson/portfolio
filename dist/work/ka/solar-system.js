var sketchProc = function(processingInstance) { with (processingInstance) {
size(600, 600);
frameRate(30);



noStroke();

var Thing = function() {
  this.x = -20;
  this.y = -20;
};

var Planet = function(earthDegreeDivisor, planetColor, orbitHeight, planetRadius) {
  Thing.call(this);
  this.degree = earthDegreeDivisor;
  this.planetColor = planetColor;
  this.orbitHeight = orbitHeight;
  this.orbitWidth = 5 * orbitHeight;
  this.planetRadius = planetRadius;
};

Planet.prototype = Object.create(Thing.prototype);

Planet.prototype.update = function() {
  this.x = cos(earthDegree / this.degree) * this.orbitWidth + 300;
  this.y = -1 * sin(earthDegree / this.degree) * this.orbitHeight + 300;
};

Planet.prototype.draw = function() {
  this.update();
  fill(this.planetColor[0], this.planetColor[1], this.planetColor[2]);
  ellipse(this.x, this.y, this.planetRadius, this.planetRadius);
};

Planet.prototype.recenter = function() {
  this.draw();
  this.x += earth.x - 300;
  this.y += earth.y - 300;
};

var RingedPlanet = function(planetColor, planetRadius, x, y) {
  Planet.call(this, planetColor, planetRadius, x, y);
};

RingedPlanet.prototype = Object.create(Planet.prototype);

RingedPlanet.prototype.draw = function() {
  this.update();
  // saturn's rings (top)
  stroke(90, 90, 90);
  noFill();
  strokeWeight(2);
  arc(this.x, this.y, 27, 10, PI, 2 * PI);
  strokeWeight(2);
  arc(this.x, this.y, 20, 7, PI, 2 * PI);
  noStroke();
  // saturn's body
  fill(this.planetColor[0], this.planetColor[1], this.planetColor[2]);
  // this.color;
  ellipse(this.x, this.y, this.planetRadius, this.planetRadius);
  // saturn's rings (bottom)
  stroke(90, 90, 90);
  noFill();
  strokeWeight(2);
  arc(this.x, this.y, 27, 10, 0, PI);
  strokeWeight(2);
  arc(this.x, this.y, 20, 7, 0, PI);
  noStroke();

}

var drawThings = function() {
  mercury.draw();
  venus.draw();
  earth.draw();
  moon.recenter();
  mars.draw();
  jupiter.draw();
  saturn.draw();
  uranus.draw();
  neptune.draw();
};

// var planetName = new Planet(earthDegreeDivisor, planetColor, orbitHeight, planetRadius);
var mercury = new Planet(.24, [167, 166, 171], 10, 3.5);
var venus = new Planet(.625, [204, 181, 88], 12, 6);
var earth = new Planet(1, [99, 54, 224], 15, 6);
var moon = new Planet(.077, [255, 255, 255], 3.5, 2);
var mars = new Planet(1.9, [230, 18, 18], 17, 5);
var jupiter = new Planet(12, [186, 121, 52], 25, 15);
var saturn = new RingedPlanet(29, [214, 180, 92], 30, 10);
var uranus = new Planet(84, [17, 169, 240], 37, 8);
var neptune = new Planet(165, [12, 31, 156], 45, 7);

// Position of earth in radians
// All other planets' positions are relative to this one
var earthDegree = random(1000);
// controls the speed of planetary orbit
var speedMultiplier = .05;

var starX = [10];
var starY = [10];
var starRadius = 3;
while (starX.length < 401) {
    starX.push(random (0,600));
    starY.push(random (0,600));
};



var draw = function() {
//stars on black background
    background(0, 0, 0);


    for (var i = 0; i < starX.length; i++) {
        fill(255,255,255);
        starRadius = random (1,2);
        ellipse(starX[i], starY[i], starRadius, starRadius);
    };

// sun
    fill(255, 132, 0);
    ellipse(300,300,35,35);

// orbit elipses
    noFill();
    stroke(255, 255, 255);
    strokeWeight(0.2);
    ellipse(300,300,100,20);
    ellipse(300,300,120,22);
    ellipse(300,300,150,27);
    ellipse(300,300,170,32);
    ellipse(300,300,250,50);
    ellipse(300,300,300,60);
    ellipse(300,300,370,73);
    ellipse(300,300,450,90);
    noStroke();

    drawThings();

// top half of the sun (allows planets to go "behind")
    fill(255, 132, 0);
    arc(300, 300, 35, 35, PI, 2 * PI);

    earthDegree += speedMultiplier;

    textSize(40);
    textAlign(CENTER);
    fill(255, 255, 255);
    text('Solar System Model', 300, 40);
};



}};
