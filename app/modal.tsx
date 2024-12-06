import { DisplayPrice } from "@/components/DisplayPrice";
import { SetAlarm } from "@/components/SetAlarm";
import { usePrice } from "@/context/priceContext";
import { Text, View } from "react-native";

export default function Alarms() {
  const price = usePrice();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Add alarm!</Text>
      <DisplayPrice price={price} fontSize={12} />
      <SetAlarm />
    </View>
  );
}
