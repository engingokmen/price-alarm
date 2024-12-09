import { createContext, useContext, useState } from "react";

interface FiltersContextType {
  search: string;
  showFavorites: boolean;
  setSearch: (search: string) => void;
  setShowFavorites: (showFavorites: boolean) => void;
}

export const FiltersContext = createContext<FiltersContextType>({
  search: "",
  showFavorites: false,
  setSearch: () => {},
  setShowFavorites: () => {},
});

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return context;
};

interface FiltersProviderProps {
  children: React.ReactNode;
}

export const FiltersProvider = ({ children }: FiltersProviderProps) => {
  const [search, setSearch] = useState<string>("");
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const filters = {
    search,
    showFavorites,
    setSearch,
    setShowFavorites,
  };

  return (
    <FiltersContext.Provider value={filters}>
      {children}
    </FiltersContext.Provider>
  );
};
