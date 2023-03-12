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
        return true;
    }
}

Board.prototype.changeBoard = function(row, col, player) {
    let n = this.rows.length;
    let toAdd = player === game.playerOne ? 1 : -1;
    console.log(toAdd)
    this.rows[row] += toAdd;
    this.cols[col] += toAdd;
    if (row === col) {
        this.diag += toAdd;
    }
    if (row + col === n - 1) {
        this.antidiag += toAdd;
    }
}

function startGame(event) {
    event.preventDefault();
    let playerOneName = document.getElementById('playerOne').value;
    let playerTwoName = document.getElementById('playerTwo').value;
    let playerOne = new Player(playerOneName);
    let playerTwo = new Player(playerTwoName);
    game.playerOne = playerOne;
    game.playerTwo = playerTwo;
    game.currentPlayer = playerOne;
    boardSetup()
} 

function makeMove(event) {
    let square = event.target
    let row = square.dataset.row
    let col = square.dataset.col
    game.board.changeBoard(row, col, game.currentPlayer);
    if (game.currentPlayer === game.playerOne) {
        square.style.backgroundColor = 'red';
    } else {
        square.style.backgroundColor = 'blue';
    }
    if (game.board.checkWin(row, col)) {
        game.currentPlayer.incrementScore();
        console.log(game.currentPlayer.name + ' wins!');
    }
    game.currentPlayer = game.currentPlayer === game.playerOne ? game.playerTwo : game.playerOne;
}


function boardSetup() {
    for (let i = 0; i < 9; i++) {
        let square = document.getElementById(i.toString())
        square.addEventListener('click', makeMove);
        square.innerText = '';
    }
}


let game = new Game();
let playerForm = document.getElementById('playerForm');
playerForm.addEventListener('submit', startGame);