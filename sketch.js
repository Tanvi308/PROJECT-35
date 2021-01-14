//Create variables here
var database ,dog,dog1,dog2
var position
var feed,add
var foodobject
var Feedtime
var Lastfeed


function preload()
{
  //loading  images 
  dogimg1 = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")
	
}

function setup() {

//creating canvas
   createCanvas(1000, 500);
  
//assigning variable to database
  database = firebase.database();
  
 // creating the database
  foodobject=new Food()
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2

//fetching foodStock from database
  var dogo = database.ref('Food');
  dogo.on("value", readPosition);

//button for feeding the dog
  feed = createButton("FEED ME")
  feed.position(500,60)
  feed.mousePressed(FeedDog)

//button for adding milk 
  add = createButton("ADD FOOD")
  add.position(400,60)
  add.mousePressed(AddFood)

} 



function draw(){

 //add styles here
  background(46,139,87);
  foodobject.display()
  drawSprites(); 
  fill(255,255,254);
  textSize(15);
}

function readPosition(data){
   position = data.val();
   foodobject.updateFoodStock(position)
   console.log(position.x);
}

function writePosition(nazo){
if(nazo>0){
  nazo=nazo-1
}
else{
  nazo=0
}
database.ref('/').set({
'Food': nazo
})
}
function AddFood(){
  position++
  database.ref('/').update({
  Food:position
})}

function FeedDog(){

    dog.addImage(dogimg2)
    foodobject.updateFoodStock(foodobject.getFoodStock()-1)
    database.ref('/').update({
    Food:foodobject.getFoodStock(),
    FeedTime:hour ()
 })}
 
  
  