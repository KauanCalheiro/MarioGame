const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const cloud = document.querySelector('.cloud');
const msg = document.querySelector('.msg');
let i = 0;
let isJumping = false;
let gameLoopId = null;

function gameStarted() {
  //MOSTRAR UMA MENSAGEM PRA COMEÇAR
  msg.style.display = 'block';

  document.addEventListener('keydown', handleKeyPress);
}

function gameRestarted() {
  pipe.style.right = '360px';

  mario.style.animation = "none";
  mario.style.bottom = '0';

  mario.src = './images/mario.gif';
  mario.style.width = '150px';
  mario.style.marginLeft = '0';

  cloud.style.animation = 'clouds-animation 10s infinite linear';

  i = 0;
  isJumping = false;
  msg.style.display = 'none';
  startGameLoop();
}

function gameOver() {
  pipe.classList.remove('pipe-animation');
  mario.style.animation = "none";
  mario.src = './images/game-over.png';
  mario.style.width = '75px';
  mario.style.marginLeft = '50px';
  cloud.style.animation = 'none';

  // Mostra uma mensagem de game over e um botão para reiniciar o jogo
  msg.innerHTML = '<p>Game over!</p><button onClick="gameRestarted()">Play again</button>';
  msg.style.display = 'block';

  // Para o loop principal do jogo
  cancelAnimationFrame(gameLoopId);
}

function handleKeyPress(event) {
  //QUANDO PRECIONAR ESPAÇO
  if (event.code === 'Space' && !isJumping) {
    marioJump();
  }
}

function marioJump() {
  isJumping = true;
  const jumpHeight = 80;
  const jumpDuration = 500;
  const start = performance.now();

  function jump(timestamp) {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / jumpDuration, 1);
    const height = jumpHeight * 4 * (progress - Math.pow(progress, 2));
    mario.style.bottom = `${height}px`;

    if (progress < 1) {
      requestAnimationFrame(jump);
    } else {
      isJumping = false;
    }
  }

  requestAnimationFrame(jump);
}

function detectCollisions() {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
  const cloudPosition = cloud.offsetLeft;

  if ((pipePosition <= 120 && pipePosition >= 50) && marioPosition < 80) {
    gameOver();
  }
}

function updateGame() {
  // Move o obstáculo para a esquerda
  pipe.style.left = `${pipe.offsetLeft - 1}px`;

  // Detecta colisões entre o personagem e o obstáculo
  detectCollisions();

  // Executa o loop principal do jogo novamente
  gameLoopId = requestAnimationFrame(updateGame);
}

function startGameLoop() {
  // Inicia o loop principal do jogo
  gameLoopId = requestAnimationFrame(updateGame);
}

document.addEventListener('keydown', gameStarted);
