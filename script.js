window.onload = function() {
  var timerDisplay = document.getElementById('timer');
  var startButton = document.getElementById('startBtn');
  var resetButton = document.getElementById('resetBtn');
  var workTimer;
  var breakTimer;
  var workMinutes = 25;
  var breakMinutes = 5;
  var seconds = 0;
  var cycles = 0;
  var timerStarted = false;

  function updateDisplay() {
    timerDisplay.textContent = formatTime(workMinutes) + ':' + formatTime(seconds);
  }

  function formatTime(time) {
    return time < 10 ? '0' + time : time;
  }

  function startWorkTimer() {
    if (!timerStarted) {
      timerStarted = true;
      workTimer = setInterval(function() {
        if (seconds > 0) {
          seconds--;
        } else if (workMinutes > 0) {
          workMinutes--;
          seconds = 59;
        } else {
          clearInterval(workTimer);
          timerStarted = false;
          alert("One pomodoro completed! Click OK to start the Break Timer.");
          document.body.style.backgroundImage = "url('src/assets/lofi-relax.gif')";
          startBreakTimer();
        }
        updateDisplay();
      }, 1000);
    }
  }

  function startBreakTimer() {
    breakTimer = setInterval(function() {
      if (seconds > 0) {
        seconds--;
      } else if (breakMinutes > 0) {
        breakMinutes--;
        seconds = 59;
      } else {
        clearInterval(breakTimer);
        timerStarted = false;
        cycles++;
        console.log("Cycle:", cycles);
        if (cycles === 4) {
          alert("Four pomodoros completed! Take a longer, more restorative 15-30 minute break.");
          window.location.reload(false);
        }
        else {
          alert("One pomodoro completed! Click OK to start the Work Timer.");
          resetTimers();
          document.body.style.backgroundImage = "none";
          startWorkTimer();
        }
      }
      updateDisplay();
    }, 1000);
  }

  function resetTimers() {
    clearInterval(workTimer);
    clearInterval(breakTimer);
    workMinutes = 25;
    breakMinutes = 5;
    seconds = 0;
    timerStarted = false;
    updateDisplay();
  }

  startButton.addEventListener('click', startWorkTimer);
  resetButton.addEventListener('click', resetTimers);
};
