import { StarIcon } from "./StarIcon";
import { useFilters } from "@/context/filterContext";
import { Pressable } from "react-native";

export const HeaderRight = () => {
  const { showFavorites, toggleShowFavorites } = useFilters();

  return (
    <Pressable onPress={toggleShowFavorites}>
      <StarIcon
        isSelected={showFavorites}
        size={24}
        style={{ marginRight: 16 }}
      />
    </Pressable>
  );
};
