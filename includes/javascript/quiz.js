const quizData = [
    {
        question: "What does ADSR stand for?",
        options: ["Attack, Demand, Secure, and Reclaim", "Attack, Decay, Sustain, and Release", "Allow, Delay, Sustain, and Remove"],
        answer: 1
    },
    {
        question: "What does HTML stand for?",
        options: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Multi Language"],
        answer: 0
    },
    {
        question: "What does CSS control in a webpage?",
        options: ["Content", "Server Security", "Layout & Design"],
        answer: 2
    },
    {
        question: "What programming language is known as the backbone of web development?",
        options: ["JavaScript", "Python", "C++"],
        answer: 0
    },
    {
        question: "What is the main purpose of an API (Application Programming Interface)?",
        options: ["To improve a website’s design", "To allow different software systems to communicate with each other", "To store data in a database"],
        answer: 1
    },
    {
        question: "What does SMART stand for in goal setting?",
        options: ["Structured, Manageable, Adaptable, Reasonable, Targeted", "Systematic, Motivational, Accurate, Risk-free, Timely", "Specific, Measurable, Achievable, Relevant, Time-bound"],
        answer: 2
    },
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;

function startQuiz() {
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        document.getElementById("quiz-box").innerHTML = `<h3>Quiz Completed</h3> 
        <p>Your Final Score: ${score} / ${quizData.length}</p>`;

        // Ensure the "Next Question" (Submit) button is completely hidden
        document.getElementById("next-btn").style.display = "none";  

        // Show only the "Restart Quiz" button
        document.getElementById("restart-btn").classList.remove("hide");

        localStorage.setItem("quizScore", score);
        document.getElementById("score").parentElement.style.display = "none";
        return;
    }

    let questionObj = quizData[currentQuestionIndex];
    document.getElementById("question").innerText = questionObj.question;
    
    let optionContainer = document.getElementById("options");
    optionContainer.innerHTML = "";

    questionObj.options.forEach((option, index) => {
        let button = document.createElement("button");
        button.innerText = option;
        button.classList.add("btn", "btn-outline-primary", "w-100", "my-1", "option");
        button.onclick = () => checkAnswer(index, button);
        optionContainer.appendChild(button);
    });

    document.getElementById("feedback").innerText = "";

    // Ensure "Next Question" button only shows if the quiz is NOT done
    if (currentQuestionIndex === quizData.length - 1) {
        document.getElementById("next-btn").innerText = "Submit";
    } else {
        document.getElementById("next-btn").innerText = "Next Question";
    }

    document.getElementById("next-btn").classList.add("hide");
    document.getElementById("next-btn").style.display = "block";  // Ensure it's visible when needed
    resetTimer();
}



function resetTimer() {
    clearInterval(timer);
    timeLeft = 15;
    document.getElementById("time").innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft -= 1;
        document.getElementById("time").innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function checkAnswer(selectedIndex, button) {
    clearInterval(timer);

    let correctIndex = quizData[currentQuestionIndex].answer;
    let options = document.querySelectorAll(".option");

    options.forEach((btn, index) => {
        if (index === correctIndex) {
            btn.classList.add("correct");
        } else if (index === selectedIndex) {
            btn.classList.add("incorrect");
        }
        btn.disabled = true;
    });

    if (selectedIndex === correctIndex) {
        score++;
        document.getElementById("score").innerText = score;
        document.getElementById("feedback").innerText = "Correct!";
        document.getElementById("feedback").style.color = "green";
    } else {
        document.getElementById("feedback").innerText = "Wrong!";
        document.getElementById("feedback").style.color = "red";
    }

    document.getElementById("next-btn").classList.remove("hide");
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 15;

    document.getElementById("quiz-box").innerHTML = `
        <p id="timer" class="text-danger"><b>Time Left: </b><span id="time">15</span> sec</p>
        <p id="question" class="fw-bold"></p>
        <div id="options" class="btn-group-vertical w-100"></div>
        <p id="feedback" class="mt-2 fw-bold"></p>
    `;

    document.getElementById("score").innerText = score;
    document.getElementById("next-btn").classList.add("hide");
    document.getElementById("restart-btn").classList.add("hide");

    startQuiz();
}

document.getElementById("next-btn").addEventListener("click", nextQuestion);
document.getElementById("restart-btn").addEventListener("click", restartQuiz);

startQuiz();


