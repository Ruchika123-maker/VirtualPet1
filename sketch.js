//Create variables here

var happyDog,dog;
var database;
var foodS,foodStock;

function preload()
{
	//load images here
   dogI = loadImage("images/dogImg.png");
   dogI2 = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);

  dog = createSprite(250,250,10,10);
  dog.addImage(dogI);
  dog.scale = 0.4;
  
  database = firebase.database();

  foodStock = database.ref('food');
  foodStock.on("value", readStock);

}


function draw() { 
  background(46, 139, 87); 

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogI2);
  }

  drawSprites();
  //add styles here

  strokeWeight("4");
  stroke("red");
  fill("white");
  textSize(30);
  text("Food Remaining :" + foodS, 100,480);
  textSize(23);
  text("Note: Press the Up Arrow Key to feed Shiru Milk!" ,5,30);

}

function readStock(data){
  foodS=data.val();
}

function writeStock (x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    food: x 
  })
}
