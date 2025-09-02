function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  background(255, 255, 255);

  const originalY = 300;

  beginShape();

  for (let x = 0; < innerWidth; x++) {
        const y = originalY + Math.random() * 100;
        vertex(x,y);
  }
  
  endShape();

  noLoop();
}
