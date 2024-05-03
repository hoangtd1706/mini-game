function CheckDraw(board) {
  if (Array.isArray(board)) {
    for (let i = 0; i < board.length; i++)
      for (let j = 0; j < board[i].length; j++)
        if (board[i][j] === null) return false;
    return true;
  }
  return false;
}

function getHorizontal(board, x, y, player) {
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

function getVertical(board, x, y, player) {
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

function getRightDiagonal(board, x, y, player) {
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

function getLeftDiagonal(board, x, y, player) {
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

function CheckWin(board, x, y, player) {
  if (!Array.isArray(board) || typeof x !== "number" || typeof y !== "number")
    return false;
  return (
    getHorizontal(board, x, y, player) >= 5 ||
    getVertical(board, x, y, player) >= 5 ||
    getRightDiagonal(board, x, y, player) >= 5 ||
    getLeftDiagonal(board, x, y, player) >= 5
  );
}

module.exports = { CheckDraw, CheckWin };
