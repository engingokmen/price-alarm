import { useFavorites } from "@/context/favoritesContext";
import { Pressable, PressableProps } from "react-native";

interface AddRemoveFavoritesPressableProps extends PressableProps {
  id: string;
  isSelected: boolean;
}

export const AddRemoveFavoritesPressable = ({
  id,
  children,
  isSelected,
}: AddRemoveFavoritesPressableProps) => {
  const { addFavorite, removeFavorite } = useFavorites();

  return (
    <Pressable
      onPress={() => {
        if (isSelected) {
          removeFavorite(id);
        } else {
          addFavorite(id);
        }
      }}
    >
      {children}
    </Pressable>
  );
};
