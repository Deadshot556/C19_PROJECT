var player;
var obstacles = [9];
var score = 0;
var road;

function preload() {
  
  playerImg = loadImage('r1.png');
  obstacleImg = loadImage('obstacle.png');
  roadImg = loadImage('road1.png')
}

function setup() {
  
  createCanvas(600, 400);
  
  player = new Player();


    road=createSprite(width/2,200);
    road.addImage(roadImg);
    road.velocityY = 4;
}

function draw() {

  
  player.update();
  player.show();

  if (frameCount % 60 == 0) {
    obstacles.push(new Obstacle());
  }
 
  for (var i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].show();
    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
    }
   
    if (obstacles[i].hits(player)) {
      score = 0;
      obstacles = [];
    }
  }
  
  textAlign(CENTER);
  textSize(20);
  text(score, width/2, 30);
  score++;
}

function Player() {
  
  this.x = 50;
  this.y = height - 50;
  this.velY = 0;
  this.gravity = 0.5;
 
  this.update = function() {
    this.velY += this.gravity;
    this.y += this.velY;
  
    if (this.y > height - 50) {
      this.y = height - 50;
      this.velY = 0;
    }
  }
 
  this.show = function() {
    image(playerImg, this.x, this.y, 50, 50);
  }
}


function Obstacle() {
 
  this.x = width;
  this.y = height - 50;
  this.velX = -5;
 
  this.update = function() {
    this.x += this.velX;
  }
 
  this.show = function() {
    image(obstacleImg, this.x, this.y, 50, 50);
  }
  
  this.offscreen = function() {
    if (this.x < -50) {
      return true;
    } else {
      return false;
    }
  }
  
  this.hits = function(player) {
    if (player.x + 50 > this.x && player.x < this.x + 50 && player.y + 50 > this.y) {
      return true;
    } else {
      return false;
    }
  }
}

