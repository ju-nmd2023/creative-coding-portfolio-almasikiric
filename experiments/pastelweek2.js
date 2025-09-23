/* CITATION
Coding Tutorial by Patt Vira 
Name: Pastel Gradient Screensaver
Video Tutorial: https://youtu.be/Mdt81-7-U18
p5js link: https://editor.p5js.org/pattvira/sketches/QOtQJc5H7


*/

let balls = [];
let num = 50;

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
  background(255);

  for (let i = 0; i < balls.length; i++) {
    balls[i].update();
    balls[i].display();
  }
  
}
// Spawns a burst of circles at the click position, same randomized colors as the background
function mouseClicked() {
  for (let i = 0; i < 5; i++) {
    let r = random(100, 150,); 
    let angle = random(TWO_PI);
    let speed = random(0.2, 2);
    
    // Create a new circle with velocity pointing in a random direction
    let clickCircle = new Circle(mouseX, mouseY, r, );
    clickCircle.vel = p5.Vector.fromAngle(angle).mult(speed);
    balls.push(clickCircle);
  }
}

//circle draws and becomes visible. Adding flow fields like add and mult to control direction and magnitude.
class Circle {
  constructor(x, y, radius) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(2, 2));
    this.radius = radius;

    this.ctx = drawingContext;
    this.c = this.getPastelColor();
  }
  //using p5 to create motion

  update() {
    this.pos.add(this.vel);
    // Collision with canvas edges with reflection, follows algorithmic motion

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
  //Visual Complexity: radial gradients to create smooth effects

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

    // gradient.addColorStop(0, "green");
    // gradient.addColorStop(0.7, "white");
    // gradient.addColorStop(1, "pink");
    this.ctx.fillStyle = gradient;

    noStroke();
    ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
  }

  getPastelColor() {
    let r = random(150, 255);
    let g = random(150, 255);
    let b = random(150, 255);
    return color(r, g, b);
  }
}
function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
  clear();
  setup();
}