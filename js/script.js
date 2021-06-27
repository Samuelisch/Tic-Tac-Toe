const text = document.querySelector('.text');
let gameEnd = false;

const createPlayer = ({name, symbol}) => ({
    name,
    symbol,
    array: [],

    setUserName(name) {
        this.name = name;
    },

    setSymbol(symbol) {
        this.symbol = symbol;
    },

    win() {
        return `${this.name} wins!`;
    },

    action(x) {
      this.array.push(x);
    }
});

const formBoard = (() => {
    const form = document.querySelector('form');
    const configBtn = document.querySelector('.configure-btn');
    const submitBtn = document.querySelector('.submit-btn');

    function formSubmit(e) {
        e.preventDefault();
        form.classList.toggle('display-form');
        const playerOneName = document.getElementById('name1').value;
        const playerTwoName = document.getElementById('name2').value;
        game.player1.name = playerOneName;
        game.player2.name = playerTwoName;
        gameBoard.reset();
    }

    function dropForm() {
        form.classList.toggle('display-form');
    }

    submitBtn.addEventListener('click', formSubmit);
    configBtn.addEventListener('click', dropForm);
})();

//game Module to create players, and have game flow.
const game = (() => {
    const botDifficulty = document.querySelector('input[name="difficulty"]:checked').value //easy, medium or hard

    function random(arr) {
        const index = Math.floor(Math.random() * arr.length);
        return arr[index];
    }

    let player1 = createPlayer({name: 'Player1', symbol: 'X'});
    let player2 = createPlayer({name: 'Player2', symbol: 'O'});

    //set flags for player turns
    let playerOneFlag = true;
    

    function turn(player) {
        text.textContent = `${player.name}'s turn!`
    }
    turn(player1);

    function nextPlayerTurn() {
        if (playerOneFlag) {
            playerOneFlag = !playerOneFlag;
            turn(player2);
            if (document.querySelector('#ai').checked) {
                botTurn();
            }
        } else {
            playerOneFlag = !playerOneFlag;
            turn(player1);
        }
    }

    //set action functions for each click event / player action to array (player.action(cellnum)
    function clicked(e) {
        const cell = e.target;
        const index = gameBoard.gameArray.indexOf(parseInt(cell.id));

        //ignore if game is won or clicked on filled cell
        if (gameEnd || cell.textContent) {
            return;
        }

        let player = player1;
        if (!playerOneFlag) {
            player = player2;
        }
        //adds player symbol into grid cell, pushes cell id into array, and checks for win
        cell.textContent = player.symbol;
        player.action(parseInt(cell.id));
        //removes cell from gameBoard array, for bot usage (splice, index, 1)
        console.log(`removed ${parseInt(cell.id)} from array!`);
        gameBoard.gameArray.splice(index, 1);
        console.log(player.array);
        //checks for winning condition
        gameBoard.isWon(player);
        gameBoard.isTie();
        if (gameEnd) {
            console.log('game ending');
            return;
        }
        
        //function for next turn
        nextPlayerTurn();
    }

    function botTurn() {
        const player = player2;
        const cell = document.querySelector(`.cell[id="${random(gameBoard.gameArray)}"]`);
        const index = gameBoard.gameArray.indexOf(parseInt(cell.id));

        cell.textContent = player.symbol;
        player.action(parseInt(cell.id));
        console.log(`removed ${parseInt(cell.id)} from array!`);
        gameBoard.gameArray.splice(index, 1);

        gameBoard.isWon(player);
        gameBoard.isTie();
        if (gameEnd) {
            return;
        }
        
        //function for next turn
        console.log(`array is ${gameBoard.gameArray}`);
        nextPlayerTurn();
    }

    return {player1, player2, clicked, turn}
})();

//module to create, reset and fill the grid for the game
const gameBoard = (() => {
    const gameBox = document.querySelector('.game-box');
    const restart = document.querySelector('.restart-btn');
    let gameArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    
    //function to start game
    function start() {
        for (let i = 0; i < 9; i++) {
            gameBox.innerHTML += `<div class="cell" id="${i}"></div>`;
        }
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => cell.addEventListener('click', game.clicked));
    };

    function reset() {
        gameBox.innerHTML = '';
        gameEnd = false;
        game.player1.array = [];
        game.player2.array = [];
        start();
        game.turn(game.player1);
    }

    //create winning combinations
    const win = 
    [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8]
    ];

    //check if winning condition reached
    function isWon(player) {
        console.log('checking win');
        for (let i = 0; i < win.length; i++) {
            if (win[i].every(num => player.array.includes(num))) {
                console.log('win!');
                text.textContent = `${player.win()}`;
                gameEnd = true;
            }
        }
    }

    //if all squares filled and no winning condition, declare tie
    function isTie() {
        const cells = document.querySelectorAll('.cell');
        if (Array.from(cells).every(cell => cell.textContent) && !gameEnd) {
            text.textContent = "It's a tie!";
            gameEnd = true;
        }
    }

    restart.addEventListener('click', reset);

    return{start, reset, isWon, isTie, gameArray};
})();

gameBoard.start();