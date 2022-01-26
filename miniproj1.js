const ARC_LENGTH = 30
var windowWidth = window.windowWidth
var windowHeight = window.windowHeight

function setup() {
    createCanvas(window.windowWidth, window.windowHeight);
  }
  

// 0: top left 
// 1: top right
// 2: bottom left
// 3: bottom right

var cornerWidth = .10 * window.windowWidth
var cornerHeight = .10 * window.windowHeight;

function fillCenter() { 

squareSize = window.windowHeight * .1    
centerX = window.windowWidth / 2
centerY = window.windowHeight / 2

lineSize1 = windowHeight * .25
lineSize2 = windowHeight * .75


// center line
line(centerX, lineSize1, centerX, lineSize2)

// lines on the side of the square, used with margin below
center_vertical_proportions = .4
lineSize1x = windowHeight * (center_vertical_proportions)
lineSize2x = windowHeight * (1-center_vertical_proportions)

// these inner lines are at a margin of .05

line(centerX - (.05 * windowWidth), lineSize1x, centerX - (.05 * windowWidth), lineSize2x)
line(centerX + (.05 * windowWidth), lineSize1x, centerX + (.05 * windowWidth), lineSize2x)

fill(0, 0, 0, 0)
square(centerX - .5*squareSize, centerY-.5*squareSize, squareSize)

}

// 10% of width from the left and the right
function fillSides() { 

    // change this variable to control the margin size
    marginPercent = .05

    offsetXL = windowWidth * (marginPercent)
    offsetXR = windowWidth * (1-marginPercent)


    verticalMargin = .15
    lineSize1 = windowHeight * (verticalMargin)
    lineSize2 = windowHeight * (1-verticalMargin)
    // console.log(lineSize)

    line(offsetXL, lineSize1, offsetXL, lineSize2)
    line(offsetXR, lineSize1, offsetXR, lineSize2)


}


function draw() {
    
    fillCenter()
    fillSides()
    
}