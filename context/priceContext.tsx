import { SYMBOL } from "@/settings";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";

const PriceContext = createContext<{
  price: number | null;
  priceUnit: string | null;
}>({ price: null, priceUnit: null });

export const PriceProvider = ({ children }: { children: ReactNode }) => {
  const [price, setPrice] = useState<number | null>(null);
  const [unit, setUnit] = useState<string | null>(null);

  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const connectSocket = () => {
      const ws = new WebSocket(
        `wss://stream.binance.com:9443/ws/${SYMBOL}@trade`
      );
      setUnit(SYMBOL);

      ws.onopen = () => {
        console.log("Socket connected");
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data && data.p) {
          setPrice(parseFloat(data.p));
        }
      };

      ws.onerror = (error: Event) => {
        console.error(
          "WebSocket error:",
          (error as WebSocketErrorEvent).message
        );
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
        setTimeout(connectSocket, 2000); // Attempt reconnection after 2 seconds
      };

      setSocket(ws);
    };

    connectSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const value = useMemo(() => price, [price]);
  const priceUnit = useMemo(() => unit, [unit]);

  return (
    <PriceContext.Provider value={{ price: value, priceUnit }}>
      {children}
    </PriceContext.Provider>
  );
};

export const usePrice = () => useContext(PriceContext);
