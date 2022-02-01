const frames = 48
let graphics;
let voidOffset;
let voidSteepness;

function setup() {
  createCanvas(500, 500, WEBGL);
  frameRate(frames)
  voidSteepness = PI / 4;
  t = rez = c = n = 0.0328;
  frameRate(frames)
  graphics = createGraphics(1500, 1500)
}

// draw the artifact
// eventually add texture to it
function artifact() { 

// add rotation that is more generative later
    push()
    strokeWeight(5)
    stroke(255)
    fill(0)
    rotateX(frameCount * .01)
    rotateY(frameCount * .01)
    rotateZ(frameCount * .01)
    // translate(0, 10 + sin(frameCount * .1) * 15);

    box(70)
    pop()


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
        square(i*10, j*10, 1000);
      }
    }
    t += 0.01
}

function altar() { 
    push()
    stroke(255)
    fill(255)
    translate(0, 500, 0)
    ambientMaterial(30, 30, 30)
    cone(150, 700, 20)
    pop()
}

// void offset is stored in voidOffset
function makeVoid() { 

    // make bottom
    // push()
    // fill(0, 255, 0)
    // rotateX(PI / 2)
    // // rotateX(-45)
    // translate(0, 0, -500)
    // // rotate(45)
    // plane(1500, 1500)
    // pop()
    
    // make the north plane
    push()
    fill(255, 0, 0)
    rotateX(voidSteepness)
    // rotateX(-45)
    translate(0, 0, -500)
    // rotate(45)
    plane(1500, 1500)
    pop()

    // make the south plane
    push()
    fill(0, 0, 255)
    rotateX(-(voidSteepness))
    // rotateZ(voidSteepness)
    // rotateX(-45)
    translate(0, 0, 500)
    // rotate(45)
    plane(1500, 1500)
    pop()
    
    // make the east plane
    push()
    fill(0, 255, 255)
    rotateX(PI / 2)
    rotateY(voidSteepness)
    // rotateX(-45)
    translate(0, 0, -500)
    // rotate(45)
    plane(1500, 1500)
    pop()

    // make the west plane
    push()
    fill(255, 0, 255)
    rotateX(PI / 2)
    rotateY(-voidSteepness)
    // rotateX(-45)
    translate(0, 0, -500)
    // rotate(45)
    plane(1500, 1500)
    pop()
    
}

function draw3DNoise() { 
    push()
    rotateX(PI / 2)
    // rotateX(-45)
    translate(0, 0, -500)
    drawNoise()
    // texture(graphics)
    pop()
}


function draw() {
    // console.log("Framerate: " + frameRate()) 
    orbitControl()

    background(0)
    // draw the artifact
    artifact()
    // draw the altar
    altar()    
    //draw the void 
    makeVoid()

    // draw3DNoise()
}