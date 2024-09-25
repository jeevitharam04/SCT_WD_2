let startTime, updatedTime, difference, timerInterval;
let isRunning = false;
let laps = [];

const timeDisplay = document.getElementById('time-display');
const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapList = document.getElementById('lap-list');

// Function to update the stopwatch display
function updateDisplay(time) {
    const milliseconds = Math.floor((time % 1000) / 1);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    const displayMilliseconds = milliseconds.toString().padStart(3, '0');
    const displaySeconds = seconds.toString().padStart(2, '0');
    const displayMinutes = minutes.toString().padStart(2, '0');
    const displayHours = hours.toString().padStart(2, '0');

    timeDisplay.textContent = `${displayHours}:${displayMinutes}:${displaySeconds}.${displayMilliseconds}`;
}

// Start or pause the stopwatch
startPauseBtn.addEventListener('click', function() {
    if (!isRunning) {
        startTime = Date.now() - (difference || 0);
        timerInterval = setInterval(function() {
            updatedTime = Date.now() - startTime;
            updateDisplay(updatedTime);
        }, 10);
        startPauseBtn.textContent = 'Pause';
        lapBtn.disabled = false;
        resetBtn.disabled = false;
        isRunning = true;
    } else {
        clearInterval(timerInterval);
        difference = updatedTime;
        startPauseBtn.textContent = 'Start';
        isRunning = false;
    }
});

// Reset the stopwatch
resetBtn.addEventListener('click', function() {
    clearInterval(timerInterval);
    startTime = 0;
    updatedTime = 0;
    difference = 0;
    updateDisplay(0);
    startPauseBtn.textContent = 'Start';
    lapList.innerHTML = '';
    laps = [];
    lapBtn.disabled = true;
    resetBtn.disabled = true;
    isRunning = false;
});

// Track laps
lapBtn.addEventListener('click', function() {
    laps.push(updatedTime);
    const lapTime = document.createElement('li');
    lapTime.textContent = `Lap ${laps.length}: ${timeDisplay.textContent}`;
    lapList.appendChild(lapTime);
});
