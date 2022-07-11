import { Player } from "./Player"
import { htmlElements } from "./htmlElements";

export const GameBoard = (() => {
    let board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    let occupiedSquares = 0;
    let gameFinished = false;

    const playerX = Player("X", true);
    const playerO = Player("O", false);

    const makeMove = (row, col) => {
        if (isGameDone()){
        } else if (gameFinished){

        } else if(isMoveValid(row, col)){
            let player = playerTurn();
            board[row][col] = player.getSign();
            htmlElements.squares[row][col].textContent = player.getSign();
            occupiedSquares++;
            if (checkWinner() != false){
                gameFinished = true;
                let winner = checkWinner();
                if (winner == "Tie"){
                    htmlElements.turnDisplay.textContent = "Tie!"
                } else{
                    htmlElements.turnDisplay.textContent = "Player" + " " + winner.getSign() + " wins";
                }
            }
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
            if (firstSquare != 0){
                for(let col = 1; col < board[0].length; col++){
                    if (board[row][col] == firstSquare){
                        count++;
                        if (count == 3){
                            return board[row][col];
                        }
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
            if(firstSquare != 0){
                for(let row = 1; row < board.length; row++){
                    if (board[row][col] == firstSquare){
                        count++;
                        if (count == 3){
                            return board[row][col]
                        }
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
            if (firstSquare != 0){
                if (board[i][i] == firstSquare){
                    count ++;
                    if (count == 3){
                        return board[i][i];
                    }
                }
            }
        }
        firstSquare = board[2][0];
        count = 1;
        for (let i = board.length - 2, j = board.length - 2; i >= 0, j < board.length; i--, j++){
            if (firstSquare != 0){
                if(board[i][j] == firstSquare){
                    count++;
                    if (count == 3){
                        return board[i][j];
                    }
                }
            }
        }
        return "";
    }

    const checkWinner = () => {
        let row = rowCheck();
        let col = colCheck();
        let diag = diagCheck();

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

    const setOccupiedSquares = number => {
        occupiedSquares = number;
    }

    const getBoard = () => {
        return board;
    }

    const getOccupiedSquares = () => {
        return occupiedSquares;
    }

    const resetGame = () => {
        htmlElements.square.forEach(element => {
            element.textContent = "";
        });
        setBoard([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
        setOccupiedSquares(0);
        htmlElements.turnDisplay.textContent = "X's turn"
        playerX.setTurn(true);
        playerO.setTurn(false);
        gameFinished = false;
    }

    return {
        makeMove, isMoveValid, isGameDone, checkWinner, playerTurn, resetGame, 
        setBoard, getBoard, setOccupiedSquares, getOccupiedSquares, rowCheck, diagCheck, colCheck,
    }
})();