import { styled } from "styled-components";
import MainSudokuGame from "../components/sudoku/MainGame";

const Wrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 6px;
  width: 100%;
  height: 100%;
  clear: both;
`;

export default function Sudoku(): JSX.Element {
  return (
    <Wrap>
      <MainSudokuGame />
    </Wrap>
  );
}
