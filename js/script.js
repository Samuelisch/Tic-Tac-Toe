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

    function won(player) {
        const array = [...player.array];
        console.log(array);
        for (let i = 0; i < win.length; i++) {
            if (win[i].every(num => array.includes(num))) {
                return true;
            }
            return false;
        }
    }

    //set action functions for each click event / player action to array (player.action(cellnum)
    function clicked(e) {
        const cell = e.target;

        if (cell.textContent) {
            console.log('cell is filled');
            return; // returns if clicked on filled cell
        }
        //checks player flag for symbol input, adds cell id into player array
        if (playerOneFlag) {
            cell.textContent = player1.symbol;
            player1.array.push(parseInt(cell.id));
            console.log(player1.array);
            if (won(player1)) {
                console.log('player1 won!')
                return;
            }
        } else {
            cell.textContent = player2.symbol;
            player2.array.push(parseInt(cell.id));
            console.log(player2.array);
            if (won(player2)) {
                console.log('player2 won!')
                return;
            }
        }
        //checks for winning condition
        
        //function for next turn
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