/* CITATION
Coding Tutorial by Patt Vira 
Name: Pastel Gradient Screensaver
Video Tutorial: https://youtu.be/Mdt81-7-U18
p5js link: https://editor.p5js.org/pattvira/sketches/QOtQJc5H7
*/

let balls = [];
let num = 50;
let hoverTimer = 0;
let hoverTexts = [];

let fixedSpeed = 0.5;

function setup() {
  createCanvas(innerWidth, innerHeight);

  for (let i = 0; i < num; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(200, 400);
    balls[i] = new Circle(x, y, r);
  }
}

function draw() {
  background(0);

  for (let i = 0; i < balls.length; i++) {
    balls[i].update();
    balls[i].display();
  }

  hoverTimer++;
  if (hoverTimer % 15 === 0) {
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
      let angle = random(TWO_PI);
      let speed = 0.2;

      let hoverText = new TextFollower(mouseX, mouseY, "hello");
      hoverText.vel = p5.Vector.fromAngle(angle).mult(speed);

      hoverTexts.push(hoverText); 
    }
  }

  // Update & display hover texts
  for (let i = hoverTexts.length - 1; i >= 0; i--) {
    hoverTexts[i].update();
    hoverTexts[i].display();

    hoverTexts[i].lifespan--;
    if (hoverTexts[i].lifespan <= 0) {
      hoverTexts.splice(i, 1); 
    }
  }

  // Limit the number of hover texts to 30
  if (hoverTexts.length > 30) {
    hoverTexts.splice(0, hoverTexts.length - 30); 
  }
}

// Circle class
class Circle {
  constructor(x, y, radius, c = null) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult();
    this.radius = radius;

    this.ctx = drawingContext;
    this.c = c || this.getHeatmapColor();
  }

  update() {
    this.pos.add(this.vel);

    if (this.pos.x > width) {
      this.vel.x *= -1;
      this.pos.x = width;
    } else if (this.pos.x < 0) {
      this.vel.x *= -1;
      this.pos.x = 0;
    }

    if (this.pos.y > height) {
      this.vel.y *= -1;
      this.pos.y = height;
    } else if (this.pos.y < 0) {
      this.vel.y *= -1;
      this.pos.y = 0;
    }
  }

  display() {
    let gradient = this.ctx.createRadialGradient(
      this.pos.x,
      this.pos.y,
      0,
      this.pos.x,
      this.pos.y,
      this.radius
    );

    let r = red(this.c);
    let g = green(this.c);
    let b = blue(this.c);

    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`);
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

    this.ctx.fillStyle = gradient;

    noStroke();
    ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
  }

  getHeatmapColor() {
    let colors = [
      color(0, 255, 0),
      color(255, 255, 0),
      color(255, 0, 0),
      color(0, 0, 255),
    ];
    return random(colors);
  }
}

// TextFollower class with fade-out
class TextFollower {
  constructor(x, y, txt) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.txt = txt;
    this.lifespan = 120; // 2 seconds at 60fps
  }

  update() {
    this.pos.add(this.vel);

    if (this.pos.x > width || this.pos.x < 0) this.vel.x *= -1;
    if (this.pos.y > height || this.pos.y < 0) this.vel.y *= -1;
  }

  display() {
    fill(0, map(this.lifespan, 0, 120, 0, 255)); // fade out
    noStroke();
    textSize(24);
    textAlign(CENTER, CENTER);
    text(this.txt, this.pos.x, this.pos.y);
  }
}
