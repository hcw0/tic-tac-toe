const htmlElements = {
    board: document.querySelector(".board"),
    squares: [[document.querySelector(".square-1-1"), document.querySelector(".square-1-2"), document.querySelector(".square-1-3")], 
            [document.querySelector(".square-2-1"), document.querySelector(".square-2-2"), document.querySelector(".square-2-3")],
            [document.querySelector(".square-3-1"), document.querySelector(".square-3-2"), document.querySelector(".square-3-3")]]
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
    const board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    let occupiedSquares = 0;

    const playerX = Player("X", true);
    const playerO = Player("O", false);

    const makeMove = (row, col) => {
        if(isMoveValid(row, col)){
            player = playerTurn();
            board[row][col] = player.getSign();
            htmlElements.squares[row][col].textContent = player.getSign();
            occupiedSquares++;
        }
        if (isGameDone()){
            const winner = checkWinner();
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
            return playerX;
        } else{
            playerO.toggleTurn();
            playerX.toggleTurn();
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
        count = 1
        for (let i = board.length - 2; i >= 0; i--){
            if(board[i][i] == firstSquare){
                count++;
                if (count == 3){
                    return board[i][i];
                }
            }
        }
        return "";
    }

    const checkWinner = () => {
        row = rowCheck();
        col = colCheck();
        diag = diagCheck();

        if (row == "" && col == "" && diag == ""){
            return "Tie";
        } else{
            if(row == "X" || col == "X" || diag == "X"){
                return playerX;
            } else{
                return playerO;
            }
        }
    }

    return {
        makeMove, isMoveValid, isGameDone, checkWinner, playerTurn
    }
})();

for (let i = 0; i < htmlElements.squares.length; i++){
    for (let j = 0; j < htmlElements.squares[0].length; j++){
        htmlElements.squares[i][j].addEventListener("click", () => {
            GameBoard.makeMove(i, j);
        });
    }
}


console.log(GameBoard.checkWinner());


