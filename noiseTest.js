
function setup() {
  createCanvas(400, 400);
  t = rez = c = n = 0.0328;
  strokeWeight(3);
  frameRate(60)
}

function getFillColor(val) { 
  var x = map(val, 0, 1, 0, 255)
  // console.log(x)
  return x
}

function drawNoise() { 
  background(0);
  noStroke();
  for (i = 0; i < height; i += 3) {
    for (j = 0; j < width; j += 3) {
      n = noise(i * rez, j * rez + t);
      
      //uncomment the next line to see difference between noise() and random()
      //n = random()
      if(n>0.6){
      fill(255);
      
      }else if(n < .2) {
        // fill(255, 0, 0);
        fill(getFillColor(n), 100, getFillColor(n))
      }
      else{ 
        fill(0)
      }
      rect(i, j, 3);
    }
  }
  t += 0.01
}

function draw() {
  drawNoise()
  // noLoop()
}