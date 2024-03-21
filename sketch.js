// Define player, bullets, and enemies
let player;
let bullets = [];
let enemies = [];
let playerShipImg, alienShipImg, asteroidImg;

function preload() {
  playerShipImg = loadImage('player_ship.png');
  alienShipImg = loadImage('alien_ship.png');
  asteroidImg = loadImage('asteroid.png');
}

function setup() {
  createCanvas(400, 400);
  player = new Player();
  // Create some enemies for demonstration
  for (let i = 0; i < 6; i++) {
    enemies.push(new Enemy(i * 60 + 60, 20));
  }
}

function draw() {
  background(0);
  
  player.show();
  player.move();
  
  // Handle bullets
  for (let bullet of bullets) {
    bullet.show();
    bullet.move();
    // Check for bullet-enemy collision
    for (let i = enemies.length - 1; i >= 0; i--) {
      if (bullet.hits(enemies[i])) {
        enemies.splice(i, 1);
        bullets = bullets.filter(b => b !== bullet);
      }
    }
  }
  
  // Check if enemies hit the edge
  let edge = false;
  for (let enemy of enemies) {
    enemy.show();
    enemy.move();
    if (enemy.x > width - 10 || enemy.x < 10) {
      edge = true;
    }
  }
  
  // Change direction and shift down if edge is hit
  if (edge) {
    for (let enemy of enemies) {
      enemy.shiftDown();
    }
  }
}

// Keyboard controls for player movement and shooting
function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    player.setDirection(1);
  } else if (keyCode === LEFT_ARROW) {
    player.setDirection(-1);
  } else if (key === ' ') {
    bullets.push(new Bullet(player.x + 10, height - 20));
  }
}

function keyReleased() {
  if (keyCode !== ' ') {
    player.setDirection(0);
  }
}

// Player class
class Player {
  constructor() {
    this.x = width / 2;
    this.xdir = 0;
  }

  show() {
    image(playerShipImg, this.x - 10, height - 30, 20, 20);
  }
  
  setDirection(dir) {
    this.xdir = dir;
  }

  move() {
    this.x += this.xdir * 5;
  }
}

// Bullet class
class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  show() {
    image(asteroidImg, this.x - 2, this.y - 2, 4, 4);
  }

  move() {
    this.y -= 5;
  }
  
  hits(enemy) {
    let d = dist(this.x, this.y, enemy.x, enemy.y);
    return d < 20;
  }
}

// Enemy class
class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xdir = 1;
  }

  show() {
    image(alienShipImg, this.x - 10, this.y - 10, 20, 20);
  }

  move() {
    this.x += this.xdir;
  }
  
  shiftDown() {
    this.xdir *= -1;
    this.y += 20;
  }
}
