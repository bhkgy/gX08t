const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 20;
const canvasSize = canvas.width;

let snake = [{ x: 9 * box, y: 10 * box }];
let direction = "RIGHT";
let food = {
    x: Math.floor(Math.random() * (canvasSize/box)) * box,
    y: Math.floor(Math.random() * (canvasSize/box)) * box
};

document.addEventListener("keydown", directionControl);

function directionControl(event) {
    if (event.keyCode == 37 && direction != "RIGHT") {
        direction = "LEFT";
    } else if (event.keyCode == 38 && direction != "DOWN") {
        direction = "UP";
    } else if (event.keyCode == 39 && direction != "LEFT") {
        direction = "RIGHT";
    } else if (event.keyCode == 40 && direction != "UP") {
        direction = "DOWN";
    }
}

function collision(newHead, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
            return true;
        }
    }
    return newHead.x >= canvasSize || newHead.x < 0 || newHead.y >= canvasSize || newHead.y < 0;
}

function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'darkgreen' : 'lightgreen';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        if (i === 0) {
            ctx.fillStyle = 'black';
            ctx.fillRect(snake[i].x + 4, snake[i].y + 4, 4, 4); // Left eye
            ctx.fillRect(snake[i].x + 12, snake[i].y + 4, 4, 4); // Right eye
        }
    }

    let img = new Image();
    img.src = 'apple.png';
    ctx.drawImage(img, food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "LEFT") snakeX -= box;
    if (direction == "UP") snakeY -= box;
    if (direction == "RIGHT") snakeX += box;
    if (direction == "DOWN") snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        food = {
            x: Math.floor(Math.random() * (canvasSize / box)) * box,
            y: Math.floor(Math.random() * (canvasSize / box)) * box
        };
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (collision(newHead, snake)) {
        clearInterval(game);
        alert('ゲームオーバー');
    }

    snake.unshift(newHead);
}

let game = setInterval(draw, 100); // Adjust speed here
