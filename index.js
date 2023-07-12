
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var gameOver = false; // track krnge

var level = 0;
var started = false;

var timeDuration = 10000;
var timer;
var timeRemaining;

$(document).on("mousedown touchstart keydown", function () {
  if (!started) {
    nextSequence();
    started = true;
    startTimer();
  }
});

$(".btn").click(function (event) {
  if (gameOver) return; // game over hote hi return
  var userChosenColour = $(event.target).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});
function nextSequence() {
  highScore(level);
  $("#level-title").text("level " + level);
  level++;
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
  .fadeIn(100)
  .fadeOut(100)
  .fadeIn(100);
  playSound(randomChosenColour);
}
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      clearTimeout(timer);
      setTimeout(() => {
        nextSequence();
        startTimer();
      }, 1000);
    }
    
  }else{
    
    gameOver = true; // wrong ans ke liye
    $('body').addClass("game-over");
    setTimeout(() => {
      $('body').removeClass('game-over');
    }, 200);
    $('h1').text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    startOver();
  } 
}


function highScore(score){
  $("#highscore").text(score);
}

function startOver(){
  level=0;
  started=false;
  gamePattern=[];
  gameOver = false; 
  clearTimeout(timer);
  timeDuration=10000;
}

function startTimer () {
  if(level>=0&&level<=5){
    timeDuration=10000;
  }else if(level>=6&&level<=10){
    timeDuration=20000;
  }else{
    timeDuration=30000;
  }
    timeRemaining=timeDuration;
    updateTimerDisplay(timeRemaining);
  
    timer=  setInterval(function () {
        timeRemaining -=1000;    
        if(timeRemaining<=0){
            clearInterval(timer);
            gameOver = true; // wrong ans ke liye
            $('body').addClass("game-over");
            setTimeout(() => {
                $('body').removeClass('game-over');
              }, 200);
      $('h1').text("Game Over, Press Any Key to Restart")
      playSound("wrong");
      startOver();
    }
    updateTimerDisplay(timeRemaining);
  }, 1000);

}
function updateTimerDisplay(time) {
    var seconds = Math.floor(time/1000);
    $('#timer').text(seconds+"s");
  }
  
  // Event listener for mobile tap (click)
  $(document).on("touchstart", function () {
      if (gameOver) {
          startOver();
          nextSequence();
          startTimer();
        }
      });
      
      
    