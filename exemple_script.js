
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
console.log(ctx)

let snake = [{x: 10, y: 10}];
let direction = {x: 0, y: 0};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    snake.forEach(part => {
        ctx.fillRect(part.x * 10, part.y * 10, 10, 10);
    });
}

function update() {
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
    snake.unshift(head);
    snake.pop();
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') direction = {x: 0, y: -1};
    else if (event.key === 'ArrowDown') direction = {x: 0, y: 1};
    else if (event.key === 'ArrowLeft') direction = {x: -1, y: 0};
    else if (event.key === 'ArrowRight') direction = {x: 1, y: 0};
});

function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100);
}

gameLoop();