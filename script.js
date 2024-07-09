const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20;
const canvasSize = canvas.width;

let snake = [{ x: box * 5, y: box * 5 }];
let direction = "RIGHT";
let food = {
    x: Math.floor(Math.random() * canvasSize / box) * box,
    y: Math.floor(Math.random() * canvasSize / box) * box,
};
const appleImage = new Image();
appleImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABhElEQVR42q2SMU/TUBCG/7n5gtRQpKRhLoZKSkhShEKVbBRG2WSbSjkHjwGl7Gxotugow8ldY3oYiSwU6WeRDaiA0UjR06GgTTovLBV1DUrb1bbpfXs0EN7nd8/j8zv3vff7QxtMOve2EYAxyKcX/ulSTydhZxAvROAioLRb5T8rwUBiAIAZVQwrgx8WI8HyCPw1b3WiKyNqkRcuIr1VJWpN5ELrdvI1prcKKRtQiKpEDACs5QwE0AMMn3H3a4k+E1+KbQWsZbuNRXKNNp8IEuEn0zi0XmvszbI2tsJrL7S20TiHpBSPYZDOjgzj2EnqsRYagZFtBbBsg4fKOIQqO53B0Hk8PzhjLpqBf9ONuYWhBvlZ1yYhsc+J/yb1/g82YJfH9A5Q0P1L8u+kBO2e0NiyLkMN2q7SoLDp77G19K+pgeBAk/gCyfaOcsPVZOV9AMAzXzIKrAwCvj+yxpaeVpqd0KgJpRQm2K0RCPTXsl9tfDkJS4ocJH1omLO+5qRwvHJ+UQ4gWhl/UfYX6YnddBBHkmNYAAAAASUVORK5CYII=';

document.addEventListener("keydown", setDirection);

function setDirection(event) {
    if (event.keyCode === 37 && direction !== "RIGHT") direction = "LEFT";
    else if (event.keyCode === 38 && direction !== "DOWN") direction = "UP";
    else if (event.keyCode === 39 && direction !== "LEFT") direction = "RIGHT";
    else if (event.keyCode === 40 && direction !== "UP") direction = "DOWN";
}

function drawGame() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);

        if (i === 0) {
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(snake[i].x + box / 2, snake[i].y + box / 2, box / 4, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    ctx.drawImage(appleImage, food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        food = {
            x: Math.floor(Math.random() * canvasSize / box) * box,
            y: Math.floor(Math.random() * canvasSize / box) * box,
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvasSize || snakeY >= canvasSize || collision(newHead, snake)) {
        clearInterval(game);
        alert("ゲームオーバー");
    }

    snake.unshift(newHead);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

let game = setInterval(drawGame, 200);
