// Define variables
$(document).ready(function(){
    var count = 0;
    var time = 31;
    var isSelected = false;
    var ticker;
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;

var question = ["Which opposing player had the top individual scoring game against the Utah Jazz?",
    "Which Jazz player’s father played on the 1984 NCAA Championship team with Michael Jordan at North Carolina??",
    "Which Jazz Player has played the most minutes over his career",
    "Which Jazz Player is the all-time True Shooting percentage leader?",
    "How Many Head Coaches have the Utah Jazz had?"];
var answer = ["Kobe Bryant", "Dante Exum", "Karl Malone", "Rudy Gobert", "8"];
var firstChoice = ["Michael Jordan", "Dante Exum", "John Stockton", "Donovan Mitchell", "8"];
var secondChoice = ["Kobe Bryant", "Rudy Gobert", "Jeff Hornaceck", "Karl Malone", "10", ];
var thirdChoice = ["Lebron James", "Jae Crowder", "Andre Kirelinko", "Kyle Korver", "13"];
var fourthChoice = ["ShaQ", "Ricky Rubio", "Karl Malone", "Rudy Gobert", "7"];

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
            $("#image-box").html('<img src="assets/tgif2.jpg">');

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