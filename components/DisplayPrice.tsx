import { useThemeColor } from "@/hooks/useThemeColor";
import { formattedPrice } from "@/utilities/formattedNumber";
import { ReactNode } from "react";
import { Text } from "react-native";

interface DisplayPriceProps {
  price: number | null;
  fontSize?: number;
  lightColor?: string;
  darkColor?: string;
  children?: ReactNode;
  style?: object;
}

export const DisplayPrice = ({
  price,
  fontSize = 42,
  lightColor,
  darkColor,
  style = {},
}: DisplayPriceProps) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "price");
  const formattedNumber = price ? formattedPrice(price) : "0.00";

  return <Text style={[{ fontSize, color }, style]}>{formattedNumber}</Text>;
};
