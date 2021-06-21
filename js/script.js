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

//module to create, reset and fill the grid for the game
const gameBoard = (() => {
    const start = function() {
        console.log(`Game start!`);
        for (let i = 0; i < 9; i++) {
            gameBox.innerHTML += `<div class="cell" id="${i}"></div>`;
        }
    }

    const reset = function() {
        console.log('Resetting game...');
        //manipulate DOM
    }

    //check if winning condition reached

    //if all squares filled and no winning condition, declare tie

    return{start, reset};
})();

//game Module to create players, and have game flow.
const game = (() => {
    let player1 = createPlayer({name: 'Player1', symbol: 'X'});
    console.log(player1);

    //set flags for player turns

    //create winning combinations

    //set action functions for each click event / player action to array (player.action(cellnum)

    //check if winning condition reached (winning condition in array) (after player action / bot action)
    
})();

gameBoard.start();