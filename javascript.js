/* ******************************** */
//	P5js
/* ******************************** */

var myWidth;
var myHeight;
var isTouchDevice = false;
var backColor = 210;

/* ******************************** */
// SETUP 

function setup() {
    touchStarted(); mousePressed(); draw();
	myWidth = windowWidth;
	myHeight = windowHeight;
  
  // store the canvas in a pointer variable
	// now its methods can be accessed
	var myCanvas = createCanvas(myWidth, myHeight);
	
  // adding canvas as a child of a container
  myCanvas.parent('my-container');
	background(backColor);
	noStroke();
}

function windowResized() {
	myWidth = windowWidth;
	myHeight = windowHeight;
  resizeCanvas(myWidth, myHeight);
}

/* ******************************** */
//detect if it is a touch device
function touchStarted() {
	isTouchDevice = true;
}
function mousePressed() {
	isTouchDevice = false;
}
function mouseMoved() {
	isTouchDevice = false;
}

/* ******************************** */
// DRAW

function draw() {
 
  // var gridSize = myWidth/32; // shape size depends on width
  var gridSize = 50; // shape size absulute size
  var backOpacity = 35; // affects dot fade time
  background(backColor, backOpacity);

	for (var i=0; i < myWidth; i+= gridSize) {
		for (var j = 0; j < myHeight; j += gridSize) {
			var myShape = new Shape(i,j, gridSize); 
			myShape.display(isTouchDevice);
		}
	}
}

/* ******************************** */
// DOT CLASS

function Shape(i,j, gSize) {	
	const MIN_SIZE = 5; 
	const MAX_SIZE = gSize;
	
  this.dotX = i + MAX_SIZE/2; 
	this.dotY = j + MAX_SIZE/2;
	
	var distFromMouse = sqrt( sq(abs(this.dotX - mouseX)) + sq(abs(this.dotY - mouseY)) );
	var distFromTouch = sqrt( sq(abs(this.dotX - touchX)) + sq(abs(this.dotY - touchY)) );
	
	var dotSizeM = MIN_SIZE + (MAX_SIZE / (1 + (distFromMouse / gSize)) );
	var dotSizeT = MIN_SIZE + (MAX_SIZE / (1 + (distFromTouch / gSize)) );

	this.display = function (isTouch) {
      var dotCol = 235; // default dot color
      var dotColPress = 255; // dot color when click / tap
      var dist = gSize * 2; // dots under this distance from mouse will be displayed larger
    
      if (!isTouch) {
        if ( mouseIsPressed && distFromMouse < dist ) {
          fill(dotColPress);
          ellipse(this.dotX, this.dotY, dotSizeM, dotSizeM);
        } else if (distFromMouse < dist) {
          fill(dotCol);
				  ellipse(this.dotX, this.dotY, dotSizeM, dotSizeM);
        } else {
          fill(dotCol);
				  ellipse(this.dotX, this.dotY, MIN_SIZE, MIN_SIZE);
        }
      
      } else if (isTouch) {
        if ( touchIsDown && distFromTouch < dist ) {
				  fill(dotColPress);
				  ellipse(this.dotX, this.dotY, dotSizeT, dotSizeT);
        } else {
          fill(dotCol);
				  ellipse(this.dotX, this.dotY, dotSizeT, dotSizeT);
        } 
      }
   
	}
}