import styled from "styled-components";

type Props = {
  title: string;
  icon?: JSX.Element;
  onClick?: () => void;
};

const ButtonStyle = styled.button`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  width: fit-content;
  padding: 6px 12px;
  margin: 3px;
  border: none;
  background: none;
  background: white;
  border: 2px solid #414141;
  box-shadow: -2px 2px 1px #414141;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  &:hover {
    background: #414141;
    color: #fff;
  }
`;

export default function Button({ title, icon, onClick }: Props): JSX.Element {
  return (
    <ButtonStyle onClick={onClick}>
      {icon}
      <span>{title}</span>
    </ButtonStyle>
  );
}
