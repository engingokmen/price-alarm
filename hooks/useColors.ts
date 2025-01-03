import { Colors } from "@/constants/Colors";
import { useColorScheme } from "./useColorScheme.web";

export const useColors = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  return colors;
};
