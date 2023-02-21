const boxes = document.querySelectorAll(".box");
const display = document.querySelector("#announcer");
const displayText = document.querySelector("#announcer-text");
const restart = document.querySelector("#restart");

const playerX = "X";
const playerO = "O";
let currentPlayer = playerX;

const board = Array(boxes.length);
board.fill(null);

const winConditions = [
    {condition:[1, 2, 3]}, 
    {condition:[4, 5, 6]}, 
    {condition:[7, 8, 9]}, 
    {condition:[1, 4, 7]}, 
    {condition:[2, 5, 8]}, 
    {condition:[3, 6, 9]}, 
    {condition:[1, 5, 9]}, 
    {condition:[3, 5, 7]}, 
  ];

boxes.forEach((box) => box.addEventListener("click", boxClick));


function boxClick(e) {
    if (display.classList.contains("visible")) {
      return;
    }

const box = e.target;
    const boxNumber = box.dataset.index;
        if (box.innerText != "") {
        return;
        }

  if (currentPlayer === playerX) {
    box.innerText = playerX;
    board[boxNumber - 1] = playerX;
    currentPlayer = playerO;

  } else {
    box.innerText = playerO;
    board[boxNumber - 1] = playerO;
    currentPlayer = playerX;
  }

  checkWinner();
}

function checkWinner() {

  for (const winningCombo of winConditions) {
    const {condition} = winningCombo;
    const boxValue1 = board[condition[0] - 1];
    const boxValue2 = board[condition[1] - 1];
    const boxValue3 = board[condition[2] - 1];

    if (
      boxValue1 != null &&
      boxValue1 === boxValue2 &&
      boxValue1 === boxValue3
    ) {
      gameOverScreen(boxValue1);
      return;
    }
  }

   //Check for a draw
  const allBoxFilledIn = board.every((box) => box !== null);
  if (allBoxFilledIn) {
    gameOverScreen(null);
  }
}