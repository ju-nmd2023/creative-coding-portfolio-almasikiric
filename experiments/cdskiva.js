// citation, base of code is derived from this link: https://www.gorillasun.de/blog/radial-perlin-noise-and-generative-tree-rings/

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(200, 200, 200);
  stroke(20);
  strokeWeight(1);
  noFill();
  frameRate(30);
}

let scale = 50;
let resolution = 0.002;
let numPoints = 500;

let radius = 150;
let numRings = 40;
function draw() {
  for (r = 0; r < radius; r += radius / numRings) {
    beginShape();

    for (
      a = -TAU / numPoints;
      a < TAU + TAU / numPoints;
      a += TAU / numPoints
    ) {
      var x = width / 2 + r * cos(a);
      var y = height / 2 + r * sin(a);

      var n = map(noise(x * resolution, y * resolution), 0, 1, -scale, scale);

      curveVertex(x + n, y + n);

      if (random() > 0.75 - 0.25 * sin(r)) {
        endShape();
        beginShape();
      }
    }
    endShape();
  }
//i put the noloop outside of the function to stop draw() from looping so the shape is drawn once and remains static, the strokes appear moresol


  // framecount here makes it stop looping after 100 frames
  if (frameCount > 100) {
    noLoop(); //freezes my animation
  }
}
