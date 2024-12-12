import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { usePrice } from "@/context/priceContext";
import { useAlarmsDispatch } from "@/context/alarmsContext";
import Button from "./Button";
import { Ionicons } from "@expo/vector-icons";
import { usePercentageToOriginal } from "@/hooks/usePercentageToOriginal";
import { DisplayPrice } from "./DisplayPrice";

export const SetRatio = () => {
  const [number, onChangeNumber] = useState("");
  const [direction, setDirection] = useState<"above" | "below">("above");
  const multiplier = direction === "above" ? 1 : -1;

  const { price } = usePrice();
  const { result, updateResult } = usePercentageToOriginal();
  const { addAlarm } = useAlarmsDispatch();

  const handleSubmitAlarm = () => {
    if (!price || Number.isNaN(result)) return;
    addAlarm(result, direction);
    onChangeNumber("");
  };

  const toggleSwitch = () =>
    setDirection((previousState) =>
      previousState === "above" ? "below" : "above"
    );

  const handleChange = (percentage: string) => {
    updateResult(Number(price ?? 0), Number(percentage) * multiplier);
    onChangeNumber(percentage);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputPressable}>
        <Pressable onPress={toggleSwitch}>
          {direction === "above" ? (
            <Ionicons name="caret-up" size={50} color="green" />
          ) : (
            <Ionicons name="caret-down" size={50} color="red" />
          )}
        </Pressable>
        <TextInput
          style={styles.input}
          onChangeText={handleChange}
          value={number}
          placeholder="%"
          keyboardType="numeric"
          autoFocus
        />
      </View>
      <DisplayPrice price={result} style={styles.result} fontSize={20} />
      <Button
        onPress={handleSubmitAlarm}
        disabled={number == ""}
        style={styles.button}
      >
        Set alarm
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    textAlign: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  inputPressable: {
    display: "flex",
    flexDirection: "row",
  },
  input: {
    margin: 0,
    width: "100%",
    maxWidth: 100,
    fontSize: 24,
    borderWidth: 1,
    padding: 10,
    borderColor: "blue",
    borderRadius: 5,
  },
  button: {
    marginTop: 20,
  },
  result: {
    marginTop: 20,
    color: "orange",
  },
});
