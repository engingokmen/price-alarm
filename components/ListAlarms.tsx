import { FlatList } from "react-native";
import { DisplayAlarm } from "./DisplayAlarm";
import { useAlarms } from "@/context/alarmsContext";

export const ListAlarms = () => {
  const { alarms } = useAlarms();

  return (
    <FlatList
      data={alarms}
      renderItem={({ item }) => {
        console.log("alarm", item);
        return <DisplayAlarm data={item} />;
      }}
    />
  );
};
