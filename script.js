let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapList = document.getElementById("lapList");

function formatTime(time) {
    let milliseconds = Math.floor((time % 1000) / 10);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);

    return (
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + ":" +
        String(milliseconds).padStart(2, "0")
    );
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

startPauseBtn.addEventListener("click", () => {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);

        running = true;
        startPauseBtn.textContent = "Pause";
        startPauseBtn.classList.add("pause");
        lapBtn.disabled = false;
    } else {
        clearInterval(timerInterval);
        running = false;
        startPauseBtn.textContent = "Start";
        startPauseBtn.classList.remove("pause");
    }
});

resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    elapsedTime = 0;
    running = false;
    lapCount = 0;
    updateDisplay();
    lapList.innerHTML = "";
    startPauseBtn.textContent = "Start";
    startPauseBtn.classList.remove("pause");
    lapBtn.disabled = true;
});

lapBtn.addEventListener("click", () => {
    lapCount++;
    const li = document.createElement("li");
    li.textContent = `Lap ${lapCount}: ${formatTime(elapsedTime)}`;
    lapList.appendChild(li);
});
