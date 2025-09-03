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
  translate(width / 2, height / 2); // center my shape

  //tweaked numbers here to get it to look like a cd more
  let offsetX = map(noise(frameCount * 0.01), 0, 3, -5, 5);
  let offsetY = map(noise(frameCount * 0.01 + 100), 0, 1, -5, 5);

  for (let r = 0; r < radius; r += radius / numRings) {
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

  if (frameCount > 85) {
    noLoop(); // stops animation after 100 frames, freezes
  }
}
