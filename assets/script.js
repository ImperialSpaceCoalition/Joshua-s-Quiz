// script.js

document.addEventListener('DOMContentLoaded', function () {
    var startButton = document.getElementById('start-btn');
    var questionElement = document.getElementById('question');
    var optionsContainer = document.getElementById('options');
    var highScoreElement = document.getElementById('high-score');
    var highScore = 0;
  
    startButton.addEventListener('click', startQuiz);
  
    function startQuiz() {
      // Placeholder function for starting the quiz

      console.log('Quiz started!');
      
      // add logic to load questions and handle user responses here


      // simulate the end of the quiz
      endQuiz();
    }
  
    function endQuiz() {
      var initials = prompt('Enter your initials:');
      var score = calculateScore(); // need to implement this function
  
      // Update high score if the current score is higher
      if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = highScore;
      }
  
      alert(`Quiz ended!\nYour score: ${score}\nHigh Score: ${highScore}`);
    }
  
    function calculateScore() {
      // Placeholder function for calculating the score
      // implement logic based on the user's performance



      // return a random score between 0 and 100
      return Math.floor(Math.random() * 101);
    }
  });
  
  