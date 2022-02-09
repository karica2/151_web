const frames = 60
let graphics;
let voidOffset;
let voidSteepness;
let planeWidth;
let x;
let camAngle;
let r, angle, step;
let lockBlue;

function setup() {
  createCanvas(500, 500, WEBGL);
  frameRate(frames)
  voidSteepness = PI / 4;
  t = rez = c = n = 0.0328;
  frameRate(frames)
  graphics = createGraphics(1500, 1500)
  planeWidth = 1500;
  x = color(255)
  
  // this rotate code is not mine, I got it from: 
  // https://editor.p5js.org/ftobon@heartofla.org/sketches/SkBy9XP97
  // all credit goes to them
  r     = 600;
  angle = 0;
  step  = .003;
  lockBlue = false;
  // slider = createSlider(-500, 1000, 100)
  // slider.position(10, 10)
  // slider.style('width', '80px')
  // x = color(230, 85, 85)

  var welcomeMessage = " Welcome to my art 151 Project 1! \nTitle: \"Breathing Sky\". Meant to mimic the sky at unimaginable heights.\nTo interact with it, move the mouse in any of the four quadrants to change the color of the scene and lighting. Each one should have a different look and feel. Enjoy!"
  window.alert(welcomeMessage)
}

// draw the artifact
// eventually add texture to it
function artifact() { 

// add rotation that is more generative later
    push()
    strokeWeight(5)
    stroke(255)
    fill(0)

    translate(0, 10 + sin(frameCount * .05) * 15);
    rotateX(frameCount * .005)
    rotateY(frameCount * .005)
    rotateZ(frameCount * .005)

    box(70)
    pop()

}

function getFillColor(val) { 
    var x = map(val, 0, 1, 0, 255)
    return x
}

function gradient(pHeight, pWidth, c1, c2, num_steps) { 

    push()
    
    // divide the height by the number of steps
    step_height = pHeight / num_steps

    for(var i = 0; i < num_steps; i++) { 
        
        let c = lerpColor(c1, c2, i / num_steps);    
        // console.log(i / num_steps)
        fill(c)
        noStroke()
        rect(0, i * step_height, pWidth, step_height)
    }
    pop()
}

function drawVoidFloor(pHeight, pWidth, c1, c2, num_steps) { 

  // draw squares 
  push()
  step_height = (pHeight / 2) / num_steps
  for(var i = 0; i < num_steps; i++) { 
        
    let c = lerpColor(c1, c2, i / num_steps);    
    // console.log(i / num_steps)
    fill(c)
    c.setAlpha(255)
    noStroke()
    // rect(0, i * step_height, pWidth, step_height)
    square(i*step_height, i*step_height, pWidth-(step_height * 2 * i))
    translate(0, 0, 1)
  }  
  pop()
}

function altar() { 
    push()
    // strokeWeight(4)
    noStroke()
    let locX = mouseX - width / 2;
    let locY = mouseY - height / 2;
    // console.log(locX + "    " + locY)
    pointLight(500, 500, 500, 362, 32, 50);
    pointLight(500, 500, 500, -500, -32, 50);

    // fill(255)
    translate(0, 500, 0)
    // fill(255, 0, 255)
    ambientMaterial(pickColorFromQuadrant(1))
    cone(150, 700, 20)
    translate(0, -310, 0)
    box(125, 125)
    pop()
}

function makeVoidNoPlane(slideX) { 

    // north plane
    x = color(255, 0, 0)
    y = color(255, 0, 255)
    push()
    // center it
    translate((-planeWidth / 2), slideX, -1000)
    rotateX(PI / 4)
    gradient(1500, 1500, x, y, 100)
    pop()

    push()
    // center it
    translate((-planeWidth / 2), slideX, -1000)
    rotateX(PI * .75)
    gradient(1500, 1500, x, y, 100)
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
    x = color(0, 0, 0)
    y = color(255, 0, 255)
    gradient(1500, 1500, x, y, 10)

    // make the north plane
    push()
    fill(255, 0, 0)
    rotateX(voidSteepness)
    // rotateX(-45)
    translate(0, 0, -500)
    // rotate(45)
    // fill(gradient())
    texture(graphics)
    // gradient(1500, 1500, x, y, 40)
    plane(1500, 1500)


    // so maybe make this into a texture and apply it to the plane? then lighting will affect it
    // square(1500, 0, 255)
    pop()

    // make the south plane
    push()
    fill(0, 0, 255)
    rotateX(-(voidSteepness))
    // rotateZ(voidSteepness)
    // rotateX(-45)
    translate(0, 0, 500)
    // rotate(45)
    texture(graphics)
    plane(1500, 1500)
    // gradient(1500, 1500, x, y, 40)
    pop()
    
    // make the east plane
    push()
    fill(0, 255, 255)
    rotateX(PI / 2)
    rotateY(voidSteepness)
    // rotateX(-45)
    translate(0, 0, -500)
    // rotate(45)
    texture(graphics)
    plane(1500, 1500)
    // gradient(1500, 1500, x, y, 40)
    pop()

    // make the west plane
    push()
    fill(255, 0, 255)
    rotateX(PI / 2)
    rotateY(-voidSteepness)
    // rotateX(-45)
    translate(0, 0, -500)
    // rotate(45)
    texture(graphics)
    // gradient(1500, 1500, x, y, 40)
    plane(1500, 1500)
    pop()
    
}

function drawSky(val) { 
    // x = color(230, 85, 85)
    y = color(255, 255, 255)
    // drawVoidFloor(1500, 1500, x, y, 20)

    // floor
    push()
    noStroke()
    fill(255, 255, 255)
    // left, down, push back
    translate(-1000, 1000, -1000)
    rotateX(PI / 2)
    
    // rect(0, 0, 2000, 2000)
    // z = pickColorFromQuadrant(255)
    // z = color(230, 82, 82)
    // drawVoidFloor(2000, 2000, y, xs, 50)
    pop()

    push()
    translate(-1000, -1000, -1000)
    gradient(2000, 2000, x, y, 200)
    pop()

    push()
    translate(-1000, -1000, 1000)
    gradient(2000, 2000, x, y, 200)
    pop()

    push()
    translate(-1000, -1000, 1000)
    rotateY(PI / 2)
    gradient(2000, 2000, x, y, 200)
    pop()

    push()
    translate(1000, -1000, 1000)
    rotateY(PI / 2)
    gradient(2000, 2000, x, y, 200)
    pop()

}

function getMouseQuadrant() { 

  if(mouseX > 250) { 

    if(mouseY > 250) {
      return 4
    } else {
      return 2
    }

  } else {
    if(mouseY < 250) { 
      return 1
    } else { 
      return 3
    }
  }
  
}

function pickColorFromQuadrant(n) { 
  mapped = map(n, 0, 1, 0, 225)
  let a;
  quadrant = getMouseQuadrant()
  
  if(lockBlue) { 
    return color(mapped, mapped, mapped * 2)

  }
  
  if (quadrant == 1) { 
    a = color(mapped * 2, mapped, mapped)
  } else if(quadrant == 2) { 
    a = color(mapped, mapped * 2, mapped)
  } else if(quadrant == 3) { 
    a = color(mapped, mapped, mapped * 2)
  } else if(quadrant == 4) { 
    a = color(mapped * 2, mapped, mapped*2)
  }


  return a;
}

// get the primary color of the scene via perlin noise
function cycleColor() { 
  push()
  n = noise(t);
  // console.log(n)
  x = pickColorFromQuadrant(n)
  t += .01
  pop()
}

function rotateCamera() { 
  // push()
  // rotateX(.01 * frameCount)
  var camX = r * sin(angle);
  var camY = r * cos(angle);
  angle = angle + step;


  camera(camX, -325, camY, 0, 0, 0);
  // pop()
}

function draw() {
    push()
    background(255) 
    pop()

    rotateCamera()
    
    cycleColor()

    // orbitControl()
    // let val = slider.value()
    // draw the artifact
    artifact()
    // draw the altar
    altar()    
    //draw the sky and void 
    drawSky()
    
}