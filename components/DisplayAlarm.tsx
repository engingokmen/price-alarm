import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DisplayPrice } from "./DisplayPrice";
import { IAlarm } from "@/types";

export const DisplayAlarm = ({ data }: { data: IAlarm }) => {
  const icon = data.type === "above" ? "arrow-up" : "arrow-down";
  const color = data.type === "above" ? "green" : "red";

  return (
    <View style={[styles.container, data.isDone ? { opacity: 0.4 } : {}]}>
      <DisplayPrice price={data.price} fontSize={24} />
      <Text>
        <Ionicons name={icon} size={32} color={color} />
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    height: 100,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
