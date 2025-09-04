// citation, base of code is derived from this link: https://www.gorillasun.de/blog/radial-perlin-noise-and-generative-tree-rings/

function setup() {
  createCanvas(innerWidth, innerHeight);
 background(249, 202, 24); //yellow here
  stroke(20);
  strokeWeight(1);
  noFill();
  frameRate(60);
}

let scale = 50;
// tweaked res to get the shape more round
let resolution = 0.0001;
let numPoints = 500;

let radius = 150;
let numRings = 40;
function draw() {
  translate(width / 2, height / 2); // center my shape

  //tweaked numbers here to get it to move like a cd more
  let offsetX = map(noise(frameCount * 0.01), 0, 3, -5, 5);
  let offsetY = map(noise(frameCount * 0.01 + 100), 0, 1, -5, 5);

  for (let r = 0; r < radius; r += radius / numRings) {
    // added cd colours between these strokes so that they are different
   if (r < radius * 0.1) {
    // make transparent to be able to skip drawing the first black lines
    noStroke();
  } else if (r > radius * 0.3) {
    stroke(0); // black
  } else {
    stroke(255); // white
  }

    beginShape();
    for (
      let a = -TAU / numPoints;
      a < TAU + TAU / numPoints;
      a += TAU / numPoints
    ) {
      let x = r * cos(a) + offsetX;
      let y = r * sin(a) + offsetY;

      let n = map(noise(x * resolution, y * resolution), 0, 1, -scale, scale);
      curveVertex(x + n, y + n);
      // did not want it as randomized so removed this part
      // if (random() > 0.75 - 0.25 * sin(r)) {
      //   endShape();
      //     beginShape();
      // }
    }
    endShape();
  }

  //  the following lines of code is derived from: https://p5js.org/reference/p5/frameCount/

  if (frameCount > 100) {
    noLoop(); // stops animation after 100 frames, freezes
  }
}
