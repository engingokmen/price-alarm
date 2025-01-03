import { useColors } from "@/hooks/useColors";
import { Ionicons } from "@expo/vector-icons";
import { ReactNode, useRef } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

export const AppleStyleSwipeableRow = ({
  children,
  onPress,
}: {
  children: ReactNode;
  onPress: () => void;
}) => {
  const RightAction = (
    prog: SharedValue<number>,
    drag: SharedValue<number>
  ) => {
    const styleAnimation = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: drag.value + 100 }],
      };
    });

    const handlePress = () => {
      onPress();
      ref.current.close();
    };

    return (
      <Reanimated.View style={styleAnimation}>
        <Pressable onPress={handlePress}>
          <View style={styles.containerRightAction}>
            <Ionicons name="trash" style={styles.rightAction} />
          </View>
        </Pressable>
      </Reanimated.View>
    );
  };

  const ref = useRef<any>();
  const colors = useColors();

  return (
    <ReanimatedSwipeable
      ref={ref}
      containerStyle={[styles.swipeable, { backgroundColor: colors.swipeable }]}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={RightAction}
      childrenContainerStyle={{ width: "100%" }}
    >
      {children}
    </ReanimatedSwipeable>
  );
};

const styles = StyleSheet.create({
  containerRightAction: {
    width: 100,
    height: 100,
    backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  rightAction: {
    color: "white",
    fontSize: 32,
  },
  separator: {
    width: "100%",
    borderTopWidth: 1,
  },
  swipeable: {
    width: "100%",
    height: 100,
    alignItems: "center",
  },
});
