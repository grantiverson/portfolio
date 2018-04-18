var sketchProc=function(processingInstance){ with (processingInstance){
size(600, 600);
frameRate(30);


/*
I got the idea for this program from a math textbook called Discovering Algebra.
In one of the activities, students are encouraged to draw a triangle, associate
each triangle with two of the numbers of a die, and then perform a simple
algorithm to draw points on the triangle. The algorithm requires students to 1)
pick a random point on the triangle, 2) role a die, then 3) mark the midpoint of
the previously drawn point and the triangle vertex corresponding to the number
on the die, repeating steps 2 and 3 over and over.
*/

var Point = function() {
 this.x = 0;
 this.y = 0;
};

var Vertex = function(x, y) {
 Point.call(this, x, y);
 this.x = x;
 this.y = y;
};

Vertex.prototype = Object.create(Point.prototype);

var drawTriangle = function(resize) {
    background(215, 215, 215);
    strokeWeight(1);
    noFill();
    triangle(vert1.x,vert1.y,vert2.x,vert2.y,vert3.x,vert3.y);

    generatePoints();
    drawPoints();
    printText();

    stroke(0, 136, 255);
    strokeWeight(15);
    point(vert1.x,vert1.y);
    point(vert2.x,vert2.y);
    point(vert3.x,vert3.y);
    stroke(0,0,0);

};

var generatePoints = function () { // generates the points
  xArray = [random(600)];
  yArray = [random(600)];
  var numOfPoints = 1;

    while (numOfPoints < pointsToPlot) {
        var rand = floor(random(1,4)); // chooses rand and truncates the decimal

        // Cordinates of triangle correspond to random numbers (rand)
        // Top vertex (vert1.x,vert1.y) corresponds to rand = 1
        // Bottom left vertex (vert2.x,vert2.y) corresponds to rand = 2
        // Bottom right vertex (vert3.x,vert3.y) corresponds to rand = 3

        if (rand === 1) {                           // if rand is 1, use the top vertex to find the midpoint
            xArray.push((xArray[xArray.length - 1] + vert1.x)/2);
            yArray.push((yArray[yArray.length - 1] + vert1.y)/2);
        } else if (rand === 2) {                    // else if rand is 2, use the bottom left vertex to find the midpoint
            xArray.push((xArray[xArray.length - 1] + vert2.x)/2);
            yArray.push((yArray[yArray.length - 1] + vert2.y)/2);
        } else {                                    // else, rand must be 3, use the bottom right vertex to find the midpoint
            xArray.push((xArray[xArray.length - 1] + vert3.x)/2);
            yArray.push((yArray[yArray.length - 1] + vert3.y)/2);
        };                                           // I decided to use 1-3 rather than the 6 sides of a die for simplicity. The prinicple is the same.

        numOfPoints++;
    };
};

var drawPoints = function() {
  strokeWeight(4);
  stroke(0, 0, 0);
  for (var i = 0; i < xArray.length; i++) {
    point(xArray[i], yArray[i]);
  }

};

var printText = function() {
  fill(255, 0, 0);
  textSize(15);
  text(pointsToPlot + " points", 500, 580); // displays numOfPoints in the top right corner of the window

  textAlign(CENTER);
  textSize(40);
  fill(0, 0, 0);
  text('Probability Exercise:', 300, 40); // displays project title in the top right corner of the window
  textSize(30);
  fill(8, 8, 8);
  text('Sierpinski\'s Triangle Generator', 300, 85);

}

mouseDragged = function () {
    if (mouseX < vert1.x + 25 && mouseX > vert1.x - 25 && mouseY < vert1.y + 25 && mouseY > vert1.y - 25)
    {
        vert1.x = mouseX;
        vert1.y = mouseY;

        drawTriangle();
    } else if (mouseX < vert2.x + 25 && mouseX > vert2.x - 25 && mouseY < vert2.y + 25 && mouseY > vert2.y - 25)
    {
        vert2.x = mouseX;
        vert2.y = mouseY;

        drawTriangle();
    } else if (mouseX < vert3.x + 25 && mouseX > vert3.x - 25 && mouseY < vert3.y + 25 && mouseY > vert3.y - 25)
    {
        vert3.x = mouseX;
        vert3.y = mouseY;

        drawTriangle();
    };
};

// 3 vertices of the traingle
var vert1 = new Vertex(300, 100);
var vert2 = new Vertex(50, 550);
var vert3 = new Vertex(550, 550);

var xArray = [];
var yArray = [];

var pointsToPlot = 2500; // Change this number to increase the number of points
                     // Make it a smaller number (less than ~1000) if you want to drag the vertices around smoothly

drawTriangle(false);



}};
