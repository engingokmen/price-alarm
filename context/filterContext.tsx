import { createContext, useContext, useState } from "react";

interface FiltersContextType {
  search: string;
  showFavorites: boolean;
  setSearch: (search: string) => void;
  toggleShowFavorites: () => void;
}

export const FiltersContext = createContext<FiltersContextType>({
  search: "",
  showFavorites: false,
  setSearch: () => {},
  toggleShowFavorites: () => {},
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
  const toggleShowFavorites = () => {
    setShowFavorites((prev) => !prev);
  };

  const filters = {
    search,
    showFavorites,
    setSearch,
    toggleShowFavorites,
  };

  return (
    <FiltersContext.Provider value={filters}>
      {children}
    </FiltersContext.Provider>
  );
};
