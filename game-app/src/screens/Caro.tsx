import { useEffect, useState } from "react";
import styled from "styled-components";

import { socket } from "../services/socket";
import { BoardResType, CellType, PlayerData } from "../services/type";
import MainCaroGame from "../components/caro/Main";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { Flex } from "antd";
import { useAppContext } from "../contexts/app.context";

const BoardStyle = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 6px;
  width: 100%;
  height: 100%;
  clear: both;
`;

const HeadStyle = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;

const ClientX = styled.div<{ $current: boolean }>`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  height: 26px;
  align-items: center;
  .x {
    position: relative;
    display: block;
    width: 26px;
    height: 26px;
    &::before {
      position: absolute;
      content: "";
      height: 68%;
      left: 50%;
      top: 50%;
      border: 1px solid ${({ $current }) => ($current ? "#6e88c0" : "#919191")};
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &::after {
      position: absolute;
      content: "";
      height: 68%;
      left: 50%;
      top: 50%;
      border: 1px solid ${({ $current }) => ($current ? "#6e88c0" : "#919191")};
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
`;

const ClientO = styled.div<{ $current: boolean }>`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  height: 26px;
  align-items: center;
  span {
    order: 2;
  }
  .o {
    position: relative;
    display: block;
    width: 26px;
    height: 26px;
    order: 1;
    &::before {
      position: absolute;
      content: "";
      height: 60%;
      width: 60%;
      left: 50%;
      top: 50%;
      border: 2px solid ${({ $current }) => ($current ? "#e7a726" : "#919191")};
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

// const UserImage = styled.div`
//   display: block;
//   width: 100px;
//   height: 100px;
//   overflow: hidden;
// `;

// const ImageStyle = styled.img`
//   display: block;
//   height: 100%;
//   width: auto;
//   margin: auto auto;
//   transform: scale(1.3);
//   aspect-ratio: initial;
// `;

export default function Caro(): JSX.Element {
  const { client, clients } = useAppContext();

  const [open, setOpen] = useState(false);
  const [openDraw, setOpenDraw] = useState(false);
  const [winner, setWinner] = useState<string | undefined>(undefined);

  const [inGame, setInGame] = useState(false);
  const [board, setBoard] = useState<CellType[][]>([]);

  const [players, setPlayers] = useState<PlayerData | undefined>(undefined);
  const [player, setPlayer] = useState<string>("");
  const [currentPlayer, setCurrentPlayer] = useState<string>("X");

  // const [currentPlayer, setCurrentPlayer] = useState<string | undefined>(
  //   undefined
  // );

  // const [player, setPlayer] = useState<CellType | undefined>(undefined);

  // const handleNewGame = () => {
  //   socket.emit("new_game", (e: any) => console.log(e));
  // };

  const handleSelectX = () => {
    if (clients.length < 2) return;
    const other = clients.find((x) => x.customId !== client?.customId);
    socket.emit("new_game", {
      player: "X",
      customId: client?.customId,
      otherId: other?.customId,
    });
    handleCloseAllModal();
  };

  const handleSelectO = () => {
    if (clients.length < 2) return;
    const other = clients.find((x) => x.customId !== client?.customId);
    socket.emit("new_game", {
      player: "O",
      customId: client?.customId,
      otherId: other?.customId,
    });
    handleCloseAllModal();
  };

  const handleCloseAllModal = () => {
    setWinner(undefined);
    setOpenDraw(false);
    setOpen(false);
  };

  useEffect(() => {
    socket.emit("board");
    socket.on("board", (res: BoardResType) => {
      if (res.code === 200) {
        if (res.data !== null) {
          setInGame(true);
          setBoard(res.data.board);
          setPlayers(res.data.players);
          if (res.data.players.X === client?.customId) {
            setPlayer("X");
          }

          if (res.data.players.O === client?.customId) {
            setPlayer("O");
          }
          // alert(res.data.currentPlayer);
          console.log(res.data.currentPlayer);
          setCurrentPlayer(res.data.currentPlayer);
          handleCloseAllModal();
        }
      }
    });

    socket.on("draw_board", () => {
      setOpenDraw(true);
    });

    socket.on("win_board", (res: { data: string }) => {
      setWinner(res.data);
    });

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Modal
        open={openDraw}
        title="Cờ hòa"
        content={
          <Flex justify="space-between" align="center">
            <Button title="Cờ xanh" onClick={handleSelectX}></Button>
            <Button title="Cờ vàng" onClick={handleSelectO}></Button>
          </Flex>
        }
        footer={[]}
        onClose={() => setOpenDraw(!openDraw)}
      />
      <Modal
        open={winner !== undefined}
        title={`${winner} thắng!`}
        content={
          <Flex justify="space-between" align="center">
            <Button title="Cờ xanh" onClick={handleSelectX}></Button>
            <Button title="Cờ vàng" onClick={handleSelectO}></Button>
          </Flex>
        }
        footer={[]}
        onClose={() => setWinner(undefined)}
      />
      <Modal
        title="Chọn cờ"
        content={
          <Flex justify="space-between" align="center">
            <Button title="Cờ xanh" onClick={handleSelectX}></Button>
            <Button title="Cờ vàng" onClick={handleSelectO}></Button>
          </Flex>
        }
        footer={[]}
        open={open}
        onClose={() => setOpen(false)}
      />

      <BoardStyle>
        <HeadStyle>
          {/* <UserImage>{clients[0] && <ImageStyle src={User1} />}</UserImage> */}
          <ClientX $current={currentPlayer === "X"}>
            <span>
              {clients.find((x) => x.customId === players?.X)?.customName}
            </span>
            <div className="x"></div>
          </ClientX>

          <Button
            onClick={() => setOpen(true)}
            title={inGame ? "New Game" : "Start Game"}
          />

          <ClientO $current={currentPlayer === "O"}>
            <span>
              {clients.find((x) => x.customId === players?.O)?.customName}
            </span>
            <div className="o"></div>
          </ClientO>
          {/* <UserImage>{clients[1] && <ImageStyle src={User2} />}</UserImage> */}
        </HeadStyle>

        {board.length > 0 && (
          <MainCaroGame
            board={board}
            player={player}
            currentPlayer={currentPlayer}
          />
        )}
      </BoardStyle>
    </>
  );
}
