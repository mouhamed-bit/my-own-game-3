var ground, invisibleGround;

var player;
var bg
var NPC, reaper;
var caves, cave;
var score = 0;
var obstacleGroup, obstacle, obstacle_img;
var coinGroup, coin, coin_img;
var gameState = 0;


function preload(){
caveImg = loadImage("cave.jpg");
reaperImg = loadImage("reaper.png");
ghostImg = loadImage("Ghost.png");
monsterImg = loadImage("Monster.png");
coin_img = loadImage("coin.png");
obstacle_img = loadImage("spikeBall.png");
}
function setup(){
    createCanvas(800, 400);
    bg = createSprite(200,200);
    bg.addImage(caveImg);
    bg.scale=0.39
    bg.velocityX=-2
    player = createSprite(50,350);
    player.addImage(ghostImg)
    player.scale = 0.2; 
    ground=createSprite(200,380,400,0.1 ) 
    obstacleGroup = new Group();
    coinGroup = new Group();
    }
function draw(){
    
    
    background(caveImg);
    
    player.x = 100;
    
    
    player.collide(obstacleGroup);
    
    if (gameState==="play"){
    
  
        if (bg.x<400){
          bg.x=bg.width/2
        }
        textSize(20)
        fill("white")
        
        if(keyDown("UP_ARROW")){
          player.y=-133.333333333;
        }
        if(keyDown("DOWN_ARROW")){
          player.y=133.333333333;
        }
        player.velocityY=player.velocityY+0.8;
        player.collide(ground);
        if(player.isTouching(coinGroup)){
          coinGroup.destroyEach();
          score++
        }
           
      switch(score){
        case 10: player.scale=0.12;
                  break;
        case 20: player.scale=0.14;
                 break;
        case 30: player.scale=0.16;
                 break;
        case 40: player.scale=0.18;
                  break;
       default: break;
      }
      if(obstacleGroup.isTouching(player)){
        player.velocityX = 0;
        player.velocityY = 0;
        
        gameState="end"
      }
         
          spawnobstacle();
        spawncoin();
        }
drawSprites();
textSize(20);
  fill(0);
  text("Score:"+ score,300 ,50);
  if (gameState==="end"){
    bg.velocityX=0;
    coinGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    coinGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  }
}
function spawnobstacle() {
    
    if (frameCount % 80 === 0) {
      var obstacle = createSprite(600,350,40,10);
      obstacle.x = Math.round(random(500,1200));
      obstacle.addImage(obstacle_img);
      obstacle.scale = 0.2;
      obstacle.velocityX = -3;
      obstacle.visible = true;
       
     obstacle.lifetime = 200;
      
      
     obstacle.depth = player.depth;
      obstacle.depth = player.depth + 1;
      
      
      obstacleGroup.add(obstacle);
    }
    
  } 
  
  function spawncoin() {
    
    if (frameCount % 120 === 0) {
      var coin = createSprite(600,350,40,10);
      coin.y = Math.round(random(50,300));
      coin.addImage(coin_img);
      coin.scale = 1;
      coin.velocityX = -6;
      
       
     coin.lifetime = 200;
      
      
      coinGroup.add(coin);
    }
    
  } 
  