let isGameRunning = false;
let isWaitingForUserClick = false;
let numberOfTries = 0;
let maximumNumberOfTries = 5;
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

function getRandomDelay() {
    return Math.floor(Math.random() * 3000) + 1000;
}

function startNextTry() {
    if (!isGameRunning) {
        return;
    }
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
    numberOfTries = 0;
    reactionTimes = [];
    colorChangedAt = null;
}

function resetGameArea() {
    gameArea.style.backgroundColor = "lightgray";
}

function resetStats() {
    minTime.textContent = "--";
    maxTime.textContent = "--";
    avgTime.textContent = "--";
    scoreArea.style.display = "none";
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
    resetGameArea();
    isGameRunning = true;
    startNextTry();
}

function endGame() {
    isGameRunning = false;
    isWaitingForUserClick = false;
    setButtonsOnStop();
    console.log("Game stopped after maximum numbers of tries reached");
}

gameArea.addEventListener("click", function () {
    if (isGameRunning && isWaitingForUserClick) {
        console.log("Game area clicked");
        let reactionTime = Date.now() - colorChangedAt;
        reactionTimes.push(reactionTime);
        numberOfTries++;
        isWaitingForUserClick = false;
        scoreArea.style.display = "block";
        resetGameArea();
        if (numberOfTries < 5) {
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
    console.log("Stop clicked");
    isGameRunning = false;
    isWaitingForUserClick = false;
    colorChangedAt = null;
    setButtonsOnStop();
    clearTimeout(timeoutId);
    resetGameArea();
})
