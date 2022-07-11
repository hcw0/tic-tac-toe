export const htmlElements = {
    board: document.querySelector(".board"),
    squares: [[document.querySelector(".square-1-1"), document.querySelector(".square-1-2"), document.querySelector(".square-1-3")], 
            [document.querySelector(".square-2-1"), document.querySelector(".square-2-2"), document.querySelector(".square-2-3")],
            [document.querySelector(".square-3-1"), document.querySelector(".square-3-2"), document.querySelector(".square-3-3")]],
    turnDisplay: document.querySelector(".turn-display"),
    square: document.querySelectorAll(".square"),
    resetButton: document.querySelector(".reset-button")
}