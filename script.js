const players = (name, marker) => {
    return {
        name, marker
    }
}

const game = (() => {
    const playerMode = document.getElementById("btn-playermode");
    const restart = document.getElementById("btn-restart");

    let defaultMode = "PLAYER"
    let player1Turn = true;
    let turns = document.getElementById("turns");
    let turnCounts = 8;

    let player1Numbers = [];
    let player2Numbers = [];

    if (defaultMode === "PLAYER") {
        playerMode.style.backgroundColor = "black";
        playerMode.style.color = "#DEDEDE"
    }

    const player1 = players("PLAYER1", "X");
    const player2 = players("PLAYER2", "O");

    const gameboard = document.querySelectorAll("#game");
    gameboard.forEach(pressedSquare => pressedSquare.addEventListener("click", (e) => {
        //can't press the same box if it already have one
        if (!e.target.hasChildNodes()) {
            if (player1Turn) {
                let createMarker = document.createElement("span");
                createMarker.textContent = player1.marker;
                e.target.appendChild(createMarker);
                turns.textContent = `${player2.name}'S TURN`
                player1Turn = false;
                let pick = parseInt(e.target.getAttribute("value"));
                player1Numbers.push(pick);
                gameBoard.compareNumbers(player1Numbers, player1.name);
                gameBoard.reduceTurnCounts(turnCounts--);
            }
            else {
                let createMarker = document.createElement("span");
                createMarker.textContent = player2.marker;
                e.target.appendChild(createMarker);
                turns.textContent = `${player1.name}'S TURN`
                player1Turn = true;
                let pick = parseInt(e.target.getAttribute("value"));
                player2Numbers.push(pick);
                gameBoard.compareNumbers(player2Numbers, player2.name);
                gameBoard.reduceTurnCounts(turnCounts--);
            }
        }
    }));

    const reset = () => {
        turnCounts = 8;
        turns.textContent = `${player1.name}'S TURN`
        player1Turn = true;
    }

    return {
        player1, player1Numbers,
        player2, player2Numbers,
        turnCounts, player1Turn, 
        restart, gameboard,
        reset
    }
})();

const gameBoard = (() => {
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

    //for modal
    const modal = document.getElementById("winner-modal");
    const modalHeader = document.getElementById("header");
    const tryAgainBtn = document.getElementById("try-again-btn");


    //will check if either the players contain each array of the winning conditions
    const compareNumbers = (pNumbers, pName) => {
        for (let i = 0; i < winningConditions.length; i++) {
            let currentWinConArray = winningConditions[i];
            let playerCurrentArray = pNumbers;

            //if the player's array matches any of the winning conditions. player wins
            if (currentWinConArray.every(ai => playerCurrentArray.includes(ai))) {
                modal.style.display = "flex";
                modalHeader.textContent = `${pName} WINS!`;
            }
        }

    }

    const reduceTurnCounts = count => {
        game.turnCounts = count;
        if(count === 0){
            modal.style.display = "flex";
            modalHeader.textContent = "TIE!"
        }
    }

    const restartGame = () => {
        game.player1Numbers.length = 0;
        game.player2Numbers.length = 0;
        game.reset();
        modal.style.display = "none";
        modalHeader.textContent = ""
        game.gameboard.forEach(squares => {
            let parentBox = squares.children; 
            for(let i = 0; i < squares.children.length; i++){
                if(parentBox[i].hasChildNodes()){
                    while(parentBox[i].firstChild){
                        parentBox[i].removeChild(parentBox[i].firstChild);
                    }
                }
            }
        });
    }

    tryAgainBtn.addEventListener("click", restartGame);
    game.restart.addEventListener("click", restartGame);

    return {
        compareNumbers, reduceTurnCounts
    }
})()