document.addEventListener('DOMContentLoaded', function () {
    var startButton = document.getElementById('start-btn');
    var questionElement = document.getElementById('question');
    var optionsContainer = document.getElementById('options');
    var highScoreElement = document.getElementById('high-score');
    var timerElement = document.getElementById('timer');
    var timer;
    var totalTime = 30 * 60; // 30 minutes in seconds
    var currentQuestionIndex = 0;
    var highScore = 0;

    startButton.addEventListener('click', startQuiz);

    function startQuiz() {
        questionElement.textContent = '';
        loadQuestion();
        startTimer();
    }

    function startTimer() {
        timer = setInterval(function () {
            totalTime--;

            if (totalTime <= 0) {
                clearInterval(timer);
                endQuiz();
            }

            updateTimerDisplay();
        }, 1000);

        updateTimerDisplay();
    }

    function updateTimerDisplay() {
        var minutes = Math.floor(totalTime / 60);
        var seconds = totalTime % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function endQuiz() {
        clearInterval(timer);

        var initials = prompt('Quiz complete! Enter your initials:');
        var score = calculateScore();

        if (score > highScore) {
            highScore = score;
            highScoreElement.textContent = 'High Score: ' + highScore;
        }

        alert('Quiz ended!\nYour score: ' + score + '\nHigh Score: ' + highScore);
    }

    function calculateScore() {
        // Placeholder function for calculating the score
        // Implement the logic based on the user's performance
        // Return a random score between 0 and 100
        return Math.floor(Math.random() * 101);
    }

    function displayQuestion(question) {
        questionElement.textContent = question.text;

        optionsContainer.innerHTML = '';

        question.options.forEach(function (option) {
            var button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', function () {
                clearInterval(timer);
                loadNextQuestion();
            });
            optionsContainer.appendChild(button);
        });
    }

    // Placeholder question data
    var sampleQuestions = [
        {
            text: 'What is the capital of France?',
            options: ['Berlin', 'Paris', 'Madrid', 'Rome'],
            answer: 'Paris',
        },
        // Add more questions as needed
    ];

    function loadQuestion() {
        var currentQuestion = sampleQuestions[currentQuestionIndex];
        displayQuestion(currentQuestion);
    }

    function loadNextQuestion() {
        currentQuestionIndex++;

        if (currentQuestionIndex < sampleQuestions.length) {
            loadQuestion();
            startTimer(); // Start the timer for the next question
        } else {
            endQuiz();
        }
    }
});
