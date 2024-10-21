const dino = document.querySelector('.dino');
const cactus = document.querySelector('.cactus');
let isJumping = false;
let gravity = 0.9;

function handleKeyUp(event) {
    if (event.keyCode === 32) { // Space key
        if (!isJumping) {
            jump();
        }
    }
}

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

    let moveCactus = setInterval(() => {
        cactusPosition -= 10;
        cactus.style.left = cactusPosition + 'px';

        if (cactusPosition < -60) {
            clearInterval(moveCactus);
            cactus.style.left = '1000px';
        }

        if (cactusPosition > 0 && cactusPosition < 60 && dino.style.bottom === '0px') {
            clearInterval(moveCactus);
            alert("Game Over!");
            document.location.reload();
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);
