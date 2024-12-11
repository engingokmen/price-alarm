import { useEffect } from "react";
import { DisplayPrice } from "@/components/DisplayPrice";
import { usePrice } from "@/context/priceContext";
import { StyleSheet, View } from "react-native";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
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
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
          <DisplayPrice price={price} fontSize={isLandscape ? 124 : 64} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
