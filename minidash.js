let currentLane = 1;
let enemyPosition = -80;
let score = 0;
let gameRunning = true;
let enemySpeed = 3;

const player = document.getElementById("player");
const enemy = document.getElementById("enemy");
const scoreDisplay = document.getElementById("SCORE");
const gameOverScreen = document.getElementById("gameOver");

document.addEventListener("keydown", function(event) {

    if (!gameRunning) return;

    if (event.key === "ArrowLeft" && currentLane > 0) {
        currentLane--;
    }

    if (event.key === "ArrowRight" && currentLane < 2) {
        currentLane++;
    }

    movePlayer();
});

function movePlayer() {

    if (currentLane === 0) {
        player.style.left = "27px";
    }

    if (currentLane === 1) {
        player.style.left = "160px";
    }

    if (currentLane === 2) {
        player.style.left = "293px";
    }
}

function moveEnemy() {
 
    if (!gameRunning) return;

    enemyPosition += enemySpeed;

    enemy.style.top = enemyPosition + "px";

    checkCollision();

    /* Enemy reached bottom */

    if (enemyPosition > 600) {

        enemyPosition = -80;

        score++;

        enemySpeed = 3 + score * 0.2;

        scoreDisplay.textContent = score;

        chooseRandomLane();
    }
}

function chooseRandomLane() {

    let enemyLane = Math.floor(Math.random() * 3);

    if (enemyLane === 0) {
        enemy.style.left = "27px";
    }

    if (enemyLane === 1) {
        enemy.style.left = "160px";
    }

    if (enemyLane === 2) {
        enemy.style.left = "293px";
    }
}

function checkCollision() {

    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    if (
        playerRect.left < enemyRect.right &&
        playerRect.right > enemyRect.left &&
        playerRect.top < enemyRect.bottom &&
        playerRect.bottom > enemyRect.top
    ) {

        gameOver();
    }
}

function gameOver() {

    gameRunning = false;
    document.getElementById("finalScore").textContent = score;
    gameOverScreen.style.display = "flex";
}

function restartGame() {

    currentLane = 1;
    enemyPosition = -60;
    score = 0;
    enemySpeed = 3;
    gameRunning = true;

    scoreDisplay.textContent = score;

    player.style.left = "160px";
    enemy.style.left = "160px";
    enemy.style.top = "-60px";

    gameOverScreen.style.display = "none";
}

setInterval(moveEnemy, 20);

