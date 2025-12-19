/**********Gestion de la zone de jeu *************/

const canvas = document.querySelector("#monCanvas")
const ctx = canvas.getContext("2d")

canvas.width = 400
canvas.height = 400
const cellSize = 20 

const direction = {x: 1, y: 0}
const pacman = {x: 20, y: 20}
const fantome = {}

let score = 0

let dotGrid = []

/********Import image*****************/

const pacmanImage = new Image()
pacmanImage.src = './images/pacman.png'

const dotImage = new Image()
dotImage.src = './images/dot.png'

const fantomeImage = new Image()
fantomeImage.src = './images/fantome-blue.png'

let intervalGame

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
    ctx.drawImage(pacmanImage,pacman.x, pacman.y, cellSize, cellSize); // (x, y, largeur, hauteur)
}

/***************************/
/******Déplacer pacman******/
/***************************/

function movePacman() {
    dotGrid = dotGrid.filter(item => !(item.x === pacman.x && item.y === pacman.y))
    
    pacman.x += direction.x * 20,
    pacman.y += direction.y * 20
    
    score = 400 - dotGrid.length
    updateScore(score)
    console.log(dotGrid.length)
    if(dotGrid.length == 0 ){
        winGame()
    }
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
            if (pacman.y > 0 ){
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
/****Voir on est au niveau du mur*****/
/*************************************/

function checkWall() {
    if (pacman.x == canvas.width-cellSize || pacman.x < cellSize) {
            direction.x = 0
    }
    if (pacman.y == canvas.height-cellSize || pacman.y < cellSize) {
            direction.y = 0
    }
}

// /*************************************/
// /***************Win Game**************/
// /*************************************/

 const winGameDiv = document.querySelector('#win-game')

function winGame() {
    clearInterval(intervalGame)
    winGameDiv.classList.remove('hidden')
    localStorage.setItem('score', score);
}

winGameDiv.addEventListener('click', function () {
         window.location.href = '/index.html'
})

// /*************************************/
// /***************Score*****************/
// /*************************************/

function updateScore(score){
    document.querySelector('#score').innerText = score
}


/************************************/
/***Remplir la grille de point*******/
/************************************/


function fillGrid(image){    
    for (let hauteur = 0 ; hauteur< canvas.height ; hauteur += cellSize ) {
        for (let largeur = 0 ; largeur< canvas.width ; largeur += cellSize){
           dotGrid.push({'x' : largeur, 'y' : hauteur})
           ctx.drawImage(image, hauteur, largeur, cellSize, cellSize); // (image, x, y, largeur, hauteur)
        }
    } 
}


// /*************************************/
// /************Gameplay*****************/
// /*************************************/

function play() {
    ctx.clearRect(pacman.x, pacman.y, cellSize, cellSize)
    movePacman()
    drawPacman()
    checkWall()
}


window.onload = function () {
    startGame()
    fillGrid(dotImage)
    drawPacman()
    ctx.drawImage(fantomeImage,40, 60, cellSize, cellSize); // (x, y, largeur, hauteur)
}