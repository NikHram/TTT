let playerFlag = 1;

let gameField = document.getElementsByClassName("cell");

let currentState = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];




for (let i = 0; i < gameField.length; i++) {
    gameField[i].addEventListener("click", () => {
        if (isActive(i) && playerFlag === 1 && !gameResult()) {
            gameField[i].classList.add("cross");
            currentState[i] = "X";
            changeTurn("Circle turn");
            gameResult();
        } else if (isActive(i) && playerFlag === 2 && !gameResult()) {
            gameField[i].classList.add("circle");
            currentState[i] = "O";
            changeTurn("Cross turn");
            gameResult();
        } else if (!isActive(i) && isTheGameEnded()) {
            printMessage("This cell is occupied");
        } else if (!isActive(i) && !isTheGameEnded()) {
            printMessage("The game has ended");
        }
    })
}

function isTheGameEnded() {
    if (currentState.some(x => x === 0)) {
        return true;
    }
}

function gameResult() {
    for (let i = 0; i < winningConditions.length; i++) {
        const winningCondition = winningConditions[i];
        let a = currentState[winningCondition[0]];
        let b = currentState[winningCondition[1]];
        let c = currentState[winningCondition[2]];

        if (a === 0 || b === 0 || c === 0) {

        } else if (a === b && b === c) {
            printMessage(`Player ${playerFlag} lost`);
            return true;
        }
    }
    return false;
}

function randomCellButton() {
    let i = randomCell(9);
    if (isActive(i) && playerFlag === 1 && !gameResult()) {
        gameField[i].classList.add("cross");
        currentState[i] = "X"
        changeTurn("Circle turn");
        gameResult();
    } else if (isActive(i) && playerFlag === 2 && !gameResult()) {
        gameField[i].classList.add("circle");
        currentState[i] = "O"
        changeTurn("Cross turn");
        gameResult();
    } else if (!isActive(i) && !isTheGameEnded()) {
        printMessage("The game has ended");
    } else if (!isTheGameEnded()) {
        randomCellButton();
    }
}

function randomCell(cellCount) {
    return Math.floor(Math.random() * cellCount);
}

function changeTurn(message) {
    printMessage(message);
    return playerFlag = 1 + (playerFlag % 2);
}

function isActive(x) {
    if (currentState[x] === 0) {
        return true;
    }
}

function printMessage(message) {
    document.querySelector(".announcements").innerHTML = message;
}

