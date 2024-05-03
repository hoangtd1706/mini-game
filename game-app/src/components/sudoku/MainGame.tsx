import { useState } from "react";
import Cell from "./Cell";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
`;

const BoardStyle = styled.div`
  display: grid;
  width: 450px;
  margin: auto auto;
  grid-template-rows: repeat(9, 50px);
  border: 3px solid #414141;
  box-shadow: -3px 3px 1px #414141;
  overflow: hidden;
`;

const Row = styled.div`
  display: grid;
  height: 50px;
  grid-template-columns: repeat(9, 50px);
  &:nth-child(3n + 4) {
    border-top: 2px solid #919191;
  }
`;

const Numpad = styled.div`
  display: grid;
  width: 450px;
  grid-template-columns: repeat(5, 90px);
  grid-template-rows: repeat(2, 50px);
  margin: auto auto;
  border: 3px solid #414141;
  box-shadow: -3px 3px 1px #414141;
  overflow: hidden;
`;

const Num = styled.div<{ $select: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid #919191;
  font-size: 24px;
  color: #0199ff;
  cursor: pointer;
  ${({ $select }) =>
    $select
      ? `
          background: #c7d0ff;
        `
      : ""}
  &:hover {
    background: #c7d0ff;
  }
`;

type PuzzleType = number[][];

const init: PuzzleType = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

type CellType = {
  row: number;
  col: number;
  value: number;
};

export default function MainSudokuGame(): JSX.Element {
  const [board, setBoard] = useState<PuzzleType>(init);
  const [newBoard, setNewBoard] = useState<PuzzleType>(init);

  const [valueSelect, setValueSelect] = useState<number | undefined>(undefined);
  const [cellSelect, setCellSelect] = useState<CellType | undefined>(undefined);

  const handleSelectCell = (row: number, col: number, value: number) => {
    if (cellSelect !== undefined) {
      if (cellSelect.row === row && cellSelect.col === col) {
        setCellSelect(undefined);
        return;
      }
    }
    setCellSelect({
      row: row,
      col: col,
      value: value,
    });
  };

  const handleSelectValue = (value: number) => {
    if (value === 0) {
      setValueSelect(undefined);
      return;
    }

    setValueSelect(value !== valueSelect ? value : undefined);
  };

  const handleSetValueToCell = (value: number) => {
    if (cellSelect === undefined) {
      setValueSelect(value);
      return;
    } else {
      if (cellSelect.value === 0) {
        handleCellChange(cellSelect.row, cellSelect.col, value);
      }
    }
  };

  const handleCellChange = (row: number, col: number, newValue: number) => {
    const nBoard = [...newBoard];
    nBoard[row][col] = newValue;
    setNewBoard(nBoard);
  };

  return (
    <Wrap>
      <BoardStyle>
        {newBoard.map((row, rowIndex) => (
          <Row>
            {row.map((cell, colIndex) => (
              <Cell
                defaultValue={board[rowIndex][colIndex]}
                key={colIndex}
                value={cell}
                selected={
                  cellSelect !== undefined &&
                  cellSelect.row === rowIndex &&
                  cellSelect.col === colIndex
                }
                valueSelect={valueSelect}
                onChange={() => {
                  const defaultValue = board[rowIndex][colIndex];
                  if (defaultValue !== 0) {
                    handleSelectValue(defaultValue);
                  } else {
                    handleSelectCell(rowIndex, colIndex, defaultValue);
                  }
                }}
              />
            ))}
          </Row>
        ))}
      </BoardStyle>
      <Numpad>
        <Num
          $select={valueSelect === 1}
          onClick={() => handleSetValueToCell(1)}
        >
          {(cellSelect === undefined || cellSelect.value === 0) && "1"}
        </Num>
        <Num
          $select={valueSelect === 2}
          onClick={() => handleSetValueToCell(2)}
        >
          {(cellSelect === undefined || cellSelect.value === 0) && "2"}
        </Num>
        <Num
          $select={valueSelect === 3}
          onClick={() => handleSetValueToCell(3)}
        >
          {(cellSelect === undefined || cellSelect.value === 0) && "3"}
        </Num>
        <Num
          $select={valueSelect === 4}
          onClick={() => handleSetValueToCell(4)}
        >
          {(cellSelect === undefined || cellSelect.value === 0) && "4"}
        </Num>
        <Num
          $select={valueSelect === 5}
          onClick={() => handleSetValueToCell(5)}
        >
          {(cellSelect === undefined || cellSelect.value === 0) && "5"}
        </Num>
        <Num
          $select={valueSelect === 6}
          onClick={() => handleSetValueToCell(6)}
        >
          {(cellSelect === undefined || cellSelect.value === 0) && "6"}
        </Num>
        <Num
          $select={valueSelect === 7}
          onClick={() => handleSetValueToCell(7)}
        >
          {(cellSelect === undefined || cellSelect.value === 0) && "7"}
        </Num>
        <Num
          $select={valueSelect === 8}
          onClick={() => handleSetValueToCell(8)}
        >
          {(cellSelect === undefined || cellSelect.value === 0) && "8"}
        </Num>
        <Num
          $select={valueSelect === 9}
          onClick={() => handleSetValueToCell(9)}
        >
          {(cellSelect === undefined || cellSelect.value === 0) && "9"}
        </Num>
        <Num
          $select={valueSelect === 100}
          onClick={() => handleSetValueToCell(0)}
        >
          0
        </Num>
      </Numpad>
    </Wrap>
  );
}
