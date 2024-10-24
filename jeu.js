const canvas = document.querySelector("#monCanvas")
const ctx = canvas.getContext("2d")

const direction = { x: 1, y: 0 }
const snake = [{x:20, y:20}]

/*Dessiner le serpent*/

function drawSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green'
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, 20, 20); // (x, y, largeur, hauteur)
    })
}

/*Déplacer le serpent*/

setInterval(moveSnake,200)

function moveSnake() {
    const newHead = {
        x: snake[0].x + direction.x*20,
        y: snake[0].y + direction.y*20
    }
   snake.unshift(newHead)
   snake.pop()
   drawSnake()
}

window.onload = function() {
    drawSnake();
};






