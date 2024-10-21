const dino = document.querySelector('.dino');
const gameContainer = document.querySelector('.game');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const restartGameElement = document.querySelector('.restart-game');

let isJumping = false;
let gravity = 0.9;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let isGameOver = false;
let scoreInterval;

highScoreElement.innerText = highScore;

// Handle key press for jump and restart
document.addEventListener('keydown', event => {
    if (event.keyCode === 32 && !isJumping && !isGameOver) { // Space key
        jump();
    }
    if (event.key === 'r' && isGameOver) { // 'R' key to restart
        restart();
    }
});

function jump() {
    let position = 0;
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) { // Max height of the jump
            clearInterval(upInterval);

            // Fall down
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 5;
                    position *= gravity;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            // Jump up
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    cactus.classList.add('cactus');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    // Set bottom position directly when creating cactus
    cactus.style.bottom = '5px'; // Adjust this value for lower positioning
    cactus.style.left = cactusPosition + 'px';
    gameContainer.appendChild(cactus);

    let cactusInterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(cactusInterval);
            gameContainer.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && parseInt(dino.style.bottom) === 0) {
            // Collision Detected
            clearInterval(cactusInterval);
            clearInterval(scoreInterval);
            isGameOver = true;
            restartGameElement.style.display = 'block';
            checkHighScore();
            alert('Game Over!');
        } else {
            cactusPosition -= 5;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    if (!isGameOver) {
        setTimeout(createCactus, randomTime);
    }
}


function startScoring() {
    score = 0;
    scoreElement.innerText = score;
    scoreInterval = setInterval(() => {
        score++;
        scoreElement.innerText = score;
    }, 100);
}

function checkHighScore() {
    if (score > highScore) {
        highScore = score;
        highScoreElement.innerText = highScore;
        localStorage.setItem('highScore', highScore);
    }
}

function restart() {
    const allCacti = document.querySelectorAll('.cactus');
    allCacti.forEach(cactus => cactus.remove());
    clearInterval(scoreInterval);
    isGameOver = false;
    restartGameElement.style.display = 'none';
    startScoring();
    createCactus();
}

function main() {
    startScoring();
    createCactus();
}

main();
