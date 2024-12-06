import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DisplayPrice } from "./DisplayPrice";

export const DisplayAlarm = ({ data }: { data: IAlarm }) => {
  const icon = data.type === "above" ? "arrow-up" : "arrow-down";
  const color = data.type === "above" ? "green" : "red";

  return (
    <View style={styles.container}>
      <DisplayPrice price={data.price} fontSize={24} />
      <Text>
        <Ionicons name={icon} size={32} color={color} />
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    gap: 24,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
