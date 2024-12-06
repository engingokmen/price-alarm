import { DisplayPrice } from "@/components/DisplayPrice";
import { usePrice } from "@/context/priceContext";
import { View } from "react-native";

export default function HomeScreen() {
  const price = usePrice();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DisplayPrice price={price} />
    </View>
  );
}
