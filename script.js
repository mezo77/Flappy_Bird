
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
// load images
var bird = new  Image();
var bg = new  Image();
var fg = new  Image();
var pipeNorth = new  Image();
var pipeSouth = new  Image();

bird.src = "imgs/bird.png";
bg.src = "imgs/bg.png";
fg.src = "imgs/fg.png";
pipeNorth.src = "imgs/pipeNorth.png";
pipeSouth.src = "imgs/pipeSouth.png";

var gap = 85;
var constant;
var bird_init_x_coordinate = 10;
var bird_init_y_coordinate = 150;
var gravity = 1.5;
var score = 0;

var flySound = new Audio();
var scoreSound = new Audio();
var failSound = new Audio();

flySound.src = "sounds/fly.mp3";
scoreSound.src = "sounds/score.mp3";
failSound.src = "sounds/fail3.mp3";


// adding keydown eventlistener
document.addEventListener("keydown", moveUp);

function moveUp() {
  bird_init_y_coordinate -= 30;
  flySound.play();
}

// define the pipes of the game
var pipe = [];
pipe[0] = {
  x: cvs.width,
  y: 0
};

// function to draw the images
function draw() {
  ctx.drawImage(bg, 0, 0);
  for(var i=0; i<pipe.length; ++i) {
    constant = pipeNorth.height + gap;
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y+constant);

    pipe[i].x--;

    // adding more pipes with random locations
    if(pipe[i].x==125) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random()*pipeNorth.height)- pipeNorth.height
      });
    }

    // when the bird hits something, it will reload the page
    if(bird_init_x_coordinate + bird.width >= pipe[i].x &&
      bird_init_x_coordinate <= pipe[i].x + pipeNorth.width &&
      (bird_init_y_coordinate <= pipe[i].y + pipeNorth.height ||
      bird_init_y_coordinate + bird.height >= pipe[i].y+constant) ||
      bird_init_y_coordinate + bird.height >= cvs.height - fg.height) {
        failSound.play();
        setTimeout(function(){
          location.reload();
        }, 200);
    }

    if(pipe[i].x == 1) {
      score++;
      scoreSound.play();
    }


  } // end fo for loop



  ctx.drawImage(fg, 0, cvs.height - fg.height);

  ctx.drawImage(bird, bird_init_x_coordinate, bird_init_y_coordinate);

  bird_init_y_coordinate += gravity;

  ctx.fillStyle = "#000";
  ctx.font = "20px fantasy";
  ctx.fillText("Score: " + score, 10, cvs.height-20);

  requestAnimationFrame(draw);
}

draw();
