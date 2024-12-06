import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

export const ButtonHeart = () => {
  return (
    <Ionicons.Button
      name="heart"
      size={12}
      iconStyle={styles.icon}
      borderRadius={50}
      color={"#ff6699"}
      backgroundColor={"#f2f2f2"}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 0,
  },
});
