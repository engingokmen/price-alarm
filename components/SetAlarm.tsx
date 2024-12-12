import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { usePrice } from "@/context/priceContext";
import { useAlarmsDispatch } from "@/context/alarmsContext";
import Button from "./Button";

export const SetAlarm = () => {
  const [number, onChangeNumber] = useState("");

  const { price } = usePrice();
  const { addAlarm } = useAlarmsDispatch();

  const handleSubmitAlarm = () => {
    const target = Number(number);
    if (!price || Number.isNaN(target)) return;
    addAlarm(target, target > price ? "above" : "below");
    onChangeNumber("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Enter price"
        keyboardType="numeric"
        autoFocus
      />
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
  input: {
    margin: 0,
    width: "100%",
    maxWidth: 240,
    fontSize: 24,
    borderWidth: 1,
    padding: 10,
    borderColor: "blue",
    borderRadius: 5,
  },
  button: {
    marginTop: 20,
  },
});
