function Player (name) {
  this.name = name;
  this.score = 0;
}


function boardSetup() {
    for (let i = 0; i < 9; i++) {
        let square = document.getElementById(i.toString())
        square.addEventListener('click', chooseSquare);
    }
}

function chooseSquare(event) {
    let square = event.target
    square.style.backgroundColor = 'red';
    square.removeEventListener('click', chooseSquare);
}


window.onload = boardSetup;