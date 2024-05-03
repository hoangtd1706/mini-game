import React from "react";
import styled from "styled-components";

const Wrap = styled.div<{
  $readonly: boolean;
  $selected: boolean;
  $valueSelect: boolean;
}>`
  display: flex;
  width: 100%;
  height: 100%;
  background: ${({ $readonly, $selected }) =>
    $readonly ? "#daedf8" : $selected ? "#d0ffcb" : "#fff"};
  font-weight: ${({ $readonly }) => ($readonly ? 600 : 400)};
  font-size: 24px;
  color: ${({ $readonly }) => ($readonly ? "#0199ff" : "#414141")};
  border: 1px solid #f1f1f1;
  cursor: pointer;
  ${({ $valueSelect }) =>
    $valueSelect
      ? `
          background: #c7d0ff;
        `
      : ""}
  span {
    margin: auto auto;
  }
  &:hover {
    background: #f1f1f1;
  }
  &:nth-child(3n + 4) {
    border-left: 2px solid #919191;
  }
`;

type Props = {
  defaultValue: number | 0;
  value: number | 0;
  valueSelect?: number;
  selected: boolean;
  onChange: () => void;
};

export default function Cell({
  defaultValue,
  value,
  selected = false,
  valueSelect,
  onChange,
}: Props): JSX.Element {
  const readOnly = defaultValue !== 0;
  return (
    <Wrap
      $selected={selected}
      $valueSelect={value === valueSelect}
      $readonly={readOnly}
      onClick={onChange}
    >
      <span>{value !== 0 ? value : ""}</span>
    </Wrap>
  );
}
