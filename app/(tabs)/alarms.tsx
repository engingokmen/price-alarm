import { ListAlarms } from "@/components/ListAlarms";
import { View } from "react-native";

export default function Alarms() {
  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ListAlarms />
    </View>
  );
}
