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

    //create winning combinations

    //set action functions for each click event / player action to array (player.action(cellnum)
    function clicked(e) {
        const cell = e.target;

        if (playerOneFlag) {
            cell.textContent = player1.symbol;
        } else {
            cell.textContent = player2.symbol;
        }

        nextPlayerTurn();
    }


    //check if winning condition reached (winning condition in array) (after player action / bot action)
    

    return {clicked}
})();

//module to create, reset and fill the grid for the game
const gameBoard = (() => {
    const start = function() {
        console.log(`Game start!`);
        for (let i = 0; i < 9; i++) {
            gameBox.innerHTML += `<div class="cell" id="${i}"></div>`;
        }
        console.log(`Generated grid area`);
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => cell.addEventListener('click', game.clicked));
    }

    const reset = function() {
        console.log('Resetting game...');
        //manipulate DOM
    }

    //check if winning condition reached

    //if all squares filled and no winning condition, declare tie

    return{start, reset};
})();

gameBoard.start();