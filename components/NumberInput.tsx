import { formattedPrice, unformattedPrice } from "@/utilities/formattedNumber";
import { InputAccessoryView, StyleSheet, TextInput, View } from "react-native";
import Button from "./Button";
import { useColors } from "@/hooks/useColors";

interface ISetAlarm {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onPress: (number: string) => void;
}

export const NumberInput = ({
  id = "fixed",
  value,
  onChange,
  onPress,
}: ISetAlarm) => {
  const inputAccessoryViewID = id;
  const fixedViev = id === "fixed";

  const formatNumber = (num: number) => {
    if (!num) return "";
    // Format the number using Intl.NumberFormat
    return formattedPrice(num, 0);
  };

  const handleChange = (text: string) => {
    // Remove non-numeric characters
    const unformattedNumber = unformattedPrice(text);
    onChange(formatNumber(unformattedNumber));
  };

  const colors = useColors();

  return (
    <View>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: colors.buttonBackground,
            backgroundColor: colors.buttonBorder,
          },
        ]}
        onChangeText={handleChange}
        value={value}
        inputAccessoryViewID={inputAccessoryViewID}
        placeholder={`Enter ${fixedViev ? "price" : "%"}`}
        placeholderTextColor={colors.lighterBlue}
        keyboardType="numeric"
        autoFocus
      />
      <InputAccessoryView nativeID={inputAccessoryViewID}>
        <Button onPress={() => onPress(value)} style={styles.button}>
          Set {fixedViev ? "price" : "percentage"}
        </Button>
      </InputAccessoryView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    textAlign: "center",
    fontSize: 32,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    paddingVertical: 16,
  },
});
