//setting up a canvas
function setup() {
  createCanvas(innerWidth, innerHeight);
  xOff = 20;
  noFill();
  rectMode(CENTER);
}

// citation, base of code is derived from this link: https://www.gorillasun.de/blog/smooth-curves-with-perlin-noise-and-recreating-the-unknown-pleasures-album-cover-in-p5/
//I tweaked numbers so that it fits more with the style, smoother curves and not so squiggly as the example.

function draw() {
  translate(width / 2, height / 2);

  background(237, 224, 200);
  noFill(); // for the pattern lines
  stroke(0, 105, 148);

  //added a stroke weight so that it is more pronounced
  strokeWeight(7);

  push();
  scale(0.3);
  translate(-width / 2, -height / 1);

  //this outer loop indicates repetition everytime you update the browser
  for (n = 0; n < height; n += 80) {
    beginShape();

    for (i = xOff; i < width - xOff; i += 25) {
      let d = dist(i, n, width / 2, n);
      //tweaked the numbers so the lines are smoother, added a framecount so that the lines move in VOL2
      curveVertex(i, n - noise(i * 0.01, frameCount * 0.004) * (50 - d));
    }

    endShape();
  }
  pop();
}
function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
  clear();
  setup();
}