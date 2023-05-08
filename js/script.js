const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const cloud = document.querySelector('.cloud');
var i = 0;

function gameStarted() {
    i++;
    pipe.classList.add('pipe-animation');
}

function gameOver(pipePosition, marioPosition, cloudPosition) {

    pipe.classList.remove('pipe-animation');
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;

    mario.src = './images/game-over.png';
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';

    cloud.style.animation = 'none';
    cloud.style.left = `${cloudPosition}px`;
}

function marioJump() {

    mario.classList.add('mario-jump');

    setTimeout(() => {
        mario.classList.remove('mario-jump');
    }, 500); 
}

function loop() {

    document.addEventListener('keydown', marioJump);

    setInterval(
        () => {

            if(i != 0){
               const pipePosition = pipe.offsetLeft;
                const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
                const cloudPosition = cloud.offsetLeft; 

                if ((pipePosition <= 120 && pipePosition >= 50) && marioPosition < 80) {
                    gameOver(pipePosition, marioPosition, cloudPosition);
                }
            }
        }
        , 10);
}

document.addEventListener('keydown', gameStarted);

loop();