const maximumNumberOfTries = 5;
let isGameRunning = false;
let isWaitingForUserClick = false;
let completedTries = 0;
let reactionTimes = [];
let colorChangedAt;
let timeoutId;

const gameArea = document.getElementById("game-area");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const scoreArea = document.getElementById("score-area");
const minTime = document.getElementById("min-time");
const maxTime = document.getElementById("max-time");
const avgTime = document.getElementById("avg-time");
const initialGameAreaText = document.getElementById("game-area").textContent;

function getRandomDelay() {
    return Math.floor(Math.random() * 3000) + 1000;
}

function startNextTry() {
    if (!isGameRunning) {
        return;
    }
    resetGameArea();
    const randomDelay = getRandomDelay();
    timeoutId = setTimeout(function () {
        if (!isGameRunning) {
            return;
        }
        gameArea.style.backgroundColor = "lightgreen";
        colorChangedAt = Date.now();
        isWaitingForUserClick = true;
        console.log("Color changed, waiting for user click");
    }, randomDelay)
}

function resetGameState() {
    isWaitingForUserClick = false;
    completedTries = 0;
    reactionTimes = [];
    colorChangedAt = null;
    gameArea.textContent = initialGameAreaText
}

function resetGameArea() {
    gameArea.style.backgroundColor = "#f7f7f7";
}

function resetStats() {
    minTime.textContent = "--";
    maxTime.textContent = "--";
    avgTime.textContent = "--";
    scoreArea.style.display = "none";
    console.log("Stats reset");
}

function setButtonsOnStart() {
    startButton.disabled = true;
    stopButton.disabled = false;
}

function setButtonsOnStop() {
    startButton.disabled = false;
    stopButton.disabled = true;
}

function startGame() {
    console.log("Game started!");
    resetGameState();
    resetStats();
    setButtonsOnStart()
    isGameRunning = true;
    startNextTry();
}

function stopGame() {
    console.log("Game stopped");
    isGameRunning = false;
    isWaitingForUserClick = false;
    colorChangedAt = null;
    setButtonsOnStop();
    clearTimeout(timeoutId);
    resetGameArea();
}

function endGame() {
    isGameRunning = false;
    isWaitingForUserClick = false;
    setButtonsOnStop();
    clearTimeout(timeoutId);
    resetGameArea();
    gameArea.innerHTML = `Well done!<br>Your best result is: ${Math.min(...reactionTimes)} ms`;
    console.log("Game ended after maximum number of tries reached");
}

function updateStats() {
    const min = Math.min(...reactionTimes);
    const max = Math.max(...reactionTimes);
    const sum = reactionTimes.reduce((total, currentValue) => total + currentValue, 0);
    const avg = Math.round(sum / reactionTimes.length);
    minTime.textContent = min;
    maxTime.textContent = max;
    avgTime.textContent = avg;
    console.log("Stats updated");
}

gameArea.addEventListener("click", function () {
    if (isGameRunning && isWaitingForUserClick) {
        console.log("Game area clicked");
        let reactionTime = Date.now() - colorChangedAt;
        reactionTimes.push(reactionTime);
        completedTries++;
        isWaitingForUserClick = false;
        scoreArea.style.display = "block";
        updateStats();
        if (completedTries < maximumNumberOfTries) {
            startNextTry();
        } else {
            endGame();
        }
    }
})

startButton.addEventListener("click", function () {
    startGame();
})

stopButton.addEventListener("click", function () {
    stopGame();
})
