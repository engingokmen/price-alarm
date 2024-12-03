import { usePrice } from "@/context/priceContext";
import { Text } from "react-native";

export const DisplayPrice = () => {
  const price = usePrice();
  const formattedNumber = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
  }).format(price);

  return (
    <Text style={{ fontSize: 42, color: "green" }}>{formattedNumber}</Text>
  );
};
