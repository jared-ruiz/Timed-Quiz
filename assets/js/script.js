// console.dir(document);

//id select the start button
var startSelect = document.querySelector("#start-btn");
var timerEl = document.querySelector("#countdown");
var questionText = document.querySelector(".quiz-question");
var buttonOne = document.querySelector("#one");
var buttonTwo = document.querySelector("#two");
var buttonThree = document.querySelector("#three");
var buttonFour = document.querySelector("#four"); 

var quizStart = function() {
    document.getElementById("start-btn").style.display = "none";
    countDown();
    displayQuestion();
}

var countDown = function() {
    var timer = 60;
    
    var timeInterval = setInterval (function() {
        timer--;
        timerEl.textContent = timer;
        if (timer === 0) {
            clearInterval(timeInterval);
        } 
    }, 1000);
}

var displayQuestion = function() {

    var questions = ["What season does it usually snow in?"];
    var choices = ["Autumn", "Summer", "Spring", "Winter"];
    
    for (var i = 0; i < questions.length; i++) {
        questionText.textContent = questions[i];
        buttonOne.innerText = choices[i];
        buttonTwo.innerText = choices[1];
        buttonThree.textContent = choices[2];
        buttonFour.textContent = choices[3];
    }
}


//execute quizStart upon click
startSelect.addEventListener("click", quizStart);