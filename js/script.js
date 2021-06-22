const text = document.querySelector('.text');
const gameBox = document.querySelector('.game-box');

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

//game Module to create players, and have game flow.
const game = (() => {
    let player1 = createPlayer({name: 'Player1', symbol: 'X'});
    let player2 = createPlayer({name: 'Player2', symbol: 'O'});
    console.log(player1);
    console.log(player2);

    //set flags for player turns
    playerOneFlag = true;
    gameEnd = false;

    function turn(player) {
        text.textContent = `${player.name}'s turn!`
    }
    turn(player1);

    function nextPlayerTurn() {
        if (playerOneFlag) {
            playerOneFlag = !playerOneFlag;
            turn(player2);
        } else {
            playerOneFlag = !playerOneFlag;
            turn(player1);
        }
    }

    //set action functions for each click event / player action to array (player.action(cellnum)
    function clicked(e) {
        const cell = e.target;

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
        player.array.push(parseInt(cell.id));
        console.log(player.array);
        //checks for winning condition
        gameBoard.isWon(player);
        gameBoard.isTie(player);
        if (gameEnd) {
            return;
        }
        
        //function for next turn
        nextPlayerTurn();
    }


    //check if winning condition reached (winning condition in array) (after player action / bot action)
    

    return {clicked, gameEnd}
})();

//module to create, reset and fill the grid for the game
const gameBoard = (() => {
    function start() {
        for (let i = 0; i < 9; i++) {
            gameBox.innerHTML += `<div class="cell" id="${i}"></div>`;
        }
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => cell.addEventListener('click', game.clicked));
    }

    function reset() {
        console.log('Resetting game...');
        //manipulate DOM
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
        for (let i = 0; i < win.length; i++) {
            if (win[i].every(num => player.array.includes(num))) {
                text.textContent = `${player.name} won!`;
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

    return{start, reset, isWon, isTie};
})();

gameBoard.start();