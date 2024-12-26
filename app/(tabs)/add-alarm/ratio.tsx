import { DisplayPrice } from "@/components/DisplayPrice";
import { SetRatio } from "@/components/SetRatio";
import { usePrice } from "@/context/priceContext";
import { StyleSheet, View } from "react-native";

export default function Ratio() {
  const { price } = usePrice();

  return (
    <View style={styles.container}>
      <DisplayPrice price={price} fontSize={24} />
      <SetRatio />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: { fontSize: 24 },
});
