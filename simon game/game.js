

$(document).ready(function () {
    var  buttonColours = ["red", "blue", "green", "yellow"];
    var gamePattern = [];
    var userClickedPattern = [];
    let started = false;
    level = 0;


    $(document).keydown(function(event) {
       
        $("h1").text("level " + level);

        if (!started) {
            started =true;
            nextSequence();
        }

    });


    $(".btn").click(function() {
        let userChosenColor =  $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        
        playSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length-1);
        
        
    });

    function nextSequence() {
        
        userClickedPattern = [];
        level ++;
        $("h1").text("level " + level)

        let randomNumber = Math.round(Math.random()*3);
        var randomChosenColor = buttonColours[randomNumber];
        gamePattern.push(randomChosenColor);
        playSound(randomChosenColor);
        flash(randomChosenColor);
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


    function checkAnswer(currentLevel) {
        if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
            console.log("success");

            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(function() {
                    nextSequence();
                }, 1000);
            }

        }

        
        else {
            console.log("fail");
        }

        
    }
        
});


