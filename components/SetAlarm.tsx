import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { usePrice } from "@/context/priceContext";
import { useAlarms, useAlarmsDispatch } from "@/context/alarmsContext";

export const SetAlarm = () => {
  const [number, onChangeNumber] = useState("");

  const price = usePrice();
  const { addAlarm } = useAlarmsDispatch();

  const handleSubmitAlarm = () => {
    const target = Number(number);
    if (Number.isNaN(target)) return;
    addAlarm(target, target > price ? "above" : "below");
    onChangeNumber("");
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Alarm price"
        keyboardType="numeric"
      />
      <Button
        title="Set alarm"
        onPress={handleSubmitAlarm}
        disabled={number == ""}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
