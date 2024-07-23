let player1Score = 301;
let player2Score = 301;
let currentPlayer = 1;
let previousScore = null;
let lastValidScore = null;

function setPlayerNames() {
    const player1Name = document.getElementById('player1Name').value || 'Player 1';
    const player2Name = document.getElementById('player2Name').value || 'Player 2';
    document.getElementById('player1').innerHTML = `<span id="dot1" class="dot">•</span> ${player1Name}: <span id="score1">301</span>`;
    document.getElementById('player2').innerHTML = `<span id="dot2" class="dot" style="visibility: hidden;">•</span> ${player2Name}: <span id="score2">301</span>`;
    document.getElementById('playerNames').style.display = 'none';
}

function playSound(score) {
    const audio = new Audio(`sounds/${score}.mp3`);
    audio.play();
}

function playWinSound() {
    const audio = new Audio('sounds/win.mp3');
    audio.play();
}

function showWinnerBanner(winnerName) {
    const winnerBanner = document.getElementById('winnerBanner');
    winnerBanner.innerText = `${winnerName} wins!`;
    winnerBanner.style.display = 'block';
}

function updateScore(score) {
    previousScore = { player1Score, player2Score, currentPlayer };
    if (currentPlayer === 1) {
        player1Score -= score;
        document.getElementById('score1').innerText = player1Score;
        if (player1Score <= 0) {
            const player1Name = document.getElementById('player1').textContent.split(':')[0].trim();
            showWinnerBanner(player1Name);
            playWinSound();
        } else {
            currentPlayer = 2;
            toggleDot();
        }
    } else {
        player2Score -= score;
        document.getElementById('score2').innerText = player2Score;
        if (player2Score <= 0) {
            const player2Name = document.getElementById('player2').textContent.split(':')[0].trim();
            showWinnerBanner(player2Name);
            playWinSound();
        } else {
            currentPlayer = 1;
            toggleDot();
        }
    }
    lastValidScore = score;
}

function undoScore() {
    if (previousScore) {
        player1Score = previousScore.player1Score;
        player2Score = previousScore.player2Score;
        currentPlayer = previousScore.currentPlayer;
        document.getElementById('score1').innerText = player1Score;
        document.getElementById('score2').innerText = player2Score;
        toggleDot();
        previousScore = null;
        document.getElementById('messageArea').innerText = '';
    }
}

function toggleDot() {
    const dot1 = document.getElementById('dot1');
    const dot2 = document.getElementById('dot2');
    if (currentPlayer === 1) {
        dot1.style.visibility = 'visible';
        dot2.style.visibility = 'hidden';
    } else {
        dot1.style.visibility = 'hidden';
        dot2.style.visibility = 'visible';
    }
}

function appendDigit(digit) {
    const scoreInput = document.getElementById('scoreInput');
    if (scoreInput.value.length < 3) {
        scoreInput.value += digit;
    }
}

function handleScore() {
    const scoreInput = document.getElementById('scoreInput');
    const messageArea = document.getElementById('messageArea');
    const score = parseInt(scoreInput.value);

    if (!isNaN(score) && score >= 1 && score <= 180) {
        messageArea.innerText = '';  // Clear any previous error message
        playSound(score);
        updateScore(score);
        scoreInput.value = '';
    } else {
        messageArea.innerText = 'Please enter a valid score between 1 and 180.';
        scoreInput.value = '';
    }
}
