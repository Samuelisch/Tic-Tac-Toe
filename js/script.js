//selectors for start page
const startPage = document.getElementById('front-wrapper');
const playerOneNode = document.querySelector('.player-one');
const playerTwoNode = document.querySelector('.player-two');
const playerOneName = document.getElementById('player-one-name');
const playerTwoName = document.getElementById('player-two-name');
const playerOneSymbols = playerOneNode.querySelector('.symbols');
const playerTwoSymbols = playerTwoNode.querySelector('.symbols');

const submitBtn = document.getElementById('form-submit');

//IIFE for main page display
const displayNameSymbol = (playerOne, playerTwo) => (function(playerOne, playerTwo) {
    const firstNameDisplay = document.querySelector('.first-name');
    const firstSymbolDisplay = document.querySelector('.first-symbol-display');
    const secondNameDisplay = document.querySelector('.second-name');
    const secondSymbolDisplay = document.querySelector('.second-symbol-display');

    firstNameDisplay.textContent = playerOne.name;
    firstSymbolDisplay.appendChild(playerOne.actionSymbol);
    secondNameDisplay.textContent = playerTwo.name;
    secondSymbolDisplay.appendChild(playerTwo.actionSymbol);
})(playerOne, playerTwo);

//selectors for main page
const configureBtn = document.getElementById('configure');

function toggleDifficulty(e) {
    const difficulty = document.querySelectorAll('.difficulty')
    if (e.target.id == 'ai') {
        difficulty.forEach(player => player.style.display = 'flex');
    } else {
        difficulty.forEach(player => player.style.display = 'none');
    }
}

function toggleSymbolsOne(e) {
    const times = playerOneNode.querySelector('.fa-times');
    const circle = playerOneNode.querySelector('.fa-circle');
    const x = playerOneNode.querySelector('.symbol[data-value="x"]');
    const o = playerOneNode.querySelector('.symbol[data-value="o"]');
    const xTwo = playerTwoNode.querySelector('.symbol[data-value="x"]');
    const oTwo = playerTwoNode.querySelector('.symbol[data-value="o"]');

    if (e.target == times) {
        if (x.classList.contains('symbol-toggle')) return;
        x.classList.add('symbol-toggle');
        xTwo.classList.remove('symbol-toggle');
        o.classList.remove('symbol-toggle');
        oTwo.classList.add('symbol-toggle');
    } else if (e.target == circle) {
        if (o.classList.contains('symbol-toggle')) return;
        o.classList.add('symbol-toggle');
        oTwo.classList.remove('symbol-toggle');
        x.classList.remove('symbol-toggle');
        xTwo.classList.add('symbol-toggle');
    }
}

function toggleSymbolsTwo(e) {
    const times = playerTwoNode.querySelector('.fa-times');
    const circle = playerTwoNode.querySelector('.fa-circle');
    const x = playerOneNode.querySelector('.symbol[data-value="x"]');
    const o = playerOneNode.querySelector('.symbol[data-value="o"]');
    const xTwo = playerTwoNode.querySelector('.symbol[data-value="x"]');
    const oTwo = playerTwoNode.querySelector('.symbol[data-value="o"]');

    if (e.target == times) {
        if (xTwo.classList.contains('symbol-toggle')) return;
        xTwo.classList.add('symbol-toggle');
        x.classList.remove('symbol-toggle');
        oTwo.classList.remove('symbol-toggle');
        o.classList.add('symbol-toggle');
    } else if (e.target == circle) {
        if (oTwo.classList.contains('symbol-toggle')) return;
        oTwo.classList.add('symbol-toggle');
        o.classList.remove('symbol-toggle');
        xTwo.classList.remove('symbol-toggle');
        x.classList.add('symbol-toggle');
    }
}

function toggleDisplay() {
    const formInputs = document.querySelectorAll('.player input');
    formInputs.forEach(input => input.disabled = !input.disabled);
    submitBtn.disabled = !submitBtn.disabled;
    startPage.classList.toggle('hide-front-page');
}

function displayForm() {
    toggleDisplay();
    if (!playerOneName.value) {
        playerOneName.value = "Player1";
    }
    if (!playerTwoName.value) {
        playerTwoName.value = "Player2";
    }
    const playerOne = playerFactory(playerOneName.value, true, undefined, playerOneNode.querySelector('.symbol-toggle').firstElementChild);
    const playerTwo = playerFactory(playerTwoName.value, playerTwoNode.querySelector('input[name="is-human-2"]:checked').id == "human", playerTwoNode.querySelector('input[name="difficulty"]:checked').value, playerTwoNode.querySelector('.symbol-toggle').firstElementChild);

    displayNameSymbol(playerOne, playerTwo);

    console.log(playerOne, playerTwo);
}

//creating instances from playerFactory
const playerFactory = (name, isHuman, difficulty, actionSymbol) => {
    if (isHuman == true) {
        difficulty = undefined;
    };

    return {name, isHuman, difficulty, actionSymbol};
};

//create IIFE for game grid
const gameGrid = () => {

}

/*test for click event
window.addEventListener('click', clicked);
function clicked(e) {
    console.log(e.target);
}
*/

playerTwoNode.querySelectorAll('input[name="is-human-2"]').forEach(input => input.addEventListener('click', toggleDifficulty));
submitBtn.addEventListener('click', displayForm);
configureBtn.addEventListener('click', toggleDisplay);
playerOneSymbols.addEventListener('click', toggleSymbolsOne);
playerTwoSymbols.addEventListener('click', toggleSymbolsTwo);