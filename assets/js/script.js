// console.dir(document);
var buttonCounter = 0;
var currentQuestion = 0;
var timer = 60;
var correctCount = 0;
// var name = window.prompt("Input intials");

//id select the start button
var startSelect = document.querySelector("#start-btn");
var scoreSelect = document.querySelector("#highscore-btn");
var timerEl = document.querySelector("#countdown");
var greetingText = document.querySelector(".page-title");
var questionText = document.querySelector(".quiz-question");
var buttonList = document.querySelector(".button-list");
var submitInitials = document.querySelector("#submit-btn");
var initialsInput = document.querySelector("#initials");
var pText = document.querySelector("#text");

var questionObj = [
    {
        question: "What does HTML stand for?",
        choices: ["Hypertext Max Language", "Handledtext Markup Language", "Honingtext Metric Language", "Hypertext Markup Language"],
        answer: "Hypertext Markup Language"
    },
    {
        question: "What can an array contain in JavaScript?",
        choices: ["Strings", "Numbers", "Booleans", "All of the Above"],
        answer: "All of the Above",
    },
    {
        question: "How do you access an objects property?",
        choices: [".", "(event)", "function()", "{}"],
        answer: ".",
    },
    {
        question: "What are you supposed to enclose your functions in?",
        choices: ["[]", ";", "{}", "()"],
        answer: "{}",
    },
    {
        question: "What is the most effective way to troubleshoot a JavaScript bug?",
        choices: ["debugger", "eventListener", "gitBash", "console.log"],
        answer: "console.log",
    }
];


var nameUpdate = function(event) {
    event.preventDefault
    var name = document.querySelector("input[name='initials']").value;

    localStorage.setItem("Name:", JSON.stringify(name));

    
}

//quiz begins and calls for the questions and buttons to be made
var quizStart = function() {
    document.getElementById("text").style.display = "none";
    document.getElementById("name-input").style.display = "none";
    document.getElementById("submit-btn").style.display = "none";
    document.getElementById("start-btn").style.display = "none";//hide start on click
    document.getElementById("highscore-btn").style.display = "none";//hide highscore on click
    document.querySelector("h1").style.display = "none";
    countDown(); //start countdown
    createQuestion(); //create buttons and start question
}

//puts timer on container and updates every time a wrong answer is selected
var countDown = function() {
    timerEl.textContent = timer;
    var timeInterval = setInterval(function() {
            timer--;
            timerEl.textContent = timer;
            if (timer <= 0) {
                timer = 0;
                clearInterval(timeInterval);
                timerEl.textContent = "0";
                quizEnd();
            }
        }, 1000);
};
    
var createQuestion = function() {
    
    //resets container to no elements
    buttonList.innerHTML = "";
    questionText.innerHTML = "";

    console.log(currentQuestion);
    if (currentQuestion === questionObj.length) {
        timer = 0;
        countDown();
        return;
    }
    else {
        //sets the question displayer to the [i] index of questionObj question
        questionText.innerHTML = `<h2>${questionObj[currentQuestion].question}</h2>`; 
    }

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

var checkAnswer = function(event) {
    
    console.log(event.target.getAttribute("class"));

    if (event.target.getAttribute("class") !== "btn") {
        return;
    }

    var choice = event.target.innerText;
    console.log(questionObj[currentQuestion]);

    if (choice === questionObj[currentQuestion].answer) {
        currentQuestion++;
        correctCount++;
        createQuestion();
    }
    else {
        currentQuestion++;
        timer -= 10;
        createQuestion();
    }
}

var storeLocal = function() {

    localStorage.setItem("Correct Count:", JSON.stringify(correctCount));
    // localStorage.setItem("Name:", JSON.stringify(name));
    return;

}

var quizEnd = function() {
    buttonList.innerHTML = "";
    questionText.innerHTML = "Game Over! Reload page to try again!";
    
    storeLocal();
       
    return;  
}

var displayScore = function(event) {
    // document.querySelector(".page-title").style.display = "none";
    var localName = localStorage.getItem("Name:");
    var localScore = localStorage.getItem("Correct Count:")
    pText.innerHTML = "Initials: " + localName + "  Score: " + localScore;

}
//execute checkAnswer upon click
buttonList.addEventListener("click", checkAnswer);

scoreSelect.addEventListener("click", displayScore);

submitInitials.addEventListener("click", nameUpdate);

//execute quizStart upon click
startSelect.addEventListener("click", quizStart);