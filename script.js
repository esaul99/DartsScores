let player1Score = 301;
let player2Score = 301;
let currentPlayer = 1;

function playSound(score) {
    const audio = new Audio(`sounds/${score}.mp3`);
    audio.play();
}

function updateScore(score) {
    if (currentPlayer === 1) {
        player1Score -= score;
        document.getElementById('score1').innerText = player1Score;
        currentPlayer = 2;
    } else {
        player2Score -= score;
        document.getElementById('score2').innerText = player2Score;
        currentPlayer = 1;
    }
}
