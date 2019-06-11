// Define variables
$(document).ready(function(){
    var count = 0;
    var time = 31;
    var isSelected = false;
    var ticker;
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;

var question = ["Which of the following is not a character from Saved By the Bell?",
    "What is Rocko's dog's name in the 90's TV show: Rocko's Modern Life?",
    "Which of the following is NOT, a character from : AHH, Real Monsters?",
    "What is the name of the protagonists 'crush' in: Boy Meets World?",
    "What does TGIF stand for?"];
var answer = ["Scooter", "Spunky", "Stinky", "Topanga", "Thank Goodness It's Friday"];
var firstChoice = ["Zack", "Roscoe", "Ickis", "Clarissa", "Top Golf Is Fun"];
var secondChoice = ["Scooter", "Spunky", "Krum", "Sabrina", "Thank Goodness It's Friday", ];
var thirdChoice = ["Kelly", "Heffer", "Stinky", "Topanga", "This Guy Is Funny"];
var fourthChoice = ["A.C. Slater", "Merlin", "Hairyette", "Hariette", "The Greek Intervention Framework"];

// Show & Hide Functions
    function showboxes() {
        $("#question-box").show();
        $("#choice-box-1").show();
        $("#choice-box-2").show();
        $("#choice-box-3").show();
        $("#choice-box-4").show();
    }
    function hideboxes() {
        $("#question-box").hide();
        $("#choice-box-1").hide();
        $("#choice-box-2").hide();
        $("#choice-box-3").hide();
        $("#choice-box-4").hide();
    }
    function hideResults() {
        $("#correct-box").hide();
        $("#incorrect-box").hide();
        $("#unanswered-box").hide();
        $("#restart-box").hide();
    }
    function displayQuestion () {
        hideResults();
        $("#answer-box").hide();
        $("#image-box").hide();
        $("#time-box").show();
        showboxes();
        $("#question-box").html(question[count]);
        $("#choice-box-1").html(firstChoice[count]);
        $("#choice-box-2").html(secondChoice[count]);
        $("#choice-box-3").html(thirdChoice[count]);
        $("#choice-box-4").html(fourthChoice[count]);
    

    }
    $("#choice-box-1").on("click", checkAnswer) 
    $("#choice-box-2").on("click", checkAnswer)
    $("#choice-box-3").on("click", checkAnswer)
    $("#choice-box-4").on("click", checkAnswer)

// Check Answer Function
    function checkAnswer() {

        hideboxes();

        if($(this).text() === answer[count]) {
            stopTime();
            isSelected = true;
            $("#answer-box").show();
            $("#answer-box").html("Right! The answer is: " + answer[count]);
            displayImage();
            correct++;
            count++;
        }
        else {
            stopTime();
            isSelected = true;
            $("#answer-box").show();
            $("#answer-box").html("Wrong! The answer is: " + answer[count]);
            displayImage();
            incorrect++;
            count++;
        } 

        checkGameEnd();  
    }

// Chekc End Game Function
    function checkGameEnd() {
        if(count === question.length) {
            $("#time-box").hide();
            showResults();
            count = 0;
            $(".start").show();
            $(".start").on("click", function() {
                resetResults();
                startGame();
            });
        }
    }

    function resetTime() {
        time = 31;
    }

    function displayTime() {
        time--;
        $("#time-box").html("Time remaining: " + time);
      
            if(time <= 0) {
                hideboxes();
                stopTime();
                $("#answer-box").show();
                $("#answer-box").html("Time is up! The answer is: " + answer[count]);
                displayImage();
                unanswered++;
                count++;
                checkGameEnd();
            }
    }

    function startTime() {
        clearInterval(ticker);
        ticker = setInterval(displayTime, 1000);
    }
    function stopTime() {
        clearInterval(ticker);
        resetTime();
        if(count < question.length - 1) {
            setTimeout(startTime, 2000);
            setTimeout(displayQuestion, 3000);
        }
    }

    resetTime();

// Display Images With Answer
    function displayImage() {
        if(count === 0) {
            $("#image-box").show();
            $("#image-box").html('<img src="assets/images/screech.jpg">');
        }
        else if(count === 1) {
            $("#image-box").show();
            $("#image-box").html('<img src="assets/images/rocko-spunky.jpg">');
        }
        else if(count === 2) {
            $("#image-box").show();
            $("#image-box").html('<img src="assets/images/krum.png">');
        }
        else if(count === 3) {
            $("#image-box").show();
            $("#image-box").html('<img src="assets/images/topanga.jpg">');
        }
        else if(count === 4) {
            $("#image-box").show();
            $("#image-box").html('<img src="assets/tgif2.png">');

        }
    }

 // Show Results Function   
    function showResults() {
        $("#correct-box").show();
        $("#correct-box").html("Correct: " + correct);
        $("#incorrect-box").show();
        $("#incorrect-box").html("Incorrect: " + incorrect);
        $("#unanswered-box").show();
        $("#unanswered-box").html("Unanswered: " + unanswered);
        $("#restart-box").show();
        $("#restart-box").html("Click Start above to play again!");
    }

// Reset Results Function 
    function resetResults() {
        correct = 0;
        incorrect = 0;
        unanswered = 0;
    }

// Start Game Function
    function startGame() {
        $(".start").hide();
        startTime();
        displayQuestion();
    }

// Start Game On Click
  $(".start").on("click", function() {
    startGame();
  });
});