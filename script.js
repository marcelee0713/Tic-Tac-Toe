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
            }
            else{
                let createMarker = document.createElement("span");
                createMarker.textContent = player2.marker;
                e.target.appendChild(createMarker);
                turns.textContent = `${player1.name}'S TURN`
                player1Turn = true;
            }
        }
    }));
})();

