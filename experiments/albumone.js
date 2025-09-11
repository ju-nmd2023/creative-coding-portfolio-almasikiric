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
  background(255);

  translate(width / 2, height / 2);

  // rect(0, 0, width, width);
  background(0);

  noFill(); // for the pattern lines
  stroke(255); // white lines on black

  //added a stroke weight
  strokeWeight(5);

  //this adds  a simple line
  // beginShape();
  // for (i = xOff; i < width-xOff; i+=10) {
  //   curveVertex(i,200);
  // }
  // endShape();

  //adds a curvy line to easier understand further on
  // beginShape();
  // for (i = xOff; i < width-xOff; i+=10) {
  //   curveVertex(i, height/2+noise(i)*50);
  // }
  // endShape();

  // the following code (line 27-32) adds another vertex shape, changes everytime you update the browser

  // beginShape();
  // for (i = xOff; i < width-xOff; i+=25) {
  //   var d = dist(i,height/2,width/2,height/2);
  //   curveVertex(i, height/2-noise(i*0.08)*(100-d)); //noise makes natural-looking waves
  // }
  // endShape();

  //repeats the pattern of my desired shape in a for loop
  push();
  scale(0.3);
  translate(-width / 2, -height / 1);

  //this outer loop indicates repetition everytime you update the browser
  for (n = 0; n < height; n += 80) {
    beginShape();

    for (i = xOff; i < width - xOff; i += 25) {
      let d = dist(i, n, width / 2, n);
      //tweaked the numbers so the lines are in smoother curves
      curveVertex(i, n - noise(i * 0.01) * (50 - d));
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