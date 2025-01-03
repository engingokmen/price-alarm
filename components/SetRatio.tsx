import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { usePrice } from "@/context/priceContext";
import { usePercentageToOriginal } from "@/hooks/usePercentageToOriginal";
import { DisplayPrice } from "./DisplayPrice";
import { SetAlarm } from "./SetAlarm";
import { ToggleUpDown } from "./ToggleUpDown";
import { stripDotAndComma } from "@/utilities/formattedNumber";

export const SetRatio = () => {
  const [direction, setDirection] = useState<"above" | "below">("above");
  const multiplier = direction === "above" ? 1 : -1;

  const { price } = usePrice();
  const { result, updateResult } = usePercentageToOriginal();

  const handleChange = (percentage: string) => {
    updateResult(
      Number(price ?? 0),
      Number(stripDotAndComma(percentage)) * multiplier
    );
  };

  return (
    <View style={styles.container}>
      <ToggleUpDown direction={direction} setDirection={setDirection} />
      <SetAlarm
        id="ratio"
        onChange={handleChange}
        direction={direction}
        submitValue={result}
      />
      <View style={styles.resultContainer}>
        <DisplayPrice price={result} textStyle={styles.result} fontSize={20} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 26,
  },
  resultContainer: {
    alignItems: "center",
  },
  result: {
    fontSize: 32,
  },
});
