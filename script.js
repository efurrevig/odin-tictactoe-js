function Player (name) {
  this.name = name;
  this.score = 0;
}

Player.prototype.incrementScore = function() {
    this.score++;
}

function Game() {
    this.playerOne = null;
    this.playerTwo = null;
    this.currentPlayer = this.playerOne;
    this.board = new Board();    
}

Game.prototype.reset = function() {
    this.playerOne.score = 0;
    this.playerTwo.score = 0;
    this.currentPlayer = this.playerOne;
}

function Board() {
    let n = 3;
    this.rows = new Array(n).fill(0);
    this.cols = new Array(n).fill(0);
    this.diag = 0;
    this.antidiag = 0;
}

Board.prototype.checkWin = function(row, col) {
    let n = this.rows.length;
    if (Math.abs(this.rows[row]) === n || Math.abs(this.cols[col]) === n || Math.abs(this.diag) === n || Math.abs(this.antidiag) === n) {
        for (let i = 0; i < 9; i++) {
            let square = document.getElementById(i.toString())
            square.removeEventListener('click', makeMove);
        }
        return true;
    }
}

Board.prototype.changeBoard = function(row, col, player) {
    console.log('hi')
    let n = this.rows.length;
    let toAdd = player === game.playerOne ? 1 : -1;
    this.rows[row] += toAdd;
    this.cols[col] += toAdd;
    if (row === col) {
        this.diag += toAdd;
    }
    if (parseInt(row) + parseInt(col) === n - 1) {
        this.antidiag += toAdd;
    }
}

function startGame(event) {
    event.preventDefault();
    console.log('hi')
    let playerOne = new Player('Player One');
    let playerTwo = new Player('Player Two');
    game.playerOne = playerOne;
    game.playerTwo = playerTwo;
    game.currentPlayer = playerOne;
    p1Circle.classList.add('fill')
    p2Circle.classList.remove('fill')
    boardSetup()
} 

function makeMove(event) {
    let square = event.target
    let row = square.dataset.row
    let col = square.dataset.col
    game.board.changeBoard(row, col, game.currentPlayer);
    if (game.currentPlayer === game.playerOne) {
        square.innerHTML = xDiv;
    } else {
        square.innerHTML = oDiv;
    }
    if (game.board.checkWin(row, col)) {
        game.currentPlayer.incrementScore();
        console.log(game.currentPlayer.name + ' wins!');
    }
    square.removeEventListener('click', makeMove);
    game.currentPlayer = game.currentPlayer === game.playerOne ? game.playerTwo : game.playerOne;
    toggleTurnDisplay();
}

function toggleTurnDisplay() {
    p1Circle.classList.toggle('fill')
    p2Circle.classList.toggle('fill')
}
function boardSetup() {
    for (let i = 0; i < 9; i++) {
        let square = document.getElementById(i.toString())
        square.addEventListener('click', makeMove);
        square.innerText = '';
    }
}

const xDiv = `<div class="mark">
                <svg viewBox="140 0 325 400" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
                    <!-- Created with SVG-edit - https://github.com/SVG-Edit/svgedit-->
                    <line fill="none" id="svg_6" stroke="#aaffff" stroke-linecap="round" 
                    stroke-width="10" style="--darkreader-inline-stroke:#007f7f;" x1="397" x2="208" y1="107" y2="297" />
                    <line fill="none" id="svg_7" stroke="#aaffff" stroke-linecap="round" 
                    stroke-width="10" style="--darkreader-inline-stroke:#007f7f;" transform="matrix(1 0 0 1 0 0)" x1="207" x2="394" y1="107" y2="294"/>
                </svg>
                </div>`
const oDiv = `<div class="mark">
                <svg viewBox="0 0 210 210" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
                    <circle cx="50%" cy="50%" fill="none" id="svg_2" r="93.61" 
                    stroke="#d4ffaa" stroke-linecap="round" stroke-width="10" style="--darkreader-inline-stroke:#c7ff90;"/>
                </svg>
                </div>`

const p1Circle = document.querySelector('.p1 .circle');
const p2Circle = document.querySelector('.p2 .circle');

let game = new Game();
let play = document.getElementById('play-button');
play.addEventListener('click', startGame);