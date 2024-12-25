import { FlatList } from "react-native";
import { DisplayAlarm } from "./DisplayAlarm";
import { useAlarms, useAlarmsDispatch } from "@/context/alarmsContext";
import { AppleStyleSwipeableRow } from "./SwipeableRow";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const ListAlarms = () => {
  const { alarms } = useAlarms();
  const { removeAlarm } = useAlarmsDispatch();

  return (
    <GestureHandlerRootView style={{ width: "100%", height: "100%" }}>
      <FlatList
        data={alarms}
        renderItem={({ item }) => {
          return (
            <AppleStyleSwipeableRow
              onPress={() => {
                if (item._id) {
                  removeAlarm(item._id);
                }
              }}
            >
              <DisplayAlarm data={item} />
            </AppleStyleSwipeableRow>
          );
        }}
      />
    </GestureHandlerRootView>
  );
};
