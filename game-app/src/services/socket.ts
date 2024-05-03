import { io } from "socket.io-client";

const URL = "http://192.168.16.102:9000";

export const socket = io(URL, {
  autoConnect: false,
});
