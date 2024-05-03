import { styled } from "styled-components";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const RowStyle = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: fit-content;
  width: fit-content;
  border-bottom: 1px solid #919191;
  &:first-child {
    border-top: 1px solid #919191;
  }
`;

export default function Row({ children }: Props): JSX.Element {
  return <RowStyle>{children}</RowStyle>;
}
