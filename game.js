var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor = "";
var gamePattern = [];
var userClickedPattern = [];
var gameInPlay = false;

var level = 0;

$(document).keydown(function (event) {
    if ( event.key !== "F5" && !gameInPlay) {
        startOver();
        // Initialize first sequence
        nextSequence();
        
        gameInPlay = true;
    }
});

// button clicked event listener
$(".btn").click(function() {
    // console.log($(this).attr('id'));
    var userChosenColor = $(this).attr('id');

    userClickedPattern.push(userChosenColor);

    // animate button
    animateButton(userChosenColor, "pressed");

    if (checkAnswer(userClickedPattern.length - 1) && gameInPlay) {
        // check if current sequence is completed,
        // before initiating next sequence.
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();        
            }, 1000);
            userClickedPattern.length = 0;
        }
        // play button sound
        playSound(userChosenColor);
    } else {
        // console.log(false);
        $("h1").text("Game Over, Press Any Key to Restart");
        // animate background
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        // Play wrong Sound
        playSound("wrong");

        // start over
        startOver();
        
        gameInPlay = false;
    }  
});

// Functions
function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // update heading
    level++;
    $("h1").text("Level "+ level);

    // animate and play sound on start
    setTimeout(function(){
        animateButton(randomChosenColor, "flash");
        playSound(randomChosenColor);
    }, 250);
    
    return randomNumber;
}

function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animateButton(name, action) {
    $("." + name).addClass(action);
    setTimeout(function(){
        $("." + name).removeClass(action);
    }, 100)
}
function checkAnswer(i) {
    if (gamePattern[i] !== userClickedPattern[i]) {
        return false;
    }     
    return true;    
}
function startOver(){
    // Empty Arrays for patterns;
    // reset level;
    userClickedPattern.length = 0;
    gamePattern.length = 0;
    level = 0;
}