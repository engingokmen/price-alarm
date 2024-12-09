import { ColorNameTypes, useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";

interface StarIconProps {
  isSelected: boolean;
  size?: number;
  style?: object;
  color?: ColorNameTypes;
}

export const StarIcon = ({
  isSelected,
  size = 16,
  style = {},
  color = "star",
}: StarIconProps) => {
  const colorStar = useThemeColor({ light: "" }, color);

  return (
    <Ionicons
      name={isSelected ? "star" : "star-outline"}
      size={size}
      borderRadius={50}
      color={colorStar}
      backgroundColor="transparent"
      style={style}
    />
  );
};
