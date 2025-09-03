// citation, base of code is derived from this link: https://www.gorillasun.de/blog/radial-perlin-noise-and-generative-tree-rings/


function setup() {
  createCanvas(innerWidth, innerHeight);
  background(0);
  strokeWeight(1);
  noFill();
  frameRate(30);

  colorMode(HSB, 360, 100, 100); // HSB color mode here
}

let scale = 50;
//changed res for the strokes to change shape based on how i liked the outcomes the most
let resolution = 0.00969;
let numPoints = 500;
let radius = 150;
let numRings = 50;

function draw() {
  translate(width / 2, height / 2);  // center my shape

    //tweaked numbers here to get it to look like a cd more
  let offsetX = map(noise(frameCount * 0.01), 0, 3, -5, 5);
  let offsetY = map(noise(frameCount * 0.01 + 100), 0, 1, -5, 5);

  for (let r = 0; r < radius; r += radius / numRings) {
    // added cd colours between these strokes
    if (r < radius * 0.01 || r > radius * 0.01) {
      let randomHue = Math.random() * 360; 
      stroke(randomHue, 100, 100); 
    } else {
      stroke(0);
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
    }
    endShape();
  }
 //  the following lines of code is derived from: https://p5js.org/reference/p5/frameCount/

  if (frameCount > 30) {
    noLoop(); // stops animation
  }
}
