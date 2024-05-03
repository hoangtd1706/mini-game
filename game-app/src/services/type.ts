export type SocketResType = {
  code: number;
  msg: string;
};

export type CellType = "X" | "O" | null;

export type PlayerData = {
  X: string;
  O: string;
};
export type CaroData = {
  board: CellType[][];
  players: PlayerData;
  currentPlayer: string;
};

export type UserResType = SocketResType & {
  data: ClientType[];
};

export type BoardResType = SocketResType & {
  data: CaroData | null;
};

export type ClientType = {
  customName: string;
  customId: string;
};
