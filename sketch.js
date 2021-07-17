var asteroidImg, asteroid, asteroidsGroup, starsGroup;
var rocket, rocketImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "PLAY"
var score = 0

function preload(){
  asteroidImg = loadImage("asteroid.png");
  rocketImg = loadImage("rocket.png");
  starImg = loadImage("star.png")
}

function setup() {
  createCanvas(600, 600);
  
  
  asteroidsGroup = new Group()
  starsGroup = new Group()

  rocket = createSprite(300, 400, 30, 30)
  rocket.addImage(rocketImg)
  rocket.scale = 0.4

  rocket.debug = true
  rocket.setCollider("circle", 0, 0,100) 
  
  

}

function draw() {
  background("black");
  
  if (gameState == "PLAY"){

    textSize(20)
    text("Score: " + score, 30, 30)
    if (keyDown("space")){
    rocket.velocityY = -7
    }
    rocket.velocityY = rocket.velocityY+0.2
    if (keyDown("left")){
    rocket.x = rocket.x-15 
    }
    if (keyDown("right")){
    rocket.x  = rocket.x+15 
    }

    createAsteroids()
    createStars()

    if (rocket.isTouching(asteroidsGroup)){
      rocket.velocityY = 0
    }

    if (rocket.isTouching(asteroidsGroup) || rocket.y > 600) {
      gameState = "END"
    }
    if (rocket.isTouching(starsGroup) || rocket.y>600){
      score = score + 5
      starsGroup.destroyEach()
    }

  }
  else if (gameState == "END"){
    rocket.destroy()
    asteroidsGroup.destroyEach()
    textSize(50)
    fill("red")
    text("Game Over", 170, 300)
   
  }

    drawSprites()
}

function createAsteroids(){
  if (frameCount % 200 == 0){
    asteroid = createSprite(Math.round(random(50, 550)), 0, 30, 30)
    asteroid.velocityY=4
    asteroid.scale = 0.1
    asteroid.addImage(asteroidImg)
    asteroidsGroup.add(asteroid)
    rocket.depth = asteroid.depth
    rocket.depth+=1
  }

}

function createStars(){
  if (frameCount % 200 == 0){
    star = createSprite(Math.round(random(50, 550)), 0, 30, 30)
    star.velocityY=2
    star.scale = 0.1
    star.addImage(starImg)
    starsGroup.add(star)
    rocket.depth = star.depth
    rocket.depth+=1
  }
}