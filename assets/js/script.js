// console.dir(document);
var buttonCounter = 0;
var currentQuestion = 0;
var timer = 60;

//id select the start button
var startSelect = document.querySelector("#start-btn");
var highscoreSelect = document.querySelector("#highscore-btn");
var timerEl = document.querySelector("#countdown");
var greetingText = document.querySelector("h1");
var questionText = document.querySelector(".quiz-question");
var buttonList = document.querySelector(".button-list")

var questionObj = [
    {
        question: "What season does it usually snow in?",
        choices: ["Autumn", "Summer", "Spring", "Winter"],
        answer: "Winter"
    },
    // {
    //     question: "What year is it?",
    //     choices: ["1995", "2007", "2011", "2022"],
    //     answer: "2022",
    // }
];

//quiz begins and calls for the questions and buttons to be made
var quizStart = function() {
    document.getElementById("start-btn").style.display = "none";//hide start on click
    document.getElementById("highscore-btn").style.display = "none";//hide highscore on click
    document.querySelector("h1").style.display = "none";
    countDown(); //start countdown
    createQuestion(); //create buttons and start question
}

var countDown = function() {
    var currentTimer = timer;
    
    var timeInterval = setInterval (function() {
        currentTimer--;
        timerEl.textContent = currentTimer;
        if (currentTimer === 0) {
            clearInterval(timeInterval);
        } 
    }, 1000);
}

var createQuestion = function() {
    
    //sets the question displayer to the [i] index of questionObj question
    questionText.innerHTML = `<h2>${questionObj[currentQuestion].question}</h2>`; 

    //creates 4 buttons based off questionObj
    for(var i = 0; i < 4; i++) {
        
        var createButton = document.createElement("button");
        createButton.innerText = questionObj[currentQuestion].choices[i];
        createButton.className = "btn"
        createButton.setAttribute("data-button-id", buttonCounter);
        buttonList.appendChild(createButton);
        buttonCounter++;
    }
    
}

var deleteButtons = function () {
 
}

var checkAnswer = function(event) {
    
    console.log(event.target.getAttribute("class"));

    if (event.target.getAttribute("class") !== "btn") {
        return;
    }

    var choice = event.target.innerText;
    console.log(questionObj[currentQuestion]);

    if (choice === questionObj[currentQuestion].answer) {
        console.log("CORRECT");
        currentQuestion++;
        deleteButtons();
        // createQuestion();
    }
    else {
        console.log("WRONG");       
    }
}

//execute checkAnswer upon click
buttonList.addEventListener("click", checkAnswer);

//execute quizStart upon click
startSelect.addEventListener("click", quizStart);