document.addEventListener("DOMContentLoaded", function () {
    if (!document.getElementById("quiz-box")) return;

    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");
    const categoryNum = Number(category);
    const difficulty = "easy";
    const numQuestions = 10;

    const categoryNames = {
        9: "General Knowledge",
        10: "Books",
        11: "Film",
        12: "Music",
        14: "Television",
        15: "Video Games",
        16: "Board Games",
        17: "Science & Nature",
        18: "Computers",
        20: "Mythology",
        21: "Sports",
        22: "Geography",
        23: "History",
        25: "Art",
        26: "Celebrities",
        27: "Animals",
        28: "Vehicles",
        29: "Comics",
        30: "Gadgets",
        31: "Anime & Manga",
        32: "Cartoons & Animation"
    };
    

    if (!categoryNum || !categoryNames[categoryNum]) {
        alert("Invalid category selected.");
        return;
    }

    const categoryElement = document.getElementById("quiz-category");
    if (categoryElement) {
        categoryElement.innerText = categoryNames[categoryNum] || "General Quiz";
    }

    const quizBox = document.getElementById("quiz-box");
    if (!quizBox) {
        console.error("Error: quiz-box not found!");
        return;
    }

    const quizApiUrl = `https://opentdb.com/api.php?amount=${numQuestions}&category=${categoryNum}&difficulty=${difficulty}&type=multiple`;
    let currentQuestionIndex = 0;
    let score = 0;
    let quizData = [];
    let timeLeft = 15;
    let timer;

    fetchQuiz();

    async function fetchQuiz() {
        try {
            const response = await fetch(quizApiUrl);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            if (data.results.length === 0) throw new Error("No quiz data found. Please try again later.");

            quizData = data.results;
            loadQuestion();
        } catch (error) {
            console.error("Error fetching quiz data:", error);
            quizBox.innerHTML = `<p style="color:red;">Error loading quiz: ${error.message}</p>`;
        }
    }

    function loadQuestion() {
        if (currentQuestionIndex >= quizData.length) {
            clearInterval(timer);
            document.getElementById("quiz-box").innerHTML = `<h3>Quiz Completed</h3> 
            <p>Your Final Score: ${score} / ${quizData.length}</p>`;
            document.getElementById("next-btn").style.display = "none";  
            document.getElementById("restart-btn").classList.remove("hide");
            return;
        }

        let questionObj = quizData[currentQuestionIndex];
        document.getElementById("question").innerHTML = decodeEntities(questionObj.question);

        let options = [...questionObj.incorrect_answers, questionObj.correct_answer];
        options = options.sort(() => Math.random() - 0.5); 

        let optionContainer = document.getElementById("options");
        optionContainer.innerHTML = "";

        options.forEach((option) => {
            let button = document.createElement("button");
            button.innerHTML = decodeEntities(option);
            button.classList.add("btn", "btn-outline-primary", "w-100", "my-1", "option");
            button.onclick = () => checkAnswer(option, questionObj.correct_answer, button);
            optionContainer.appendChild(button);
        });

        document.getElementById("next-btn").classList.add("hide");
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

    function checkAnswer(selected, correct, button) {
        clearInterval(timer);

        let options = document.querySelectorAll(".option");
        options.forEach((btn) => {
            btn.disabled = true;
            if (btn.innerHTML === correct) btn.classList.add("correct");
            if (btn.innerHTML === selected && selected !== correct) btn.classList.add("incorrect");
        });

        if (selected === correct) {
            score++;
            document.getElementById("score").innerText = score;
        }

        document.getElementById("next-btn").classList.remove("hide");
    }

    function nextQuestion() {
        currentQuestionIndex++;
        loadQuestion();
    }

    function restartQuiz() {
        location.reload();
    }

    function decodeEntities(str) {
        let textArea = document.createElement("textarea");
        textArea.innerHTML = str;
        return textArea.value;
    }

    document.getElementById("next-btn")?.addEventListener("click", nextQuestion);
    document.getElementById("restart-btn")?.addEventListener("click", restartQuiz);

    document.getElementById("restart-btn").classList.remove("hide");
});
