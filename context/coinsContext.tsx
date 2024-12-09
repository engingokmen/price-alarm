import { ICoin } from "@/types";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useFilters } from "./filterContext";

export const CoinsContext = createContext<CoinsContextType | undefined>(
  undefined
);

interface CoinsContextType {
  coins: Array<ICoin>;
}

export const useCoins = () => {
  const context = useContext(CoinsContext);
  if (context === undefined) {
    throw new Error("useCoins must be used within a CoinsProvider");
  }
  return context;
};

export const useCoinsFiltered = () => {
  const { coins } = useCoins();
  const { search } = useFilters();

  const filteredCoins = coins.filter((coin) =>
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return { coins: filteredCoins };
};

interface CoinsProviderProps {
  children: React.ReactNode;
}

export const CoinsProvider = ({ children }: CoinsProviderProps) => {
  const [coins, setCoins] = useState<Array<ICoin>>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://api.binance.com/api/v3/ticker/price"
      );
      const data = await response.json();
      setCoins(data);
    }
    fetchData();
  }, []);

  const coinsValue = useMemo(() => ({ coins }), [coins]);

  return (
    <CoinsContext.Provider value={coinsValue}>{children}</CoinsContext.Provider>
  );
};
