const text = document.querySelector('.text');
let playerOneFlag = true;

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
    function random(arr) {
        const index = Math.floor(Math.random() * arr.length);
        return arr[index];
    }

    let player1 = createPlayer({name: 'Player1', symbol: 'X'});
    let player2 = createPlayer({name: 'Player2', symbol: 'O'});

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

        //ignore if game is won or clicked on filled cell
        if (cell.textContent) {
            return;
        }

        let player = player1;
        if (!playerOneFlag) {
            player = player2;
        }

        displayMove(player, cell);
    }

    function botTurn() {
        const player = player2;

        function winningMove(playerArray, gameArray) {
            //copy existing moves left
            let copyGameArray = [...gameArray];
            //iterate through each move
            for (let i = 0; i < copyGameArray.length; i++) {
                //copy exisitng player's move
                let copyPlayArray = [...playerArray];
                const cell = document.querySelector(`.cell[id="${copyGameArray[i]}"]`);
                copyPlayArray.push(parseInt(cell.id));
                //test if move will win
                if (gameBoard.isWon(copyPlayArray)) {
                    return document.querySelector(`.cell[id="${copyGameArray[i]}"]`);
                }
            }
            //if no winning moves found, block player's winning move if exists (HARD difficulty)
            return false;
        }

        function filterDifficulty() {
            const botDifficulty = document.querySelector('input[name="difficulty"]:checked').value //easy, medium or hard
            //EASY difficulty
            if (botDifficulty == 'easy') {
                console.log('easy');
                //if no winning move, return a random move
                return winningMove(player.array, gameBoard.gameArray) || document.querySelector(`.cell[id="${random(gameBoard.gameArray)}"]`);
            } else if (botDifficulty == 'hard') { //HARD difficulty
                console.log('hard')
                //if no winning move, block opponent if they have a winning move, else return random move
                return winningMove(player.array, gameBoard.gameArray) 
                    || winningMove(player1.array, gameBoard.gameArray) //if player1 has option to win, block player1's win
                    || document.querySelector(`.cell[id="${random(gameBoard.gameArray)}"]`);
            } /* else { //IMPOSSIBLE difficulty **UNDER CONSTRUCTION**
                console.log('impossibru')

                function minimax(playerOneArray, playerTwoArray, gameArray, is_max, depth) {
                    //if there is a winner or tie, return appropriate actions
                    if (winningMove(playerOneArray, gameArray) || winningMove(playerTwoArray, gameArray)) {
                        if (winningMove(playerTwoArray, gameArray)) { // if bot wins, return maximum value
                            return 100 - depth;
                        } else if (winningMove(playerOneArray, gameArray)) { //if player wins, return minimum value
                            return -100 + depth;
                        }
                        return 0; //else, return 0 for tie
                    }
                    
                    if (is_max) {
                        let best = -100;
                        //loop through available moves
                        gameBoard.gameArray.forEach(index => {
                            const copyGameArray = [...gameArray]; //get copy of current array
                            let copyPlayArray = [...playerOneArray]; //get copy of player array
                            const cell = document.querySelector(`.cell[id="${copyArray[index]}"]`); //make move
                            copyPlayArray.push(parseInt(cell.id));
                            const nodeValue = minimax(copyPlayArray, playerTwoArray, copyGameArray, false, depth + 1);
                            best = Math.max(best, nodeValue);
                        });
                        return best;
                    }

                    if (!is_max) {
                        //best is highest value
                        let best = 100;
                        //loop through available moves
                        gameBoard.gameArray.forEach(index => {
                            const copyGameArray = [...gameArray]; //get copy of current array
                            let copyPlayArray = [...playerTwoArray]; //get copy of player two array
                            const cell = document.querySelector(`.cell[id="${copyArray[index]}"]`); //make move
                            copyPlayArray.push(parseInt(cell.id));
                            const nodeValue = minimax(playerOneArray, copyPlayArray, copyGameArray, true, depth + 1);
                            best = Math.min(best, nodeValue);
                        });
                        return best;
                    }
                }

                const choice = minimax(player1.array, player2.array, gameBoard.gameArray, false, 1);
                return document.querySelector(`.cell[id="${random(gameBoard.gameArray)}"]`);
            }
            */
            
        }

        const cell = filterDifficulty();

        displayMove(player, cell);
    }

    function displayMove(player, cell) {
        const index = gameBoard.gameArray.indexOf(parseInt(cell.id));
        //adds player symbol into grid cell, pushes cell id into array, and checks for win
        cell.textContent = player.symbol;
        //adds cell into player array
        player.action(parseInt(cell.id));
        //removes selected cell from available choices
        gameBoard.gameArray.splice(index, 1);
        //checks if choice made player won or gametie
        if (gameBoard.isWon(player.array)) {
            text.textContent = `${player.win()}`;
            return;
        }

        if (!gameBoard.gameArray.length) {
            text.textContent = "It's a tie!"
            return;
        }
        
        //function for next turn
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
        //empty gameArray, then repopulate it
        while (gameArray.length) {
            gameArray.shift();
        }
        for (let i = 0; i < 9; i++) {
            gameArray.push(i)
        }
        //reset player1 and player2 arrays
        game.player1.array = [];
        game.player2.array = [];
        //empty html for cells
        gameBox.innerHTML = '';
        //set game back to first setting upon page load
        playerOneFlag = true;
        game.turn(game.player1);
        //start game again
        start();
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
    function isWon(array) {
        for (let i = 0; i < win.length; i++) {
            if (win[i].every(num => array.includes(num))) {
                return true;
            }
        }
        return false;
    }

    restart.addEventListener('click', reset);

    return{start, reset, isWon, gameArray};
})();

gameBoard.start();