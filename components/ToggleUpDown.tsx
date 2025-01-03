import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

interface IToggleUpDown {
  direction: "above" | "below";
  setDirection: React.Dispatch<React.SetStateAction<"above" | "below">>;
}

export const ToggleUpDown = ({ direction, setDirection }: IToggleUpDown) => {
  const toggleSwitch = () =>
    setDirection((previousState) =>
      previousState === "above" ? "below" : "above"
    );

  return (
    <Pressable
      onPress={toggleSwitch}
      style={{ flexDirection: "row", justifyContent: "center" }}
    >
      {direction === "above" ? (
        <>
          <Ionicons name="caret-up" size={50} color="green" />
          <Ionicons name="caret-down-outline" size={50} color="gray" />
        </>
      ) : (
        <>
          <Ionicons name="caret-up-outline" size={50} color="gray" />
          <Ionicons name="caret-down" size={50} color="red" />
        </>
      )}
    </Pressable>
  );
};
