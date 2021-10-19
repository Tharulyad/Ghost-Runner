var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  //spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,400,10,10)
  ghost.addImage(ghostImg)  
  ghost.scale = 0.2

  doorsGroup = createGroup()
  climbersGroup = createGroup()
  invisibleBlockGroup = createGroup()
}

function draw() {
  background(200);
  if(gameState==="play"){
  if(tower.y > 400){
      tower.y = 300
  }
  if(keyDown("space")){
    ghost.velocityY = -12
  }
  ghost.velocityY = ghost.velocityY+0.5
  if(keyDown("left_arrow")){
    ghost.x = ghost.x - 2
  }
  if(keyDown("right_arrow")){
    ghost.x = ghost.x + 2

  }
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0
  }
  if (invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
    gameState = "end"
    ghost.destroy()
    tower.destroy()
    climbersGroup.destroyEach()
    doorsGroup.destroyEach()
   invisibleBlockGroup.destroyEach()

  }
  spawnDoors()
    }
    else if (gameState==="end"){
      textSize(38)
      fill("yellow")
      text("You Lost",230,250)
    }
    drawSprites()
}

function spawnDoors(){
  if(frameCount%250===0){
    var door = createSprite(200,-50)
    var climber = createSprite(200,10)
 var invisibleBlock = createSprite(200,15)
door.velocityY = 1
climber.velocityY = 1
invisibleBlock.velocityY = 1
door.addImage(doorImg)
climber.addImage(climberImg)
door.x = Math.round(random(200,400))
climber.x = door.x
invisibleBlock.x = door.x
invisibleBlock.width  = climber.width
invisibleBlock.height = 2
ghost.depth = door.depth
ghost.depth = ghost.depth +1
doorsGroup.add (door)
climbersGroup.add(climber)
invisibleBlockGroup.add(invisibleBlock)
  }
}
