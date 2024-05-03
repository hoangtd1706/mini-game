import { styled } from "styled-components";
import Header from "../components/app/Header";
import { Outlet } from "react-router-dom";

const Style = {
  Wrap: styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    height: 100%;
    overflow: hidden;
  `,
  Header: styled.div`
    width: 100%;
    height: 32px;
  `,
  User: styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  `,
  GameArea: styled.div`
    display: block;
    width: 100%;
    height: calc(100% - 32px);
    padding: 3px;
  `,
};

export default function AppLayout(): JSX.Element {
  return (
    <Style.Wrap>
      <Style.Header>
        <Header />
      </Style.Header>
      <Style.GameArea>
        <Outlet />
      </Style.GameArea>
    </Style.Wrap>
  );
}
