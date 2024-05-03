import styled from "styled-components";
import { useAppContext } from "../../contexts/app.context";
import { useNavigate } from "react-router-dom";

const Wrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 8px;
  border-bottom: 2px solid #414141;
`;

const ButtonBack = styled.button`
  position: relative;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  color: #414141;
  text-transform: capitalize;
  border: 2px solid transparent;
  background: transparent;
  overflow: hidden;
  transition: all 0.2s linear 0s;
  cursor: pointer;

  &:hover {
    padding-left: 3px;
    border-left: 2px solid #414141;
  }
`;

const Profile = styled.div<{ $connected: boolean }>`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  gap: 6px;
  &::before {
    position: absolute;
    display: block;
    content: "";
    left: -9px;
    top: 50%;
    width: 6px;
    height: 6px;
    background: ${({ $connected }) =>
      $connected !== false ? "#00cc00" : "orange"};
    border-radius: 50%;
    transform: translateY(-50%);
    z-index: 100;
  }
`;

export default function Header(): JSX.Element {
  const navigate = useNavigate();
  const { client, isConnected } = useAppContext();

  return (
    <Wrap>
      <ButtonBack onClick={() => navigate("/")}>Back</ButtonBack>
      <Profile $connected={isConnected}>{client?.customName}</Profile>
    </Wrap>
  );
}
