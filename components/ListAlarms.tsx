import { FlatList } from "react-native";
import { DisplayAlarm } from "./DisplayAlarm";
import { useAlarms } from "@/context/alarmsContext";
import { AppleStyleSwipeableRow } from "./SwipeableRow";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const ListAlarms = () => {
  const { alarms } = useAlarms();

  return (
    <GestureHandlerRootView style={{ width: "100%", height: "100%" }}>
      <FlatList
        data={alarms}
        renderItem={({ item }) => {
          return (
            <AppleStyleSwipeableRow>
              <DisplayAlarm data={item} />
            </AppleStyleSwipeableRow>
          );
        }}
        style={{ marginTop: 24 }}
      />
    </GestureHandlerRootView>
  );
};
