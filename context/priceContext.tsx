import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";

const PriceContext = createContext<{ price: number | null }>({ price: null });

export const PriceProvider = ({ children }: { children: ReactNode }) => {
  const [price, setPrice] = useState<number | null>(null);

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

  const value = useMemo(() => price, [price]);

  return (
    <PriceContext.Provider value={{ price: value }}>
      {children}
    </PriceContext.Provider>
  );
};

export const usePrice = () => useContext(PriceContext);
