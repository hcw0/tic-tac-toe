export const Player = (sign, turn) => {
    const playerSign = sign;
    let playerTurn = turn;

    const getTurn = () => playerTurn;
    const getSign = () => playerSign;

    const setTurn = newTurn => playerTurn = newTurn;
    const toggleTurn = () => {
        if (playerTurn){
            playerTurn = false;
        } else{
            playerTurn = true;
        }
    }
    return {getSign, getTurn, toggleTurn, setTurn};
}
