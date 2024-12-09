import { useEffect } from "react";
import { DisplayPrice } from "@/components/DisplayPrice";
import { usePrice } from "@/context/priceContext";
import { View } from "react-native";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";

export default function HomeScreen() {
  const price = usePrice();

  useEffect(() => {
    activateKeepAwakeAsync();
    return () => {
      deactivateKeepAwake();
    };
  }, []);

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
