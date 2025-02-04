

$(document).ready(function () {
    var  buttonColours = ["red", "blue", "green", "yellow"];
    var gamePattern = [];
    var userClickedPattern = []
    let play = false
    let level = 0;

    function gameLoop() {
        if (!play) return;
    
        $("h1").text("level " + level)
        let index = nextSequence();
        var randomChosenColor = buttonColours[index];
        playSound(randomChosenColor);
        flash(randomChosenColor);
        gamePattern.push(randomChosenColor);
    
        level ++;
    
        setTimeout(gameLoop, 1000);
    
    }

    $(document).keydown(function(event) {
        
        if (event.key != 'Escape') {
            play = true;

            gameLoop();  // start the game

            $(document).keydown(function (event) {
                if (event.key == 'Escape') {
                    play = false;
                    level = 0;
                    userClickedPattern = []
                    gamePattern = []
                    $("h1").text("Game Over! Press Any Key to Restart")
                }
            });


            $(".btn").click(function() {
                let userChosenColor =  $(this).attr("id");
                userClickedPattern.push(userChosenColor);
                console.log(userClickedPattern);
                playSound(userChosenColor);
                animatePress(userChosenColor);
               
            });
            
            
        }

    });
    
});


function nextSequence() {
    let randomNumber = Math.round(Math.random()*3);
    return randomNumber;
}

function flash(buttonID) {
    $('#'+buttonID).fadeTo(100, 0.3, function () {
        $('#'+buttonID).fadeTo(500, 1.0);
    });
}

function playSound(name) {
    var sound  = new Audio("./sounds/"+name+".mp3");
    sound.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


