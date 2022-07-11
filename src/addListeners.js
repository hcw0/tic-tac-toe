import { GameBoard } from "./GameBoard";
import { htmlElements } from "./htmlElements";

export const addListeners = () => {
    for (let i = 0; i < htmlElements.squares.length; i++){
        for (let j = 0; j < htmlElements.squares[0].length; j++){
            htmlElements.squares[i][j].addEventListener("click", () => {
                GameBoard.makeMove(i, j);
            });
        }
    }
    
    htmlElements.resetButton.addEventListener("click", GameBoard.resetGame);
}