const players = (name, marker) => {
    return{
        name, marker
    }
}

const game = (() => {
    let playerMode = document.getElementById("btn-playermode");
    let restart = document.getElementById("btn-restart");

    let defaultMode = "PLAYER"
    let player1Turn = true;
    let turns = document.getElementById("turns");
    let turnCounts = 9;

    let player1Numbers = [];
    let player2Numbers = [];

    if(defaultMode === "PLAYER"){
        playerMode.style.backgroundColor = "black";
        playerMode.style.color = "#DEDEDE"
    }

    const player1 = players("PLAYER1", "X");
    const player2 = players("PLAYER2", "O");

    const gameboard = document.querySelectorAll("#game");
    gameboard.forEach(pressedSquare => pressedSquare.addEventListener("click", (e) => {
        //console.log(e.target.getAttribute("value"));
        if(!e.target.hasChildNodes()){
            if(player1Turn){
                let createMarker = document.createElement("span");
                createMarker.textContent = player1.marker;
                e.target.appendChild(createMarker);
                turns.textContent = `${player2.name}'S TURN`
                player1Turn = false;
                let pick = parseInt(e.target.getAttribute("value"));
                player1Numbers.push(pick);
                gameBoard.compareNumbers(player1Numbers);
            }
            else{
                let createMarker = document.createElement("span");
                createMarker.textContent = player2.marker;
                e.target.appendChild(createMarker);
                turns.textContent = `${player1.name}'S TURN`
                player1Turn = true;
                let pick = parseInt(e.target.getAttribute("value"));
                player2Numbers.push(pick);
                gameBoard.compareNumbers(player2Numbers);
            }
        }
    }));

    return{
        player1, player1Numbers,
        player2, player2Numbers,
        turnCounts, player1Turn
    }
})();

const gameBoard = (() => {
    const winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    /*
    //TODO match the player 1 or 2 playerNumbers.
    for(let i = 0; i < winningConditions.length; i++){
        //console.log(winningConditions[i][j].includes());
        let currentArray = winningConditions[i];
        console.log(currentArray);
        if(currentArray.includes(game.player1Numbers)){
            
        }
    }
    */
   const compareNumbers = (pNumbers) => {
    for(let i = 0; i < winningConditions.length; i++){
        //console.log(winningConditions[i][j].includes());
        let currentWinConArray = winningConditions[i];
        let playerCurrentArray = pNumbers;
        //console.log(playerCurrentArray.includes(currentWinConArray));

        if(currentWinConArray.every(ai => playerCurrentArray.includes(ai))){
            console.log(playerCurrentArray);
            console.log(currentWinConArray);
        }
    }
   }
   return{
    compareNumbers
   }
})()