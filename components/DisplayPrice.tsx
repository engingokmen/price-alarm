import { usePrice } from "@/context/priceContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { formattedPrice } from "@/utilities/formattedNumber";
import { ReactNode } from "react";
import { Text, View } from "react-native";

interface DisplayPriceProps {
  price: number | null;
  fontSize?: number;
  lightColor?: string;
  darkColor?: string;
  children?: ReactNode;
  textStyle?: object;
  unit?: string;
  hideUnit?: boolean;
}

export const DisplayPrice = ({
  price,
  fontSize = 42,
  lightColor,
  darkColor,
  textStyle = {},
  unit,
  hideUnit = false,
}: DisplayPriceProps) => {
  const { priceUnit } = usePrice();
  const _unit = unit ?? priceUnit;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "price");
  const formattedNumber = price ? formattedPrice(price) : "0.00";

  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {!hideUnit && <Text>{_unit}</Text>}
      <Text style={[{ fontSize, color }, textStyle]}>{formattedNumber}</Text>
    </View>
  );
};
