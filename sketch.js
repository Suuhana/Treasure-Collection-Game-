//declaration of variables
var path, boy, cash, diamonds, jwellery, sword;

var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg;

var treasureCollection = 0;

var cashG,diamondsG,jwelleryG,swordG;

//declaration of game states
var PLAY=1;

var END=0;

var gameState=1;

function preload(){
  //preloading the images & animations
  pathImg = loadImage("Road.png");
  
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  
  cashImg = loadImage("cash.png");
  
  diamondsImg = loadImage("diamonds.png");
  
  jwelleryImg = loadImage("jwell.png");
  
  swordImg = loadImage("sword.png");
  
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  //creating a background
  createCanvas(400,450);
  
  //creating moving background
  path=createSprite(200,200);
  path.addImage(pathImg);
  path.velocityY = 4;
  
  //creating running boy
  boy = createSprite(70,440,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;

  //creating different groups
  cashG = new Group();
  
  diamondsG = new Group();
  
  jwelleryG = new Group();
  
  swordG = new Group();
  }

function draw() {

  if(gameState===PLAY){
    //setting background color
    background(0);
    
    //assigning boy's 'x' postion
    boy.x = World.mouseX;

    //creating edges sprites & colliding the boy with them
    edges= createEdgeSprites();
    boy.collide(edges);

    //resetting the background
    if(path.y > 400 ){
      path.y = height/2;
  }
  
    //calling necessary functions
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    //collision events
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+150;
      
    }else{
      if(swordG.isTouching(boy)) {
        gameState = END;
        boy.addAnimation("SahilRunning",endImg);
        boy.x = 200;
        boy.y = 230;
        boy.scale = 0.8;
        
        cashG.destroyEach();
        cashG.setVelocityEach(0);
        swordG.destroyEach();
    }
  }
  
  drawSprites();
    
  //displaying the text
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);
  }

}

//creating the treasure and setting their properties

function createCash() {
  if (World.frameCount % 150 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
    
  cash.addImage(cashImg);
    
  cash.scale=0.12;
    
  cash.velocityY = 5;
    
  cash.lifetime = 150;
    
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 300 == 0) {
    var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));

    diamonds.addImage(diamondsImg);

    diamonds.scale=0.03;

    diamonds.velocityY = 6;

    diamonds.lifetime = 150;

    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
    var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
    
    jwellery.addImage(jwelleryImg);
    
    jwellery.scale=0.13;
    
    jwellery.velocityY = 7;
    
    jwellery.lifetime = 150;
    
    jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 500 == 0) {
    var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
    
    sword.addImage(swordImg);
    
    sword.scale=0.1;
    
    sword.velocityY = 8;
    
    sword.lifetime = 150;
    
    swordG.add(sword);
  }
}