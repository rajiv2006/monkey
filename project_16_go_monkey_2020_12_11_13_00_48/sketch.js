var PLAY = 0;
var END = 1;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score;
var backGround, backGroundImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
   monkeyCollide = loadAnimation("sprite_1.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backGroundImage = loadImage("background.png"); 
}



function setup() {
  
  createCanvas(700,400)
  
   backGround =  createSprite(350,200);
  backGround.addImage(backGroundImage)
  backGround.velocityX = -3
  backGround.x = backGround.width /2
  backGround.scale = 1.6;
  
  monkey = createSprite(80,350,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("collide",monkeyCollide)
  monkey.scale = 0.1;
  
  ground = createSprite(300,370,600,20);
  ground.visible = false;
  
  
  bananaGroup = createGroup();
  obstacleGroup =  createGroup();
  score =0 ;
   

  
}


function draw() {
  
    if (gameState === PLAY) {
   Obstacle();
    Banana();
      
  survivalTime = survivalTime + Math.round(getFrameRate() / 60);
   

    backGround.velocityX = -3 

  if(keyDown("space")&& monkey.y >= 220) {
    monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY+0.8;
      
     if (backGround.x < 0){
      backGround.x = backGround.width/2;
    }
        monkey.collide(ground);

    if (monkey.isTouching(bananaGroup)) {
      bananaGroup.destroyEach();

    }
    if (monkey.isTouching(obstacleGroup)) {
      gameState = END;
    }
  }
  if (gameState === END) {
    backGround.velocityX = 0;

    monkey.y = 300;
    monkey.changeAnimation("collide", monkeyCollide);

    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  
 
 
    
  
  }
  
 
  
  
  
  drawSprites();

  var survivalTime = 0;
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: "+survivalTime,350,50);
    
}

function Banana() {
    if (frameCount % 80 === 0) {

   banana = createSprite(200,150,20,20);
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4
    banana.lifetime = 220;
    
    bananaGroup.add(banana);
  }
}

function Obstacle() {
  if (frameCount % 200 === 0) {

    obstacle = createSprite(260,330,20,20);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13;
    obstacle.velocityX = -4
    obstacle.lifetime = 220;
   
      
      obstacleGroup.add(obstacle);
    }  
  
  
}