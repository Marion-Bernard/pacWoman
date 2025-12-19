const canvas = document.querySelector("#monCanvas")
const ctx = canvas.getContext("2d")

const direction = {x: 1, y: 0}
const pacman = {x: 20, y: 20}
const fantome = {}
let score = 0

// const fruitImage = new Image()
// fruitImage.src = './images/apple.png'

const pacmanImage = new Image()
pacmanImage.src = './images/pacman.png'

const dotImage = new Image()
dotImage.src = './images/dot.png'

const fantomeImage = new Image()
fantomeImage.src = './images/fantome-blue.png'

let intervalGame
// let intervalFruit

/***************************/
/*******Lancer le jeu*******/
/***************************/

function startGame() {
    intervalGame = setInterval(play, 100);
}

/***************************/
/****Dessiner pacman****/
/***************************/

function drawPacman() {
    ctx.drawImage(pacmanImage,pacman.x, pacman.y, 20, 20); // (x, y, largeur, hauteur)
}

/***************************/
/****Déplacer pacman****/
/***************************/

function movePacman() {
    pacman.x += direction.x * 20,
    pacman.y += direction.y * 20
    
    // if(newHead.x == fruit.x && newHead.y == fruit.y){
    //     generateFruit()
    //     resetFruitInterval()
    //     score+=5
    //     updateScore(score)
    // } else {
    //     Pacman.pop()
    // }
}

/***************************/
/***Contrôler le serpent****/
/***************************/

window.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowRight':
            if (pacman.x <380 ){
                direction.x = 1
                direction.y = 0
            }            
        break

        case 'ArrowLeft':
            if (pacman.x > 20 ){
                direction.x = -1
                direction.y = 0
            }
        break

        case 'ArrowUp':
            if (pacman.y > 20 ){
                direction.y = -1
                direction.x = 0
            }
        break

        case 'ArrowDown':
            if (pacman.y < 380 ){
                direction.y = 1
                direction.x = 0
            }
        break
    }
})

/*************************************/
/****Voir si le serpent est en vie****/
/*************************************/

function checkWall() {
    if (pacman.x == canvas.width-20 || pacman.x < 20) {
            direction.x = 0
    }
    if (pacman.y == canvas.height-20 || pacman.y < 20) {
            direction.y = 0
    }
}

// /*************************************/
// /*******Faire mourrir le serpent******/
// /*************************************/

// const gameOverDiv = document.querySelector('#game-over')

// function gameOver() {
//     clearInterval(intervalGame)
//     gameOverDiv.classList.remove('hidden')
//     localStorage.setItem('score', score);
// }

// gameOverDiv.addEventListener('click', function () {
//     window.location.href = '/index.html'
// })

// /*************************************/
// /******************Fruits*************/
// /*************************************/

// // function generateFruit(){
// //     fruit.x = Math.floor(Math.random() * (canvas.width / 20)) * 20
// //     fruit.y = Math.floor(Math.random() * (canvas.height / 20)) * 20
// // }

// // intervalFruit = setInterval(generateFruit,10000)

// // function drawFruit() {
// //     ctx.drawImage(fruitImage,fruit.x, fruit.y, 20, 20); // (x, y, largeur, hauteur)
// // }

// // function resetFruitInterval() {
// //     clearInterval(intervalFruit) // Nettoie l'intervalle précédent
// //     intervalFruit = setInterval(generateFruit, 10000) // Démarre un nouvel intervalle
// //     generateFruit() // Génère immédiatement un fruit
// // }

// /*************************************/
// /***************Score*****************/
// /*************************************/

// function updateScore(score){
//     document.querySelector('#score').innerText = score
// }

/***************************************/
/***Remplir la grille avec des points***/
/***************************************/

function fillGrid(image){
    for (let hauteur = 0 ; hauteur<= canvas.height ; hauteur += 20 ) {
        for (let largeur = 0 ; largeur<= canvas.width ; largeur += 20){
            ctx.drawImage(image, hauteur, largeur, 20, 20); // (image, x, y, largeur, hauteur)
        }
    } 
}


// /*************************************/
// /************Gameplay*****************/
// /*************************************/

function play() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    movePacman()
    drawPacman()
    //drawFruit()
    checkWall()
}

window.onload = function () {
    startGame()
    fillGrid(dotImage)
    //generateFruit()
    //drawFruit()
    drawPacman()
}