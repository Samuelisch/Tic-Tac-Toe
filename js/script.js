let userName = 'Samuel';
let symbol = 'X';

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
        //manipulate DOM
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
    let player1 = createPlayer({name: userName, symbol: symbol});
    console.log(player1);

    //set flags for player turns

    //set action functions for each click event

    //check if winning condition reached (winning condition in array)
    
})();

gameBoard.start();