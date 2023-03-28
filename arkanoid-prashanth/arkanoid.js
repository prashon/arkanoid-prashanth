let cavnas = document.querySelector("canvas"); 
  let context = canvas.getContext("2d");
  let x = canvas.width / 2; //
  let y = canvas.height - 50;
  let dx = 3;  //the ball moves in x axis by these many pixels for every frame
  let dy = -3; //the ball moves in y axis by these many pixels for every frame
  let radius = 10;  
  let padle1Width = 10;
  let padle1Height = 50;
  let padle1X = 0; //initial x offSet of the padle
  let padle1Y = (canvas.height-padle1Height)/3; //initial y offSet of the padle 
  let scorePlayer1 = 0;
  let padle2Width = 10;
  let padle2Height = 50;
  let padle2X = canvas.width-padle1Width; //initial x offSet of the padle
  let padle2Y = (canvas.height-padle1Height)/2; //initial y offSet of the padle 
  let scorePlayer2 = 0;
  let paused = false;

// function which draws the ball
const drawBall = () => {
  context.beginPath();
  context.arc(x,y,radius,0,2*Math.PI);
  context.fillStyle = "#FFA500";
  // context.lineWidth = 10;
  context.fill();
  context.closePath();
}
// function which draws the ball ends here

//function which draws the ball and padle for every frame starts here
const draw = () => {
  context.clearRect(0,0,canvas.width,canvas.height);//clears the canvas for every frame
  x += dx;
  y += dy;

  //check if the ball circumference is touching the left/right border of canvas and bounce back respecting the boundary
  if(x+dx < (radius-padle1X) || x+dx > (canvas.width - (radius-padle1X))){

  //check if the ball circumference is touching the left padle (red) 
    if( y+dy > padle1Y && y+dy < padle1Y+padle1Height && x+dx < (radius-padle1X)){
      scorePlayer1++;
      document.querySelector(".score1").innerHTML = scorePlayer1;
    } else if( y+dy > padle2Y && y+dy < padle2Y+padle2Height && x+dx > (canvas.width-padle2Width-radius)){
  //check if the ball circumference is touching the right padle (blue) 
      scorePlayer2++;
      document.querySelector(".score2").innerHTML = scorePlayer2;
    }

    dx = -dx;

  }

  //check if the ball circumference is touching the top/bottom border of canvas and bounce back respecting the boundary
  if(y+dy < (radius+padle1X) || y+dy > canvas.height - (radius+padle1X)){
    dy = -dy;
  }


  drawBall ();
  drawPadle();
}

//function which draws the ball and padle for every frame ends here

//function to draw the padle starts here
const drawPadle = () => {
  //draw padel1
  context.beginPath();
  context.rect(padle1X,padle1Y,padle1Width,padle1Height);
  context.fillStyle = "red";
  context.fill()
  context.closePath();
  //padle2 ends here

  //draw padle2
  context.beginPath();
  context.rect(padle2X,padle2Y,padle2Width,padle2Height);
  context.fillStyle = "blue";
  context.fill()
  context.closePath();
  //padle2 ends here

}
//function to draw the padle ends here

// keyboard events for the users to play start here

document.addEventListener("keydown", (event) => {
  // alert(padle2Y);

  // Disabling the padle movement for enabling only the basic functionality as per the requirement
  if(document.body.className == "disablePads"){
    return
  } 

  if(event.key === "a"){
    if(padle1Y > 340){
      return
    }
    padle1Y = padle1Y + 25;
  } else if(event.key === "q"){
    if(padle1Y < 20){
      return
    }
    padle1Y = padle1Y - 25;
  } 
  
  if(event.key === "ArrowLeft"){
    if(padle2Y > 340){
      return
    }
    padle2Y = padle2Y + 25;
  } else if(event.key === "ArrowUp"){
    if(padle2Y < 20){
      return
    }
    padle2Y = padle2Y - 25;
  }


});

// keyboard events for the users to play end here
 

let padSelector = document.querySelector("#togglePads");

//toggle the Pads activation
padSelector.addEventListener("click", ()=>{
  if (document.body.className == "disablePads"){
    padSelector.innerText = "Disable Pads";
    document.body.className = "";
  } else {
    padSelector.innerText = "Enable Pads";
    document.body.className = "disablePads";
  }
  });
//toggle the Pads activation ends here

const toggleGameState = () => {
  paused = !paused;
  paused ? clearInterval(startGame) : (startGame = setInterval(draw, 10));
}

var startGame = setInterval(draw, 10);


document.addEventListener("keypress", (event) => {
  // console.log(event.key)
  if(event.key === " ")
    toggleGameState();
})