const score = localStorage.getItem('score');

let currentScore = document.querySelector('#current-score');
let divCurrentScore = document.querySelector('#div-current-score');
let saveScoreForm = document.querySelector('#save-score-form');
let pseudoInput = document.querySelector('#pseudo');
let pseudo = pseudoInput.value;
let highScore = JSON.parse(localStorage.getItem('highScore')) || [];

/* Enregistrer le score */
function saveScore() {
    if (score) {
        saveScoreForm.classList.remove('hidden');
    }

    if (!Array.isArray(highScore)) {
        highScore = [];
        localStorage.setItem('highScore', JSON.stringify(highScore));
    }

    saveScoreForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const pseudo = pseudoInput.value;

        if (pseudo) {
            highScore.push({ 'pseudo': pseudo, 'score': score });
            localStorage.setItem('highScore', JSON.stringify(highScore));
            pseudoInput.value = "";
            showScoreTable();
            saveScoreForm.classList.add('hidden');
            localStorage.removeItem('score');
        }
    });
}

/* Afficher le score précédent */
function showCurrentScore() {
    if (score) {    
        currentScore.innerText = score;
        divCurrentScore.classList.remove('hidden');
    }
}

/* Afficher le tableau des scores */
function showScoreTable() {
    const table = document.querySelector('#table-body');
    table.innerHTML = "";
    highScore.forEach(function(row) {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
    
        td1.innerText = row.score;
        td2.innerText = row.pseudo;
        table.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
    });
}

/* AU DEMARRAGE */
window.onload = function() {
    showCurrentScore();
    saveScore();
    showScoreTable();
};
