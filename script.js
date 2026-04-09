let maximumNumberOfTries = 5;
let isGameRunning = false;
let isWaitingForUserClick = false;
let completedTries = 0;
let reactionTimes = [];
let colorChangedAt;
let timeoutId;

const gameArea = document.getElementById("game-area");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const settingsButton = document.getElementById("settings-button");

let triesCountText = document.getElementById("tries-count-text");
const scoreArea = document.getElementById("score-area");
const minTime = document.getElementById("min-time");
const maxTime = document.getElementById("max-time");
const avgTime = document.getElementById("avg-time");
const initialGameAreaText = document.getElementById("game-area").textContent;

const settingsModal = document.getElementById("settings-modal");
const closeSettingsButton = document.getElementById("close-settings-button");
const triesInput = document.getElementById("tries-input");
const saveSettingsButton = document.getElementById("save-settings-button");

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
    }, randomDelay);
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
    settingsButton.disabled = true;
}

function setButtonsOnStop() {
    startButton.disabled = false;
    stopButton.disabled = true;
    settingsButton.disabled = false;
}

function startGame() {
    console.log("Game started!");
    resetGameState();
    resetStats();
    setButtonsOnStart();
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

function openSettingsModal() {
    if (isGameRunning) {
        return;
    }

    triesInput.value = maximumNumberOfTries;
    settingsModal.classList.remove("modal-hidden");
}

function closeSettingsModal() {
    settingsModal.classList.add("modal-hidden");
}

function saveSettings() {
    const newValue = Number(triesInput.value);

    if (!Number.isInteger(newValue) || newValue < 2 || newValue > 20) {
        alert("Enter a whole between 2 and 20.");
        return;
    }

    maximumNumberOfTries = newValue;
    triesCountText.textContent = maximumNumberOfTries;
    closeSettingsModal();
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
});

settingsButton.addEventListener("click", function () {
    openSettingsModal();
});

closeSettingsButton.addEventListener("click", function () {
    closeSettingsModal();
});

saveSettingsButton.addEventListener("click", function () {
    saveSettings();
});

settingsModal.addEventListener("click", function (event) {
    if (event.target === settingsModal) {
        closeSettingsModal();
    }
});