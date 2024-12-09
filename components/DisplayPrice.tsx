import { useThemeColor } from "@/hooks/useThemeColor";
import { ReactNode } from "react";
import { Text } from "react-native";

interface DisplayPriceProps {
  price: number;
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
  const formattedNumber = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
  }).format(price);

  return <Text style={[{ fontSize, color }, style]}>{formattedNumber}</Text>;
};
