var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage,cloudimg,cloudgroup,ob1,ob2,ob3,ob4,ob5,ob6,obstaclesgroup;
var score;

function preload(){
  trex_running = loadImage("running.png");
  trex_collided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudimg=loadImage("cloud.png");
  ob1=loadImage("obstacle1.1.png");
   ob2=loadImage("obstacle2.2.png");
   ob3=loadImage("obstacle3.3.png");
   ob4=loadImage("obstacle4.4.png");
   ob5=loadImage("obstacle5.5.png");
   ob6=loadImage("obstacle6.6.png");
 }
function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.scale= 1;
  trex.addImage("running", trex_running);
  trex.scale = 0.5;
  score=0;
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  cloudgroup=new Group();
 obstaclesgroup=new Group();
}

function draw() {
  background(220);
  
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
   score =score+ Math.round(getFrameRate()/60);
  text("Score: "+ score, 550, 50);
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  spawnClouds();
  spawnObstacles();
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(20,120));
    cloud.addImage(cloudimg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 200;
    cloudgroup.add(cloud);
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,160,10,40);
    obstacle.velocityX = -6;
    obstaclesgroup.add(obstacle);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
  switch(rand){
    case 1:obstacle.addImage(ob1);
    break;
     case 2:obstacle.addImage(ob2);
    break;
     case 3:obstacle.addImage(ob3);
    break;
     case 4:obstacle.addImage(ob4);
    break;
     case 5:obstacle.addImage(ob5);
    break;
     case 6:obstacle.addImage(ob6);
    break;
    default:break;
  }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
  }
}
