import { CellType } from "../services/type";

function CheckDraw(board: CellType[][]) {
  for (let i = 0; i < board.length; i++)
    for (let j = 0; j < board[i].length; j++)
      if (board[i][j] === null) return false;
  return true;
}

function getHorizontal(
  board: CellType[][],
  x: number,
  y: number,
  player: CellType
): number {
  let count = 1;
  for (let i = 1; i < 5; i++)
    if (y + i < board[0].length && board[x][y + i] === player) {
      count++;
    } else {
      break;
    }

  for (let i = 1; i < 5; i++)
    if (y - 1 >= 0 && y - 1 < board[0].length && board[x][y - i] === player) {
      count++;
    } else {
      break;
    }

  return count;
}

function getVertical(
  board: CellType[][],
  x: number,
  y: number,
  player: CellType
): number {
  let count = 1;
  for (let i = 1; i < 5; i++)
    if (x + i < board.length && board[x + i][y] === player) {
      count++;
    } else {
      break;
    }

  for (let i = 1; i < 5; i++)
    if (x - i >= 0 && x - i < board.length && board[x - i][y] === player) {
      count++;
    } else {
      break;
    }

  return count;
}

function getRightDiagonal(
  board: CellType[][],
  x: number,
  y: number,
  player: CellType
): number {
  let count = 1;

  for (let i = 1; i < 5; i++)
    if (
      x - i >= 0 &&
      x - i < board.length &&
      y + i < board[0].length &&
      board[x - i][y + i] === player
    ) {
      count++;
    } else {
      break;
    }

  for (let i = 1; i < 5; i++)
    if (
      x + i < board.length &&
      y - i >= 0 &&
      y - i < board[0].length &&
      board[x + i][y - i] === player
    ) {
      count++;
    } else {
      break;
    }

  return count;
}

function getLeftDiagonal(
  board: CellType[][],
  x: number,
  y: number,
  player: CellType
): number {
  let count = 1;

  for (let i = 1; i < 5; i++)
    if (
      x - i >= 0 &&
      x - i < board.length &&
      y - i >= 0 &&
      y - i < board[0].length &&
      board[x - i][y - i] === player
    ) {
      count++;
    } else {
      break;
    }

  for (let i = 1; i < 5; i++)
    if (
      x + 1 < board.length &&
      y + 1 < board[0].length &&
      board[x + i][y + i] === player
    ) {
      count++;
    } else {
      break;
    }

  return count;
}

function CheckWin(
  board: CellType[][],
  x: number,
  y: number,
  player: CellType
): boolean {
  return (
    getHorizontal(board, x, y, player) >= 5 ||
    getVertical(board, x, y, player) >= 5 ||
    getRightDiagonal(board, x, y, player) >= 5 ||
    getLeftDiagonal(board, x, y, player) >= 5
  );
}

const caroUtil = { CheckDraw, CheckWin };

export default caroUtil;
