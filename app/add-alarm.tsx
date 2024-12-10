import { DisplayPrice } from "@/components/DisplayPrice";
import { SetAlarm } from "@/components/SetAlarm";
import { usePrice } from "@/context/priceContext";
import { StyleSheet, Text, View } from "react-native";

export default function addAlarm() {
  const { price } = usePrice();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add alarm!</Text>
      <DisplayPrice price={price} fontSize={24} />
      <SetAlarm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 200,
  },
  title: { fontSize: 24 },
});
