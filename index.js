/**
 * This program is a boilerplate code for the standard tic tac toe game
 * Here the “box” represents one placeholder for either a “X” or a “0”
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 *
 * Below are the tasks which needs to be completed:
 * Imagine you are playing with the computer so every alternate move should be done by the computer
 * X -> player
 * O -> Computer
 *
 * Winner needs to be decided and has to be flashed
 *
 * Extra points will be given for approaching the problem more creatively
 *
 */

const grid = [];
const GRID_LENGTH = 3;
const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let turn;

function initializeGrid() {
  grid.splice(0, grid.length);
  for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
    const tempArray = [];
    for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
      tempArray.push(0);
    }
    grid.push(tempArray);
  }
}

function makeComputerMove() {
  let currentBoard = grid[0].concat(...grid.slice(1));

  const vacantSquares = currentBoard.reduce((acc, curr, index) => {
    if (curr === 0) {
      acc.push(index);
    }
    return acc;
  }, []);

  const choice = Math.floor(Math.random() * vacantSquares.length);

  grid[Math.floor(vacantSquares[choice] / 3)][vacantSquares[choice] % 3] = 2;
}

function getRowBoxes(colIdx) {
  let rowDivs = "";

  for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
    let additionalClass = "darkBackground";
    let content = "";
    const sum = colIdx + rowIdx;
    if (sum % 2 === 0) {
      additionalClass = "lightBackground";
    }
    const gridValue = grid[colIdx][rowIdx];
    if (gridValue === 1) {
      content = '<span class="cross">X</span>';
    } else if (gridValue === 2) {
      content = '<span class="cross">O</span>';
    }
    rowDivs =
      rowDivs +
      '<div colIdx="' +
      colIdx +
      '" rowIdx="' +
      rowIdx +
      '" class="box ' +
      additionalClass +
      '">' +
      content +
      "</div>";
  }
  return rowDivs;
}

function getColumns() {
  let columnDivs = "";
  for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
    let coldiv = getRowBoxes(colIdx);
    coldiv = '<div class="rowStyle">' + coldiv + "</div>";
    columnDivs = columnDivs + coldiv;
  }
  return columnDivs;
}

function renderMainGrid() {
  const parent = document.getElementById("grid");
  const columnDivs = getColumns();
  parent.innerHTML = '<div class="columnsStyle">' + columnDivs + "</div>";
}

function onBoxClick() {
  const rowIdx = this.getAttribute("rowIdx");
  const colIdx = this.getAttribute("colIdx");

  if (!grid[colIdx][rowIdx] && !getWinner()) {
    grid[colIdx][rowIdx] = turn;
    const winner = getWinner();

    if (winner) {
      const winnerName = winner === 1 ? "X" : "O";
      renderMainGrid();
      renderGameStatus("Player " + winnerName + " wins");
    } else if (winner === 0) {
      renderMainGrid();
      renderGameStatus("Its a tie !");
    } else {
      changePlayer();
      renderMainGrid();
      addClickHandlers();
    }
  }
}

function changePlayer() {
  if (turn === 1) {
    turn = 1;
    makeComputerMove();
    const winner = getWinner();
    if (winner) {
      const winnerName = winner === 1 ? "X" : "O";
      renderMainGrid();
      renderGameStatus("Player " + winnerName + " wins");
    }
  } else {
    turn = 2;
  }
}

function renderGameStatus(statusText) {
  const gameStatusH2 = document.getElementById("game-status");
  gameStatusH2.innerHTML = statusText;
}

function addClickHandlers() {
  let boxes = document.getElementsByClassName("box");
  for (let idx = 0; idx < boxes.length; idx++) {
    boxes[idx].addEventListener("click", onBoxClick, false);
  }
}

function getWinner() {
  let currentBoard = grid[0].concat(...grid.slice(1));

  for (let i = 0; i < winningPositions.length; i++) {
    const [first, second, third] = winningPositions[i];
    if (
      currentBoard[first] &&
      currentBoard[first] === currentBoard[second] &&
      currentBoard[first] === currentBoard[third]
    ) {
      return currentBoard[first];
    }
  }

  if (currentBoard.join("").indexOf(0) === -1) {
    return 0;
  }
  return null;
}

function init() {
  turn = 1;
  initializeGrid();
  renderMainGrid();
  addClickHandlers();
}

init();
