import { useWindowDimensions } from "react-native";

export const useScreenOrientation = () => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return { isLandscape };
};
