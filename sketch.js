var gameState = "play"

var forest,forestimg

var boy,boyimg

var rock,rockimg1,rockimg2,rock1

var zombie1,zombie2,zombie1img,zombie2img,zombiehead,zombieheadimg

var restart,restartimg

var invisibleGround,invisibleGround2

var obstaclegroup

var score = 0


function preload(){

    forestimg = loadImage("forest.png")

    boyimg = loadAnimation("boyrun.png","boyrun2.png","boyrun3.png","boyrun4.png")

    rockimg1 = loadImage("rock.png")
    rockimg2 = loadImage("rock12.png")

    zombie1img = loadImage("zombie.png")
    zombie2img = loadImage("zombie2.png")
    zombieheadimg = loadImage("zombiehead.png")

    restartimg = loadImage("restart.png")


}


function setup(){
    createCanvas(windowWidth,windowHeight)
  
    forest = createSprite(200,200)
    forest.addImage("forest",forestimg)
    forest.velocityX = -4

    
    zombie1 = createSprite(100,windowHeight - 250)
    zombie1.addAnimation("run",zombie1img)
    zombie1.scale = 0.1

    
    zombie2 = createSprite(180,windowHeight - 250)
    zombie2.addAnimation("run",zombie2img)
    zombie2.scale = 0.2
    
    
    boy = createSprite(600,windowHeight - 250)
    boy.addAnimation("run",boyimg)
    boy.scale = 0.6


    restart = createSprite(800,windowHeight - 500)
    restart.addImage("restart",restartimg)
    restart.scale = 0.1

    invisibleGround = createSprite(800,windowHeight - 95,windowWidth,10)
    invisibleGround.visible = false

    invisibleGround2 = createSprite(800,100,windowWidth,10)
    invisibleGround2.visible = false

    obstaclegroup = new Group()
}

function draw(){
    background(11)


    if(gameState == "play"){

        score = score + Math.round(getFrameRate()/60)

        if(score % 700 == 0){
            forest.velocityX = -5
        }

        forest.velocityX = -(3 + 2* score/100)

        if(forest.x < 0 ){
            forest.x = width/4;
          }

    
        if(keyDown("space")){
            boy.velocityY = -10
        }

        spawnobstacles()
        spawnzombiehead()
        spawnobstacles2()

        if(boy.isTouching(obstaclegroup)){
            gameState = "end"
        }

        restart.visible = false

        boy.visible = true
        forest.visible = true
        zombie1.visible = true
        zombie2.visible = true
    }

    if(gameState == "end"){
        fill("yellow")
        stroke("yellow")
        textSize(40)
        text("Game Over",700,windowHeight - 400)

        
        restart.visible = true

        boy.visible = false
        forest.visible = false
        zombie1.visible = false
        zombie2.visible = false

        obstaclegroup.destroyEach()

    }
   
    if(mousePressedOver(restart)){
        console.log("over")
        reset()
    }
    boy.velocityY = boy.velocityY + 0.5

    boy.collide(invisibleGround)
    boy.collide(invisibleGround2)

   

    drawSprites()
    fill("Yellow")
    stroke("Yellow")
    textSize(30)
    text("Score:"+score,50,100)
}

function spawnobstacles(){
    if(frameCount % 550 == 0){
        rock = createSprite(windowWidth - 1,windowHeight - 180)
        rock.lifetime = 1000
        rock.addImage("rock",rockimg1)
        rock.setCollider("rectangle",0,0,400,250)
        rock.scale = 0.4
        rock.velocityX = -4

        if(score % 700 == 0){
            rock.velocityX = -4
        }

        rock.velocityX = -(3 + 2* score/100)

        zombie1.depth = rock.depth + 1
        zombie2.depth = rock.depth + 1

        obstaclegroup.add(rock)



    }
}

function spawnzombiehead(){
    if(frameCount % 800  == 0){
        zombiehead = createSprite(windowWidth - 1,windowHeight - 150)
        zombiehead.lifetime = 1000
        zombiehead.addImage("head",zombieheadimg)
        zombiehead.velocityX = -4
        zombiehead.scale = 0.15
        if(score % 700 == 0){
            zombiehead.velocityX = -4
        }

        zombiehead.velocityX = -(3 + 2* score/100)


        obstaclegroup.add(zombiehead)
    }
}

function spawnobstacles2(){
    if(frameCount % 1300 == 0){
        rock1 = createSprite(windowWidth - 1,windowHeight - 180)
        rock1.lifetime = 1000
        rock1.addImage("rock",rockimg2)
        rock1.setCollider("rectangle",0,60,550,350)
        rock1.scale = 0.4
        rock1.velocityX = -4
        if(score % 700 == 0){
            rock1.velocityX = -5
        }

        rock1.velocityX = -(3 + 2* score/100)

        obstaclegroup.add(rock1)

    }

}



function reset(){
    gameState = "play"

    score = 0

    restart.visible = false

    boy.visible = true
    forest.visible = true
    zombie1.visible = true
    zombie2.visible = true

}
