const dino = document.querySelector('.dino');
const cactus = document.querySelector('.cactus');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const restartGameElement = document.querySelector('.restart-game');

let isJumping = false;
let gravity = 0.9;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let isGameOver = false;
let cactusInterval, scoreInterval;

highScoreElement.innerText = highScore;

// Handle key press for jump
document.addEventListener('keydown', event => {
    if (event.keyCode === 32 && !isJumping && !isGameOver) {  // Space key
        jump();
    }
    if (event.key === 'r' && isGameOver) {  // Restart game
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
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;
    
    cactus.style.left = cactusPosition + 'px';
    
    cactusInterval = setInterval(() => {
        cactusPosition -= 5;
        cactus.style.left = cactusPosition + 'px';
        
        // Check for collision
        if (cactusPosition > 0 && cactusPosition < 60 && parseInt(dino.style.bottom) === 0) {
            clearInterval(cactusInterval);
            clearInterval(scoreInterval);
            isGameOver = true;
            restartGameElement.style.display = 'block';
            checkHighScore();
            alert('Game Over!');
        }
        
        if (cactusPosition < -60) {
            clearInterval(cactusInterval);
            cactus.style.left = '1000px';
        }
    }, 20);

    if (!isGameOver) {
        setTimeout(createCactus, randomTime);
    }
}

function startScoring() {
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
    score = 0;
    scoreElement.innerText = score;
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
