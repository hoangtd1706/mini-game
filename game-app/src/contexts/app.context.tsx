import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { v4 as uuid } from "uuid";
import { ClientType, SocketResType, UserResType } from "../services/type";
import { socket } from "../services/socket";

interface AppStore {
  isConnected: boolean;

  client: ClientType | undefined;
  clients: ClientType[];
}

export const AppContext = createContext<AppStore>({
  isConnected: false,

  client: undefined,
  clients: [],
});

export default function AppContextProvider({
  children,
}: PropsWithChildren): JSX.Element {
  const [isConnected, setIsConnected] = useState(false);

  const [client, setClient] = useState<ClientType | undefined>();
  const [clients, setClients] = useState<ClientType[]>([]);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      const uJson = window.localStorage.getItem("client_info");
      if (uJson !== null) {
        const client = JSON.parse(uJson) as ClientType;
        socket.emit("storeClientInfo", {
          customId: client.customId,
          customName: client.customName,
        });
        setClient(client);
      } else {
        const customId = uuid();
        let customName: string | null = null;

        customName = prompt("What your name?");

        if (customName !== null) {
          const client: ClientType = {
            customId: customId,
            customName: customName,
          };
          socket.emit("storeClientInfo", {
            customId: customId,
            customName: customName,
          });
          setClient(client);
          window.localStorage.setItem("client_info", JSON.stringify(client));
        }
      }
      console.log("Sending userId");
    });

    socket.on("storeClientInfo", (data: SocketResType) => {
      if (data.code === 200) {
        setIsConnected(true);
        socket.emit("getUsers");
        console.log("Connected to server by userId");
      } else {
        alert(data.msg);
      }
    });
  }, []);

  socket.on("disconnect", () => {
    setIsConnected(false);
  });

  useEffect(() => {
    socket.on("users", (data: UserResType) => {
      setClients(data.data);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        isConnected: isConnected,

        client: client,
        clients: clients,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
