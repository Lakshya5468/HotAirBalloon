var balloon,database,hballoon,pos,balloonImg;

function preload(){
    balloonImg=loadImage("HotAirBallon.png")
}

function setup(){
  database=firebase.database();
    createCanvas(500,500);
    balloon = createSprite(250,250,10,10);
    balloon.addImage(balloonImg)

    hballoon=database.ref("balloon/position");
    hballoon.on("value",readPosition,showError);
}

function draw(){
    background("background.png");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    //console.log(database);
    drawSprites();
}

function writePosition(x,y) {
    database.ref('balloon/position').set({
        'x': pos.x + x,
        'y': pos.y + y
    })

}
function readPosition(data) {
    pos=data.val();
    console.log(pos);
    balloon.x=pos.x;
    balloon.y=pos.y;
   }
function showError() {
    console.log("Error Recognised");
}