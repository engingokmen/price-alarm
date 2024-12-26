import { DisplayPrice } from "@/components/DisplayPrice";
import { SetAlarm } from "@/components/SetAlarm";
import { usePrice } from "@/context/priceContext";
import { Keyboard, Pressable, StyleSheet, View } from "react-native";

export default function Fixed() {
  const { price } = usePrice();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => Keyboard.dismiss()}>
        <DisplayPrice price={price} fontSize={24} />
      </Pressable>
      <SetAlarm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: { fontSize: 24 },
});
