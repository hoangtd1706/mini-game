import { styled } from "styled-components";
import { CellType } from "../../services/type";

type Props = {
  cell: CellType;
  current: boolean;
  onClick: () => void;
};

const CellStyle = styled.div<{ $current: boolean }>`
  position: relative;
  display: flex;
  width: 30px;
  height: 30px;
  border-right: 1px solid #919191;
  cursor: ${({ $current }) => ($current ? "pointer" : "not-allowed")};
  &:first-child {
    border-left: 1px solid #919191;
  }
  &:hover {
    background: #f1f1f1;
  }

  &.o {
    &::before {
      position: absolute;
      content: "";
      height: 60%;
      width: 60%;
      left: 50%;
      top: 50%;
      border: 2px solid #e7a726;
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }
  }
  &.x {
    &::before {
      position: absolute;
      content: "";
      height: 68%;
      left: 50%;
      top: 50%;
      border: 1px solid #6e88c0;
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &::after {
      position: absolute;
      content: "";
      height: 68%;
      left: 50%;
      top: 50%;
      border: 1px solid #6e88c0;
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
`;

export default function Cell({ cell, current, onClick }: Props): JSX.Element {
  return (
    <CellStyle
      className={cell === "X" ? "x" : cell === "O" ? "o" : ""}
      $current={current}
      onClick={onClick}
    >
      {current}
    </CellStyle>
  );
}
