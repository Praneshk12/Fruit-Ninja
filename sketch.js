// Declaring variables
var knife,knifeImage,knifeSound, gameOver, gameoverimage,gameoversound;
var fruit, fruit1, fruit2, fruit3, fruit4, fruitGroup;
var enemy, monster, enemyGroup, monsterImage;
var Bg, Bg_img, lives, bombSound, restart, restart_img;

var PLAY = 1;
var END = 0 ;
var gamestate = PLAY;

function preload(){
  //loads all the images and sounds 
  knifeImage = loadImage("sword.png");
   fruit1Image = loadImage("fruit1.png");
   fruit2Image = loadImage("fruit2.png");
   fruit3Image = loadImage("fruit3.png");
   fruit4Image = loadImage("fruit4.png");
   monsterImage = loadAnimation("alien1.png","alien2.png");
Bg_img = loadImage("background-scene---dojo.png");
   gameoverimage = loadImage("gameover.png");
  restart_img = loadImage("restart_img.jpg");
   knifeSound = loadSound("Sword-Slice-Quick-Transition-www.fesliyanstudios.com.mp3");
   gameoversound = loadSound("gameover.mp3");
   bombSound = loadSound("Bomb Exploding Sound Effect.mp3");
}

function setup() {
  
  //creates canvas/workspace
  createCanvas(400,400);
  
  //creates background sprite
  Bg = createSprite(200,200);
    
  //creates knife sprite and gives the score and lives values
    knife = createSprite(200,150,20,20);
    score = 0;
    lives = 3;
    
    //creates fruit and enemy groups
    fruitGroup = createGroup();
    enemyGroup = createGroup();
  
  //creates gameover sprite, adds the image, and  scales it
  gameOver = createSprite(500,200,10,10);
  gameOver.addImage(gameoverimage);
  gameOver.scale = 1;
  gameOver.visible = false;
  
  //creates restart sprite, adds the image, and  scales it
  restart = createSprite(500,300);
  restart.addImage(restart_img);
  restart.scale = 0.1;
  restart.visible = false;
}

function draw(){
  //adds the background image and scales it
  Bg.addImage(Bg_img);
  Bg.scale = 1.9;
  //background for the program
  background("lightgreen");

  //calls these functions
  fruits();
  Enemy();
  
  //if gamestate = play...
  if(gamestate === PLAY){ 
  //allows user to move the knife left, right, up, and down 
    knife.x = World.mouseX;
     knife.y = World.mouseY;
    //adds the knife image 
    knife.addImage(knifeImage);
    //scales the image down  
    knife.scale = 0.5;
    
     if(knife.isTouching(fruitGroup)){
      //destroys fruits
       fruitGroup.destroyEach();
      //plays knife sound
      knifeSound.play();
      //increases score by increments of 1
       score = score + 1;
    }
    //if knife is touching the enemies
    if(knife.isTouching(enemyGroup)) { 
      //destroy enemies/monsters
      enemyGroup.destroyEach();
      //plays bomb sound
      bombSound.play();
      //decreases lives
      lives = lives - 1;
    }
    
 //Go to the end state if you have no lives left
    if(lives === 0) {
      gamestate = END;
      enemyGroup.setVelocityEach(0);
      fruitGroup.setVelocityEach(0);
      gameoversound.play();
      //destroy fruits and enemy groups
      enemyGroup.destroyEach();
      fruitGroup.destroyEach();
    }
  } 
  
  if(gamestate === END)  {
    //adds the gameover image 
    knife.x = 200;  
    knife.addImage(gameoverimage);
      knife.scale = 1;
    //makes the restart button visible
    restart.x = 200;
    restart.y = 300;
    restart.visible = true;
    //sets all the fruits and enemies velocities to zero
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    //destroys all the fruits and enemies 
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    
    //sets the knife's x and y axis
     knife.x = 200;
     knife.y = 200;
    
  }
  
  //Reset the game once it gets over
  if(mousePressedOver(restart))  {
    gameState = PLAY;
    score = 0;
    lives = 3;
    restart.visible = false;
    restart.x = 500;
    gameOver.x = 500;
    gameOver.visible = false;
    gamestate = PLAY;
  }
  
  drawSprites();
  
  //displays score
  fill('white');
  textSize(25);
  text("Score: "+ score, 280,30);
  
  //displays lives
  fill('white');
  textSize(25);
  text("Lives: " + lives,10,30);
}


function fruits() {
  //To make fruits visible after every 75 frames
if(World.frameCount % 75 === 0) {
  //gives the fruit's position a value of 1 or 2
    position = Math.round(random(1,2));
  //creates general fruit sprite and scales it 
    fruit = createSprite(200,100,20,20);
    fruit.scale = 0.170;
  
  //gives random value value's of 1, 2, 3, 4
     r = Math.round(random(1,4))

  //if r = 1...
  if (r === 1)  {
      //adds the first fruit image
      fruit.addImage(fruit1Image);
  }
  
  //or if r = 2... 
    else if(r === 2)  {
      //adds the 2nd fruit image
      fruit.addImage(fruit2Image);
   }
  
  //or if r = 3... 
    else if(r === 3) {
      //adds the 3rd fruit image
      fruit.addImage(fruit3Image);
   }
  
  //or if r = 4 
    else if(r === 4)  {
      //adds the 4th fruit image
      fruit.addImage(fruit4Image); 
  }
     
  //if fruit's position = 1...
  if(position == 1)   {
  //fruit's x position is coming from right side 
      fruit.x = 400
    //fruit's x velocity is - 7 + the score/4
      fruit.velocityX = -(8 + (score/4));       
 }
  //if position variable = 2...
      else if (position == 2)   {
      //fruit spawns on the left side of canvas
      fruit.x = 0
      //fruit's velocity is 7 + the score/4
      fruit.velocityX = 8 + (score/4); 
  } 
    
  //generates a random y - axis for the fruit
  fruit.y= Math.round(random(50,350));
    
   //fruit's lifetime is 100
    fruit.lifetime = 100;
    
  //To add fruit to fruitGroup
    fruitGroup.add(fruit);
  
  //To make fruit appear from both sides
  changefruit = Math.round(random(1,2))
  if(changefruit === 1) {
      fruit.velocityX=-(8 + score/4);
      fruit.x = 400;
  }
    
  else if(changefruit === 2 ) {
      fruit.velocityX = (8 + score/4);
      fruit.x = 0;
    }
  }
}

function Enemy() {
  
  //To make enemy visible after every 150 frames
  if (World.frameCount % 150 === 0) {
    //creates general monster sprite
    monster = createSprite(450,250,20,20); 
    //adds the animation/image
    monster.addAnimation("alien",monsterImage);
    //generates random y position
    monster.y = Math.round(random(100,350));
    //gives monsters velocity
    monster.velocityX = -(8 + (score/10));
    //gives monster's a lifetime
    monster.lifetime = 125;
    
    //To add monster to enemyGroup
    enemyGroup.add(monster);
    
    //To make monster appear from both sides
  changemonster = Math.round(random(1,2));
  if(changemonster === 1)  {
      monster.velocityX = -(8 + score/10);
      monster.x = 400;
   }
    else if(changemonster ===  2)  {
      monster.velocityX = (8 + score/10);
      monster.x = 0;
    }
  }
}
  
  




