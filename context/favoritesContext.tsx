import { createContext, useContext, useState } from "react";

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (symbol: string) => void;
  removeFavorite: (symbol: string) => void;
  isFavorite: (symbol: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
});

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<Array<string>>([]);

  const addFavorite = (symbol: string) => {
    setFavorites((prev) => (prev.includes(symbol) ? prev : [...prev, symbol]));
  };

  const removeFavorite = (symbol: string) => {
    setFavorites((prev) => prev.filter((fav) => fav !== symbol));
  };

  const isFavorite = (symbol: string) => favorites.includes(symbol);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
