// https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model

document.addEventListener('DOMContentLoaded', () => {
  const game = {

      // Initialised game properties
      colors: ['color1', 'color2', 'color3', 'color4'],
      currentSequence: [],
      playerSequence: [],
      score: 0,
      highScore: 0,
      isGameActive: false,
      indicator: document.getElementById('indicator'),
      startButton: document.getElementById('start'),
      countDisplay: document.getElementById('count'),
      highScoreDisplay: document.getElementById('highScore'),
      colorElements: document.querySelectorAll('.color-part'),
      userInputTimeout: null,

      // Initialize the game
      init() {
          this.bindEvents();
      },

      // Bind events to color elements and start button
      bindEvents() {
          this.startButton.addEventListener('click', () => this.startGame());
          this.colorElements.forEach((element, index) => {
              element.addEventListener('click', () => this.handleColorClick(index));
          });
      },

      // https://www.w3schools.com/jsref/met_win_settimeout.asp
      // https://javascript.info/settimeout-setinterval

      // Start the game
      startGame() {
          this.isGameActive = true;
          this.currentSequence = [];
          this.playerSequence = [];
          this.score = 0;
          this.updateScoreDisplay();
          setTimeout(() => {
              this.nextRound();
          }, 3200);
      },

      // Go to next round
      nextRound() {
          this.addRandomColorToSequence();
          this.playSequence();
      },

      // Add a random color to the sequence
      addRandomColorToSequence() {
          const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
          this.currentSequence.push(randomColor);
      },
      // Play the current color sequence
      playSequence() {
          const speedAdjustment = this.getSpeedAdjustment();
          this.currentSequence.forEach((color, index) => {
              setTimeout(() => this.flashColor(color), (index + 1) * speedAdjustment.flashDelay);
          });

          // Adjust timing for user input based on sequence length and add extra time
          clearTimeout(this.userInputTimeout); // Clear any existing timeout
          this.userInputTimeout = setTimeout(() => {
              this.endGame();
          }, this.currentSequence.length * speedAdjustment.flashDelay + speedAdjustment.extraTime);
      },

      // Get speed adjustment based on current round
      getSpeedAdjustment() {
          let flashDelay = 600; // Default delay between flashes
          let extraTime = 5000; // Default extra time for user response

          // Speed up after 5th, 9th, and 13th rounds
          if (this.currentSequence.length > 13) {
              flashDelay = 400; // Faster flash delay
              extraTime = 3000; // Less extra time
          } else if (this.currentSequence.length > 9) {
              flashDelay = 450;
              extraTime = 3500;
          } else if (this.currentSequence.length > 5) {
              flashDelay = 500;
              extraTime = 4000;
          }

          return { flashDelay, extraTime };
      },


      // Flash a color element
      flashColor(color) {
          const element = document.querySelector(`.${color}`);
          element.classList.add('active');
          console.log(`Flashing ${color}`);
          setTimeout(() => element.classList.remove('active'), 300);
      },

      // Handle color element click
      handleColorClick(index) {
          if (!this.isGameActive) return;

          const colorName = this.colors[index];
          this.playerSequence.push(colorName);
          this.flashColor(colorName);
          this.checkPlayerSequence();
      },

      // Check the player's sequence against the game's sequence
      checkPlayerSequence() {
          const lastClicked = this.playerSequence[this.playerSequence.length - 1];
          const expected = this.currentSequence[this.playerSequence.length - 1];

          if (lastClicked != expected) {
              this.endGame();
              return;
          }

          if (this.playerSequence.length == this.currentSequence.length) {
              this.score++;
              this.updateScoreDisplay();
              this.playerSequence = [];
              setTimeout(() => this.nextRound(), 1000);
          } else if (this.playerSequence.length > this.currentSequence.length) {
              this.endGame();
          }
      },

      // Update the score display
      updateScoreDisplay() {
          // Update the current score display
          this.countDisplay.textContent = this.score.toString().padStart(2, '0');

          // Check if the current score is higher than the high score
          if (this.score > this.highScore) {
              // update the high score to the current score
              this.highScore = this.score;

              // update the high score display
              this.highScoreDisplay.textContent = this.highScore.toString().padStart(2, '0');
          }
      },

      // End the game
      endGame() {
          this.isGameActive = false;
          this.indicator.style.backgroundColor = 'red';
          clearTimeout(this.userInputTimeout); // Clear the timeout when the game ends

          let flashTimes = 5;
          let currentFlash = 0;

          const flashAllColors = () => {
              // Add 'active' class to all colors
              this.colors.forEach(color => {
                  const element = document.querySelector(`.${color}`);
                  if (element) {
                      element.classList.add('active');
                  }
              });

              // Remove 'active' class after a short delay
              setTimeout(() => {
                  this.colors.forEach(color => {
                      const element = document.querySelector(`.${color}`);
                      if (element) {
                          element.classList.remove('active');
                      }
                  });

                  // Repeat
                  currentFlash++;
                  if (currentFlash < flashTimes) {
                      setTimeout(flashAllColors, 300); // Adjust delay as needed
                  } else {
                      // Reset the game score to zero
                      this.score = 0;
                      // Update the score display 
                      this.countDisplay.textContent = this.score.toString().padStart(2, '0');
                  }
              }, 300); // Adjust delay as needed to control the duration of the flash
          };

          // Start flashing
          flashAllColors();
      }
  };
  game.init();
});

// Start Button countdown starts when clicked and counts down 
const startButton = document.querySelector("#start");

// https://www.w3schools.com/js/js_htmldom_eventlistener.asp

startButton.addEventListener("click", () => {
  let indicator = document.getElementById('indicator');
  indicator.style.backgroundColor = 'green';

  let countdown = 3;
  let countdownElement = document.getElementById('timer');
  countdownElement.textContent = countdown;

  let countdownTimer = setInterval(() => {
      countdown--;
      countdownElement.textContent = countdown;
      if (countdown <= 0) {
          document.getElementById('timer').innerHTML = 'GO!';
          clearInterval(countdownTimer);
          setTimeout(() => {
              document.getElementById('timer').innerHTML = '';
          }, 1000);
      }
  }, 1000);

  setTimeout(() => {

  }, 3000);
});

// Function to play the sequence
function playSequence() {

  // Disable color interaction while sequence is playing
  enableColors();
  // Play each step in the sequence
  disableColors();

  game.currentSequence.forEach((color, index) => {
      setTimeout(() => {
          flashColor(color);
      }, (index + 1) * 600);
  });

  // Re-enable color interaction after the last color has flashed
  setTimeout(enableColors, game.currentSequence.length * 600);
}

// Function to enable color interaction
function enableColors() {
  game.colorElements.forEach(element => {
      element.addEventListener('click', handleColorClick);
  });
  flashColor();
}

// Function to disable color interaction
function disableColors() {
  game.colorElements.forEach(element => {
      element.removeEventListener('click', handleColorClick);
  });
}

// Handle color element click
function handleColorClick(event) {
  const colorClicked = event.target.className.split(' ')[0]; // Assuming first class is the color
  game.playerSequence.push(colorClicked);

  flashColor(colorClicked);

  // Clear the previous timeout function if the player clicks a color within 5 seconds
  clearTimeout(game.timeOutId);

  // Set a new timeout function to end the game if the player does not click a color within 5 seconds
  game.timeOutId = setTimeout(() => {
      game.endGame();
  }, 5000);
}

// Define the game object
let game = {
  isGameActive: false,
  indicator: document.getElementById('indicator'),
  score: 0,

  // End the game
  endGame: function () {
      this.isGameActive = false;
      this.indicator.style.backgroundColor = 'red';
  }
}
