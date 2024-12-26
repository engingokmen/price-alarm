import { useEffect } from "react";
import { DisplayPrice } from "@/components/DisplayPrice";
import { usePrice } from "@/context/priceContext";
import { StyleSheet, View } from "react-native";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import { useScreenOrientation } from "@/hooks/useScreenOrientation";

export default function Price() {
  const { price } = usePrice();
  const { isLandscape } = useScreenOrientation();

  useEffect(() => {
    activateKeepAwakeAsync();
    return () => {
      deactivateKeepAwake();
    };
  }, []);

  return (
    <View style={styles.container}>
      <DisplayPrice price={price} fontSize={isLandscape ? 124 : 64} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
