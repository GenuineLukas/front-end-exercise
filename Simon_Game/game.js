const userClickedPattern = [];
const gamePattern = [];
const buttonColors = ['red', 'blue', 'green', 'yellow'];

let isStarted = false;
let level = 0;

$(document).keypress(() => {
    if(!isStarted){
        $("#level-title").text("Level " + level);
        nextSequence();
        isStarted=true;
    }
})

function nextSequence(){
    //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;
    //5. Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level);
    const randomNumber = Math.floor(Math.random() * 4)
    const randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)
    console.log('game pattern ', gamePattern);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(200).fadeIn(100);
    playSound(randomChosenColor);
}

$( ".button" ).on( "click", function(event) {
    const userChosenColor = event.target.id;
    const targetDOM = $("#" + userChosenColor)
    userClickedPattern.push(userChosenColor);
    console.log('user pattern ' + userClickedPattern);

    $("#" + userChosenColor).fadeIn(100).fadeOut(150).fadeIn(100);
    playSound(userChosenColor);

    targetDOM.addClass("pressed");
    setTimeout(() => {
        targetDOM.removeClass("pressed");
    }, 200)

    checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
    const sound = new Audio("./sounds/" + name + ".mp3")
    sound.play()
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                userClickedPattern.splice(0, userClickedPattern.length)
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        const wrongSound = new Audio("./sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(()=> {
            $("body").removeClass("game-over")
        }, 200)
        $('h1').text("Game Over, Press Any Key to Restart")
        startOver();
    }
}

function startOver(){
    gamePattern.splice(0, gamePattern.length);
    userClickedPattern.splice(0, userClickedPattern.length)
    console.log("gamepattern, " + gamePattern)
    level = 0;
    isStarted = false;
}
