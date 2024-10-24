const canvas = document.querySelector("#monCanvas")
const ctx = canvas.getContext("2d")

const direction = { x: 1, y: 0 }
const snake = [{ x: 20, y: 20 }]

let intervalGame

/***************************/
/*******Lancer le jeu*******/
/***************************/

function startGame() {
    intervalGame = setInterval(test, 100); 
}

/***************************/
/****Dessiner le serpent****/
/***************************/

function drawSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green'
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, 20, 20); // (x, y, largeur, hauteur)
    })
}

/***************************/
/****Déplacer le serpent****/
/***************************/

setInterval(test, 200)

function moveSnake() {
    const newHead = {
        x: snake[0].x + direction.x * 20,
        y: snake[0].y + direction.y * 20
    }
    snake.unshift(newHead)
    snake.pop()
    drawSnake()
}

/***************************/
/***Contrôler le serpent****/
/***************************/

window.addEventListener('keydown', function (event) {
    if (direction.x === 0) {
        switch (event.key) {
            case 'ArrowRight':
                direction.x = - direction.y
                direction.y = 0
                break

            case 'ArrowLeft':
                direction.x = direction.y
                direction.y = 0
                break
        }
    } else {
        switch (event.key) {
            case 'ArrowRight':
                direction.y = direction.x
                direction.x = 0
                break

            case 'ArrowLeft':
                direction.y = - direction.x
                direction.x = 0
                break
        }
    }
}
)

/*************************************/
/****Voir si le serpent est en vie****/
/*************************************/

function checkDead() {
    if (snake[0].x >= canvas.width || snake[0].x < 0 ||
        snake[0].y >= canvas.height || snake[0].y < 0) {
        gameOver();
    }
}

const gameOverDiv = document.querySelector('#game-over')

function gameOver () {
    clearInterval(intervalGame)
    gameOverDiv.classList.remove('hidden')
}

gameOverDiv.addEventListener('click', function() {
    window.location.href = '/index.html'
})


function test() {
    moveSnake()
    checkDead()
}

window.onload = function () {
    drawSnake()
}