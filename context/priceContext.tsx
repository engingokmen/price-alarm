import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

const PriceContext = createContext(0);

export const PriceProvider = ({ children }: { children: ReactNode }) => {
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data && data.p) {
        setPrice(parseFloat(data.p));
      }
    };

    ws.onerror = (error: Event) => {
      console.error("WebSocket error:", (error as WebSocketErrorEvent).message);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <PriceContext.Provider value={price}>{children}</PriceContext.Provider>
  );
};

export const usePrice = () => useContext(PriceContext);
