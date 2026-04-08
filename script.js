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

gameArea.addEventListener("click", function() {
    if (isGameRunning && isWaitingForUserClick) {
        console.log("Game area clicked");
    }
})

startButton.addEventListener("click", function() {
    console.log("Start clicked");
    isGameRunning = true;
    isWaitingForUserClick = false;
    numberOfTries = 0;
    reactionTimes = [];
    minTime.textContent = "--";
    maxTime.textContent = "--";
    avgTime.textContent = "--";
    scoreArea.style.display = "block";
    stopButton.disabled = false;
    startButton.disabled = true;
})

stopButton.addEventListener("click", function() {
    console.log("Stop clicked");
    isGameRunning = false;
    scoreArea.style.display = "none";
    isWaitingForUserClick = false;
    stopButton.disabled = true;
    startButton.disabled = false;
})