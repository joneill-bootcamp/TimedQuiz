// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const intro = document.getElementById("intro");

// Localstorage to remember high score
var myStorage = window.localStorage;
var highScore = myStorage.getItem('HighScore');

// If no high score set, then display a 0
if (highScore === null) {
    highScore = "0";
}

// create our questions
let questions = [{
    question: "What is the capital city of Victoria?",
    imgSrc: "img/html.png",
    choiceA: "Hobart",
    choiceB: "Sydney",
    choiceC: "Melbourne",
    correct: "C"
}, {
    question: "Which planet is second from the Sun?",
    imgSrc: "img/css.png",
    choiceA: "Jupiter",
    choiceB: "Venus",
    choiceC: "Mars",
    correct: "B"
}, {
    question: "Who was Austraia's first Prime Minister?",
    imgSrc: "img/js.png",
    choiceA: "Sir Edmund Barton",
    choiceB: "Sir Robert Menzies",
    choiceC: "Jeff Kennet",
    correct: "A"
}];


// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + "HighScore to beat: " + highScore + "</p>" + "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

//start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
    intro.style.display = "none";
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// render progress
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

// counter render

function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        // change progress color to red
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    } else {
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender() {
    //scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score / questions.length);

    if (score > 0) {
        alert("You scored:" + score + " Points! Well done");
    } else alert("Don't feel bad, try again!");

    if (score > highScore) {
        alert("You beat the highscore!!");
        myStorage.setItem('HighScore', score);
    }

    // Reload page
    location.reload();
}

start.addEventListener("click", startQuiz);