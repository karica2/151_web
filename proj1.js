const frames = 60
let graphics;


function setup() {
  createCanvas(500, 500, WEBGL);
  frameRate(frames)
  t = rez = c = n = 0.0328;
  frameRate(frames)
  graphics = createGraphics(500, 500)
  // graphics.background(120)

  }

  function getFillColor(val) { 
    var x = map(val, 0, 1, 0, 255)
    return x
  }
  
  function drawNoise() { 
    strokeWeight(3);
    // background(0);
    noStroke();
    for (i = 0; i < 100; i += 3) {
      for (j = 0; j < 100; j += 3) {
        n = noise(i * rez, j * rez + t);
        
        //uncomment the next line to see difference between noise() and random()
        //n = random()
        if(n>0.6){
        fill(255, 255, 0);
        // square(20, 20, 20)
        
        }else if(n < .2) {
          // fill(255, 0, 0);
          fill(getFillColor(n), 100, getFillColor(n))
        }
        else{ 
          fill(0)
        }
        square(i, j, 3);
      }
    }
    t += 0.01
}



function draw() { 
  background(120)
  // drawNoise()
  rotateX(frameCount * .01)
  rotateY(frameCount * .01)
  rotateZ(frameCount * .01)
  drawNoise()
  texture(graphics)
  // fill(255)
  box(70)

  // Use this line to bob it up and down
  // translate(0, 10 + sin(frameCount * .05) * 5);


}