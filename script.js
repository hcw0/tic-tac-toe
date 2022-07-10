const htmlElements = {
    board: document.querySelector(".board"),
    squares: [[document.querySelector(".square-1-1"), document.querySelector(".square-1-2"), document.querySelector(".square-1-3")], 
            [document.querySelector(".square-2-1"), document.querySelector(".square-2-2"), document.querySelector(".square-2-3")],
            [document.querySelector(".square-3-1"), document.querySelector(".square-3-2"), document.querySelector(".square-3-3")]],
    turnDisplay: document.querySelector(".turn-display"),
    square: document.querySelectorAll(".square"),
    resetButton: document.querySelector(".reset-button")
}

const Player = (sign, turn) => {
    const playerSign = sign;
    let playerTurn = turn;

    const getTurn = () => playerTurn;
    const getSign = () => playerSign;
    const toggleTurn = () => {
        if (playerTurn){
            playerTurn = false;
        } else{
            playerTurn = true;
        }
    }
    return {getSign, getTurn, toggleTurn};
}

const GameBoard = (() => {
    let board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    let occupiedSquares = 0;

    const playerX = Player("X", true);
    const playerO = Player("O", false);

    const makeMove = (row, col) => {
        if(isMoveValid(row, col)){
            player = playerTurn();
            board[row][col] = player.getSign();
            htmlElements.squares[row][col].textContent = player.getSign();
            occupiedSquares++;
            console.log(checkWinner());
        }
    }

    const isMoveValid = (row, col) => {
        if (row > 3 || row < 0 || col > 3 || col < 0 || board[row][col] != 0){
            return false;
        } else{
            return true;
        }
    }

    const playerTurn = () => {
        if (playerX.getTurn()){
            playerX.toggleTurn();
            playerO.toggleTurn();
            htmlElements.turnDisplay.textContent = playerO.getSign() + "'s turn";
            return playerX;
        } else{
            playerO.toggleTurn();
            playerX.toggleTurn();
            htmlElements.turnDisplay.textContent = playerX.getSign() + "'s turn";
            return playerO;
        }
    }

    const isGameDone = () => {
        return occupiedSquares >= 9;
    }

    const rowCheck = () => {
        for (let row = 0; row < board.length; row++){
            let firstSquare = board[row][0];
            let count = 1;
            for(let col = 1; col < board[0].length; col++){
                if (board[row][col] == firstSquare){
                    count++;
                    if (count == 3){
                        return board[row][col];
                    }
                }
            }
        }
        return "";
    }

    const colCheck = () => {
        for (let col = 0; col < board[0].length; col++){
            let firstSquare = board[0][col];
            let count = 1;
            for(let row = 1; row < board.length; row++){
                if (board[row][col] == firstSquare){
                    count++;
                    if (count == 3){
                        return board[row][col]
                    }
                }
            }
        }
        return "";
    }

    const diagCheck = () => {
        let firstSquare = board[0][0];
        let count = 1;
        for (let i = 1; i < board.length; i++){
            if (board[i][i] == firstSquare){
                count ++;
                if (count == 3){
                    return board[i][i];
                }
            }
        }
        firstSquare = board[2][0];
        count = 1;
        for (let i = board.length - 2, j = board.length - 2; i >= 0, j < board.length; i--, j++){
            console.log(i  + " " + j + " " + board[i][j])
            if(board[i][j] == firstSquare){
                count++;
                console.log(count)
                if (count == 3){
                    return board[i][j];
                }
            }
        }
        return "";
    }

    const checkWinner = () => {
        row = rowCheck();
        col = colCheck();
        diag = diagCheck();

        if (row == "" && col == "" && diag == "" && isGameDone()){
            return "Tie";
        } else{
            if(row == "X" || col == "X" || diag == "X"){
                return playerX;
            } else if (row == "O" || col == "O" || diag == "O"){
                return playerO;
            } else{
                return false;
            }
        }
    }

    const setBoard = (array) => {
        board = array;
    }

    const getBoard = () => {
        return board;
    }

    const resetGame = () => {
        htmlElements.square.forEach(element => {
            element.textContent = "";
        });
        setBoard([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    }

    return {
        makeMove, isMoveValid, isGameDone, checkWinner, playerTurn, resetGame, setBoard, getBoard,
    }
})();

for (let i = 0; i < htmlElements.squares.length; i++){
    for (let j = 0; j < htmlElements.squares[0].length; j++){
        htmlElements.squares[i][j].addEventListener("click", () => {
            GameBoard.makeMove(i, j);
        });
    }
}

htmlElements.resetButton.addEventListener("click", GameBoard.resetGame);


console.log(GameBoard.checkWinner());


