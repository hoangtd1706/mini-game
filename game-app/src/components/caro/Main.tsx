import { styled } from "styled-components";
import { CellType } from "../../services/type";
import Cell from "./Cell";
import Row from "./Row";
import { socket } from "../../services/socket";

type Props = {
  board: CellType[][];
  player: string;
  currentPlayer: string;
};

const Wrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  border: 2px solid #414141;
  box-shadow: -3px 3px 1px #414141;
  overflow: auto;
  clear: both;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function MainCaroGame({
  board,
  player,
  currentPlayer,
}: Props): JSX.Element {
  const handleCellClick = (row: number, col: number) => {
    if (currentPlayer === player)
      socket.emit("add_stroke", {
        x: row,
        y: col,
        player: player,
      });
    // if (player === undefined) return;
    // // if (currentPlayer !== player) return;
    // if (!board[row][col]) {
    //   const newBoard = board.map((row) => [...row]);
    //   newBoard[row][col] = player;
    //   setBoard(newBoard);
    //   setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    //   if (caroUtil.CheckWin(newBoard, row, col, player)) {
    //     setWinner(player);
    //   }
    // }
  };

  return (
    <Wrap>
      {board.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((cell, cIndex) => (
            <Cell
              key={cIndex}
              cell={cell}
              current={player === currentPlayer}
              onClick={() => handleCellClick(rowIndex, cIndex)}
            />
          ))}
        </Row>
      ))}
    </Wrap>
  );
}
