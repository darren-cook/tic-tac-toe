
const gameBoard = (() => {
    const gameArray = ["","","","","","","","",""];
    const boxes = document.querySelectorAll(".box");
 
    const changeArray = (player, index) => {
        if (gameArray[index] === "") {
            gameArray[index] = player;
            _changeDisplay(player, index);
            gameFlow.changePlayer();
            _checkWinner();
            gameFlow.botEasy();
        } else {
            // break
        }
    }
    const _changeDisplay = (player, index) => {
        boxes[index].textContent = player;
    }
    const resetDisplay = () => {
        gameArray.forEach((box, index)=>{
            gameArray[index] = "";
            _changeDisplay("", index);
        })
    }
    const _checkWinner = () => {
        // rows
        if(gameArray[0] != "" && gameArray[0]===gameArray[1] && gameArray[0]===gameArray[2]){
            displayController.winner(gameArray[0]);
            return;
        }
        if(gameArray[3] != "" && gameArray[3]===gameArray[4] && gameArray[3]===gameArray[5]){
            displayController.winner(gameArray[3]);
            return;
        }
        if(gameArray[6] != "" && gameArray[6]===gameArray[7] && gameArray[6]===gameArray[8]){
            displayController.winner(gameArray[6]);
            return;
        }
        // columns
        if(gameArray[0] != "" && gameArray[0]===gameArray[3] && gameArray[0]===gameArray[6]){
            displayController.winner(gameArray[0]);
            return;
        }
        if(gameArray[1] != "" && gameArray[1]===gameArray[4] && gameArray[1]===gameArray[7]){
            displayController.winner(gameArray[1]);
            return;
        }
        if(gameArray[2] != "" && gameArray[2]===gameArray[5] && gameArray[2]===gameArray[8]){
            displayController.winner(gameArray[2]);
            return;
        }
        // diags
        if(gameArray[0] != "" && gameArray[0]===gameArray[4] && gameArray[0]===gameArray[8]){
            displayController.winner(gameArray[0]);
            return;
        }
        if(gameArray[2] != "" && gameArray[2]===gameArray[4] && gameArray[2]===gameArray[6]){
            displayController.winner(gameArray[2]);
            return;
        }
        if(gameArray[0] != "" && gameArray[1] != "" && gameArray[2] != "" && gameArray[3] != "" && gameArray[4] != "" && gameArray[5] != "" && gameArray[6] != "" && gameArray[7] != "" && gameArray[8] != ""){
            displayController.winner("draw");
            return;
        }
    }
    const moveBotEasy = () => {
        let emptyBoxes = []
        gameArray.forEach((box, index)=>{
            if(box==""){
                emptyBoxes.push(index)
            }
        })
        randomBox = emptyBoxes[Math.floor(Math.random() * (emptyBoxes.length-1))]
        changeArray("o", randomBox);
    }
    return {
        changeArray,
        resetDisplay,
        moveBotEasy,
    }
})();

const gameFlow = (() => {
    const boxes = document.querySelectorAll(".box");
    let currentPlayer = document.querySelector(".selected");
    let opponent = ""

    boxes.forEach(box => {
        box.addEventListener("click", function(){
            gameBoard.changeArray(currentPlayer.id, this.id[this.id.length-1])
        })
    })
    const changePlayer = () => {
        if (currentPlayer.id == "x") {
            displayController.toPlayerO();
            currentPlayer = document.querySelector(".selected");
        } else {
            displayController.toPlayerX();
            currentPlayer = document.querySelector(".selected");
        }
    }
    const closeBoxes = () => {
        boxes.forEach(box => {
            box.style.pointerEvents = "none";
        opponent = "";
        })       
    }
    const openBoxes = () => {
        opponent = document.querySelector("input[name='opponent']:checked");
        boxes.forEach(box => {
            box.style.pointerEvents = "auto";
        })       
    }
    const setOpponent = (opp) => {
        opponent = opp;
    }
    const setCurrent = (current) => {
        currentPlayer = current;
    }
    const botEasy = () => {
        if(currentPlayer.id=="o" && opponent.value=="botEasy"){
            gameBoard.moveBotEasy();
        }
    }
    return {
        changePlayer,
        closeBoxes,
        openBoxes,
        setOpponent,
        botEasy,
        setCurrent,
    }
})();

const displayController = (() => {
    const player = document.querySelector("#player");
    const botEasy = document.querySelector("#botEasy");
    const botHard = document.querySelector("#botHard");
    const start = document.querySelector("#start");
    const reset = document.querySelector("#reset");
    const setup = document.querySelector(".setup");
    const main = document.querySelector(".main");
    const x = document.querySelector("#x");
    const o = document.querySelector("#o");
    const playerXMove = document.querySelector("#playerXMove");
    const playerOMove = document.querySelector("#playerOMove");
    const xRecord = document.querySelector("#xRecord");
    const oRecord = document.querySelector("#oRecord");
    const playerXRecord = [0, 0, 0];
    const playerORecord = [0, 0, 0];
    let firstToMove = "x";

    start.addEventListener("click", function(){
        _displayStart();
        gameFlow.setOpponent(document.querySelector("input[name='opponent']:checked"))
    })

    reset.addEventListener("click", function(){
        _displayReset();
        gameFlow.setOpponent(document.querySelector("input[name='opponent']:checked"));
        gameFlow.setCurrent(document.querySelector(".selected"));
        gameFlow.botEasy();
    })
    
    const _displayStart = () => {
        setup.style.display = "none";
        start.style.display = "none";
        main.style.display = "flex";
    }

    const _displayReset = () => {
        reset.style.display = "none";
        playerXMove.textContent = "Your Move";
        playerOMove.textContent = "Your Move";
        gameFlow.openBoxes();
        gameBoard.resetDisplay();
        if (firstToMove == "x") {
            toPlayerO();
            firstToMove = "o";
        } else {
            toPlayerX();
            firstToMove = "x";
        }
    }

    const toPlayerO = () => {
        playerXMove.style.display = "none";
        playerOMove.style.display = "flex";
        x.classList.remove("selected");
        x.classList.add("unselected");
        o.classList.remove("unselected");
        o.classList.add("selected");
    }
    const toPlayerX = () => {
        playerXMove.style.display = "flex";
        playerOMove.style.display = "none";
        x.classList.remove("unselected");
        x.classList.add("selected");
        o.classList.remove("selected");
        o.classList.add("unselected");
    }
    const winner = (player) => {
        if (player === "x") {
            toPlayerX();
            playerXMove.textContent = "Winner!";
            playerXRecord[0] ++;
            playerORecord[1] ++;
            _endScreen();
        } if(player === "o") {
            toPlayerO();
            playerOMove.textContent = "Winner!"
            playerORecord[0] ++;
            playerXRecord[1] ++;
            _endScreen();
        } if(player === "draw"){
            playerXMove.style.display = "flex";
            playerOMove.style.display = "flex";
            x.classList.remove("selected");
            x.classList.add("unselected");
            o.classList.remove("selected");
            o.classList.add("unselected");   
            playerXMove.textContent = "Draw!";
            playerOMove.textContent = "Draw!"
            playerXRecord[2] ++;
            playerORecord[2] ++;  
            _endScreen(); 
        }
    }
    const _endScreen = () => {
         reset.style.display = "inline-block";
         xRecord.textContent = `${playerXRecord[0]}-${playerXRecord[1]}-${playerXRecord[2]}`
         oRecord.textContent = `${playerORecord[0]}-${playerORecord[1]}-${playerORecord[2]}`
         gameFlow.closeBoxes();
    }
    return {
        toPlayerO,
        toPlayerX,
        winner,
    }
})();

