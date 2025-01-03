import { useState } from "react";
import { usePrice } from "@/context/priceContext";
import { useAlarmsDispatch } from "@/context/alarmsContext";
import { formattedPrice, stripDotAndComma } from "@/utilities/formattedNumber";
import { NumberInput } from "./NumberInput";
import { Keyboard } from "react-native";
import Toast from "react-native-toast-message";

interface ISetAlarm {
  id?: string;
  onChange?: (text: string) => void;
  submitValue?: number;
  direction?: "above" | "below";
}

export const SetAlarm = ({
  id = "fixed",
  onChange,
  submitValue,
  direction,
}: ISetAlarm) => {
  const { price } = usePrice();
  const { addAlarm } = useAlarmsDispatch();
  const [number, onChangeNumber] = useState("");

  const handleSubmitAlarm = async (number: string) => {
    const target = Number(stripDotAndComma(number));
    if (!price || Number.isNaN(target)) return;

    let alarms;
    if (submitValue && typeof submitValue === "number" && direction) {
      alarms = await addAlarm(submitValue, direction);
    } else {
      alarms = await addAlarm(target, target > price ? "above" : "below");
    }
    if (alarms && alarms.length > 0) {
      onChangeNumber("");
      Keyboard.dismiss();

      const targetPrice = formattedPrice(alarms[alarms.length - 1].price, 0);
      Toast.show({
        type: "success",
        text1: `Alarm set to ${targetPrice} !`,
        text2: `You will be notified when the price is ${
          alarms[alarms.length - 1].type
        } ${targetPrice}`,
      });
    }
  };

  const handleChange = (text: string) => {
    onChangeNumber(text);
    onChange && onChange(text);
  };

  return (
    <NumberInput
      id={id}
      value={number}
      onChange={handleChange}
      onPress={handleSubmitAlarm}
    />
  );
};
