import styled from "styled-components";

type Props = {
  title: string;
  content: JSX.Element | JSX.Element[];
  footer: JSX.Element[];
  open: boolean;
  onClose: () => void;
};

const Wrap = styled.div<{ open: boolean }>`
  position: absolute;
  display: ${({ open }) => (open ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 998;
`;

const Overlay = styled.div`
  position: absolute;
  display: block;
  content: "";
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #414141;
  opacity: 0.85;
  z-index: 999;
`;

const Main = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 8px;
  max-width: 380px;
  width: 100%;
  margin: 10px;
  padding: 16px;
  background: #fff;
  z-index: 1000;
`;

const Title = styled.div``;

const Content = styled.div``;

export default function Modal({
  title,
  content,
  footer,
  open,
  onClose,
}: Props) {
  return (
    <Wrap open={open}>
      <Overlay onClick={onClose} />
      <Main>
        <Title>{title}</Title>
        <Content>{content}</Content>
      </Main>
    </Wrap>
  );
}
