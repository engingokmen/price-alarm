import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

interface ButtonStarProps {
  isFavorite: boolean;
}

export const ButtonStar = ({ isFavorite }: ButtonStarProps) => {
  return (
    <Ionicons
      name={isFavorite ? "star" : "star-outline"}
      size={16}
      iconStyle={styles.icon}
      borderRadius={50}
      color={"#D4AF37"}
      backgroundColor={"#f2f2f2"}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 0,
  },
});
