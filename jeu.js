const canvas = document.querySelector("#monCanvas")
const ctx = canvas.getContext("2d")

const direction = { x: 1, y: 0 }
const snake = [{ x: 20, y: 20 }]
const fruit = {}
let score = 0

const fruitImage = new Image()
fruitImage.src = './images/apple.png'

let intervalGame
let intervalFruit

/***************************/
/*******Lancer le jeu*******/
/***************************/

function startGame() {
    intervalGame = setInterval(play, 100);
}

/***************************/
/****Dessiner le serpent****/
/***************************/

function drawSnake() {
    ctx.fillStyle = 'green'
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, 20, 20); // (x, y, largeur, hauteur)
    })
}

/***************************/
/****Déplacer le serpent****/
/***************************/

function moveSnake() {
    const newHead = {
        x: snake[0].x + direction.x * 20,
        y: snake[0].y + direction.y * 20
    }

    if(newHead.x == fruit.x && newHead.y == fruit.y){
        generateFruit()
        resetFruitInterval()
        score+=5
        updateScore(score)
        console.log(snake)
    } else {
        snake.pop()
        console.log(snake)
    }

    snake.unshift(newHead)
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
})

/*************************************/
/****Voir si le serpent est en vie****/
/*************************************/

function checkDead() {
    if (snake[0].x >= canvas.width || snake[0].x < 0 ||
        snake[0].y >= canvas.height || snake[0].y < 0) {
        gameOver();
    }

    const prevSnake = snake.slice(1)
    if (prevSnake.includes(snake[0])) {
        alert('Looser')
    }
}

/*************************************/
/*******Faire mourrir le serpent******/
/*************************************/

const gameOverDiv = document.querySelector('#game-over')

function gameOver() {
    clearInterval(intervalGame)
    gameOverDiv.classList.remove('hidden')
    localStorage.setItem('score', score);
}

gameOverDiv.addEventListener('click', function () {
    window.location.href = '/index.html'
})

/*************************************/
/******************Fruits*************/
/*************************************/

function generateFruit(){
    fruit.x = Math.floor(Math.random() * (canvas.width / 20)) * 20
    fruit.y = Math.floor(Math.random() * (canvas.height / 20)) * 20
}

intervalFruit = setInterval(generateFruit,10000)

function drawFruit() {
    ctx.fillStyle = 'red'
    ctx.drawImage(fruitImage,fruit.x, fruit.y, 20, 20); // (x, y, largeur, hauteur)
}

function resetFruitInterval() {
    clearInterval(intervalFruit) // Nettoie l'intervalle précédent
    intervalFruit = setInterval(generateFruit, 10000) // Démarre un nouvel intervalle
    generateFruit() // Génère immédiatement un fruit
}

/*************************************/
/***************Score*****************/
/*************************************/

function updateScore(score){
    document.querySelector('#score').innerText = score
}


/*************************************/
/************Gameplay*****************/
/*************************************/

function play() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake()
    drawSnake()
    drawFruit()
    checkDead()
}

window.onload = function () {
    startGame()
    generateFruit()
    drawFruit()
    drawSnake()

}