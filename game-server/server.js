const express = require("express");
const http = require("http");
const fs = require("fs");
const caroUtil = require("./caro.util");

const port = 9000;
const app = express();
const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const clients = [];

function InitialBoard(player, customId, otherId) {
  let boardJson = {
    board: [],
    currentPlayer: "X",
    players: {
      X: "",
      O: "",
    },
  };

  boardJson.board = Array.from({ length: 60 }).map((_) =>
    Array.from({ length: 60 }).map((_) => null)
  );
  if (player === "X") {
    boardJson.players = {
      X: customId,
      O: otherId,
    };
  }

  if (player === "O") {
    boardJson.players = {
      X: otherId,
      O: customId,
    };
  }
  var json = JSON.stringify(boardJson);
  fs.writeFileSync("caro.data.json", json, "utf8", (err) => console.log(err));
  return boardJson;
}

function GetBoard() {
  let boardJson = JSON.parse(fs.readFileSync("caro.data.json", "utf8"));
  return boardJson;
}

function NewBoard(board) {
  var json = JSON.stringify(board);
  fs.writeFileSync("caro.data.json", json, "utf8", (err) => console.log(err));
  return board;
}

function SendUsers(socket) {
  socket.emit("users", {
    code: 200,
    data: clients,
  });
}

function SendBoard(socket) {
  try {
    let boardJson = JSON.parse(fs.readFileSync("caro.data.json", "utf8"));
    socket.emit("board", {
      code: 200,
      data: boardJson,
    });
  } catch (error) {
    socket.emit("board", {
      code: 200,
      data: null,
    });
  }
}

socketIo.on("connection", (socket) => {
  socket.on("storeClientInfo", (data) => {
    if (clients.length < 2) {
      var clientInfo = new Object();
      clientInfo.customId = data.customId;
      clientInfo.customName = data.customName;
      clientInfo.clientId = socket.id;
      clients.push(clientInfo);
      socket.emit("storeClientInfo", {
        code: 200,
        data: clientInfo,
      });
      SendUsers(socketIo);
    } else {
      socket.emit("storeClientInfo", {
        code: 200,
        msg: "Max 2 client connect to server",
      });
    }
  });

  socket.on("getUsers", () => {
    SendUsers(socketIo);
  });

  socket.on("new_game", (data) => {
    var newBoard = InitialBoard(data.player, data.customId, data.otherId);
    socketIo.emit("board", {
      code: 200,
      data: newBoard,
    });
  });

  socket.on("board", () => {
    SendBoard(socketIo);
  });

  socket.on("add_stroke", (data) => {
    let board = GetBoard();
    board.board[data.x][data.y] = data.player;
    board.currentPlayer = data.player === "X" ? "O" : "X";
    let newBoard = NewBoard(board);
    socketIo.emit("board", {
      code: 200,
      data: newBoard,
    });

    if (caroUtil.CheckDraw(newBoard.board)) {
      socketIo.emit("draw_board");
    }

    if (caroUtil.CheckWin(newBoard.board, data.x, data.y, data.player)) {
      socketIo.emit("win_board", {
        code: 200,
        data: data.player,
      });
    }
  });

  socket.on("disconnect", (data) => {
    for (var i = 0, len = clients.length; i < len; ++i) {
      var c = clients[i];
      if (c.clientId == socket.id) {
        clients.splice(i, 1);
        SendUsers(socketIo);
        break;
      }
    }
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
