document.addEventListener('DOMContentLoaded', function () {
  var startButton = document.getElementById('start-btn');
  var questionElement = document.getElementById('question');
  var optionsContainer = document.getElementById('options');
  var highScoreElement = document.getElementById('high-score');
  var timerElement = document.getElementById('timer');
  var restartButton = document.getElementById('restart-btn');
  var timer;
  var totalTime = 30 * 60; // 30 minutes in seconds
  var currentQuestionIndex = 0;
  var highScore = 0;
  var quizStarted = false;

  // Hide the question area before quiz begins
  questionElement.style.display = 'none';
  optionsContainer.style.display = 'none';
  restartButton.style.display = 'none'; // Hide restart button initially

  startButton.addEventListener('click', function () {
    if (!quizStarted) {
      startQuiz();
    } else {
      submitAnswer();
    }
  });

  restartButton.addEventListener('click', function () {
    restartQuiz();
  });

  function startQuiz() {
    quizStarted = true;
    loadQuestion();
    startTimer();
    startButton.textContent = 'Submit';
    restartButton.style.display = 'none'; // Hide restart button

    // Show the question area now that the quiz has started
    questionElement.style.display = 'block';
    optionsContainer.style.display = 'block';
  }

  function submitAnswer() {
    var selectedAnswers = getSelectedAnswers();
    var currentQuestion = sampleQuestions[currentQuestionIndex];

    // Check if selected answers are correct
    var isCorrect = compareArrays(selectedAnswers, currentQuestion.options);

    // Provide feedback
    alert(isCorrect ? 'Correct!' : 'Incorrect!');

    if (isCorrect) {
      // Update score or perform other actions
    }

    loadNextQuestion();
  }

  function restartQuiz() {
    currentQuestionIndex = 0;
    totalTime = 30 * 60;
    highScore = 0;
    quizStarted = false;
    startButton.textContent = 'Start Quiz'; // Change button text back to start

    // Hide the question area again
    questionElement.style.display = 'none';
    optionsContainer.style.display = 'none';

    // Show the start button
    startButton.style.display = 'block';

    // Hide the restart button
    restartButton.style.display = 'none';
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

  // Function to update the timer display
  function updateTimerDisplay() {
    var minutes = Math.floor(totalTime / 60);
    var seconds = totalTime % 60;
    timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  // Function to end Quiz
  function endQuiz() {
    clearInterval(timer);

    var initials = prompt('Quiz complete! Enter your initials:');
    var score = calculateScore();

    if (score > highScore) {
      highScore = score;
      highScoreElement.textContent = 'High Score: ' + highScore;
    }

    alert('Quiz ended!\nYour score: ' + score + '\nHigh Score: ' + highScore);

    // Change button text to "Restart Quiz"
    startButton.textContent = 'Restart Quiz';
    restartButton.style.display = 'inline'; // Show restart button
  }

  function calculateScore() {
    var correctAnswers = 0;

    for (var i = 0; i < sampleQuestions.length; i++) {
      var userAnswers = getSelectedAnswers();
      var currentQuestion = sampleQuestions[i];

      if (compareArrays(userAnswers, currentQuestion.options)) {
        correctAnswers++;
      }
    }

    // Calculate the percentage of correct answers and convert it to a score out of 100
    var percentageCorrect = (correctAnswers / sampleQuestions.length) * 100;
    var score = Math.round(percentageCorrect);

    return score;
  }

  function displayQuestion(question) {
    questionElement.textContent = question.text;

    optionsContainer.innerHTML = '';

    question.options.forEach(function (option) {
      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = 'answer';
      checkbox.value = option;

      var label = document.createElement('label');
      label.textContent = option;

      optionsContainer.appendChild(checkbox);
      optionsContainer.appendChild(label);
      optionsContainer.appendChild(document.createElement('br'));
    });
  }

  function loadQuestion() {
    var currentQuestion = sampleQuestions[currentQuestionIndex];
    displayQuestion(currentQuestion);
  }

  function loadNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < sampleQuestions.length) {
      loadQuestion();
      startTimer();
    } else {
      endQuiz();
    }
  }

  function getSelectedAnswers() {
    var selectedAnswers = [];
    var checkboxes = document.querySelectorAll('input[name="answer"]:checked');

    checkboxes.forEach(function (checkbox) {
      selectedAnswers.push(checkbox.value);
    });

    return selectedAnswers;
  }

  function compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;
  }

  // Questions Data
  var sampleQuestions = [
    {
      text: 'What does HTML stand for?',
      options: ['HyperText Markup Language', 'HyperText Modeling Language', 'Highly Typed Multi-Language', 'Hyper Transfer Markup Language'],
      answer: ['HyperText Markup Language'],
    },
    {
      text: 'Which keyword is used to declare a variable in JavaScript?',
      options: ['var', 'let', 'const', 'variable'],
      answer: ['var'],
    },
    {
      text: 'What is the result of 2 + 2?',
      options: ['3', '4', '5', '6'],
      answer: ['4'],
    },
    {
      text: 'How do you comment in JavaScript?',
      options: ['// This is a comment', '/* This is a comment */', '<!-- This is a comment -->', 'comment()'],
      answer: ['// This is a comment'],
    },
    {
      text: 'What is the purpose of the CSS property "display: none;"?',
      options: ['Hide an element', 'Show an element', 'Resize an element', 'Move an element'],
      answer: ['Hide an element'],
    },
    {
      text: 'Which method is used to add an element to the end of an array in JavaScript?',
      options: ['append()', 'push()', 'addToEnd()', 'insertLast()'],
      answer: ['push()'],
    },
    {
      text: 'What does JSON stand for?',
      options: ['JavaScript Object Notation', 'JavaScript Output Network', 'JavaScript Oriented Notation', 'Java Source Object Notation'],
      answer: ['JavaScript Object Notation'],
    },
    {
      text: 'What is the purpose of the "border-box" value in CSS box-sizing?',
      options: ['Expand the element size', 'Include border and padding in the element size', 'Shrink the element size', 'Hide the element'],
      answer: ['Include border and padding in the element size'],
    },
    {
      text: 'How do you declare a function in JavaScript?',
      options: ['function: myFunction()', 'declare function myFunction()', 'function myFunction()', 'var myFunction()'],
      answer: ['function myFunction()'],
    },
    {
      text: 'Which event is triggered when a user clicks on an HTML element?',
      options: ['onmouseover', 'onchange', 'onclick', 'onsubmit'],
      answer: ['onclick'],
    },
    {
      text: 'What is the purpose of the "box-shadow" property in CSS?',
      options: ['Change background color', 'Add a shadow around the box', 'Control element visibility', 'Apply text effects'],
      answer: ['Add a shadow around the box'],
    },
    {
      text: 'In JavaScript, how do you check if a variable is null or undefined?',
      options: ['isNull()', 'undefined', 'isEmpty()', '== null'],
      answer: ['== null'],
    },
    {
      text: 'Which loop is used for iterating over the properties of an object in JavaScript?',
      options: ['for loop', 'while loop', 'do-while loop', 'for...in loop'],
      answer: ['for...in loop'],
    },
    {
      text: 'What is the purpose of the "localStorage" object in web development?',
      options: ['Store data temporarily for a session', 'Store data permanently', 'Retrieve data from a server', 'Display local time'],
      answer: ['Store data permanently'],
    },
    {
      text: 'What does the acronym API stand for?',
      options: ['Application Programming Interface', 'Automated Program Instruction', 'Advanced Programming Integration', 'Application Protocol Interface'],
      answer: ['Application Programming Interface'],
    },
    {
      text: 'How do you prevent the default behavior of an HTML form submission in JavaScript?',
      options: ['event.preventDefault()', 'event.stopPropagation()', 'form.preventSubmit()', 'stopSubmit()'],
      answer: ['event.preventDefault()'],
    },
    {
      text: 'Which method is used to select an HTML element by its id in JavaScript?',
      options: ['getElementByTag', 'getElementByName', 'getElementById', 'selectElementById'],
      answer: ['getElementById'],
    },
    {
      text: 'What is the purpose of the "position: absolute;" property in CSS?',
      options: ['Align the element to the center', 'Fix the element position relative to its nearest positioned ancestor', 'Make the element invisible', 'Float the element to the left'],
      answer: ['Fix the element position relative to its nearest positioned ancestor'],
    },
    {
      text: 'Which built-in function can be used to convert a string to an integer in JavaScript?',
      options: ['parseInt()', 'toInteger()', 'stringToNumber()', 'convertToInteger()'],
      answer: ['parseInt()'],
    },
    //  more questions here
  ];

  function loadQuestion() {
    var currentQuestion = sampleQuestions[currentQuestionIndex];
    displayQuestion(currentQuestion);
  }

  function loadNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < sampleQuestions.length) {
      loadQuestion();
      startTimer();
    } else {
      endQuiz();
    }
  }
});
