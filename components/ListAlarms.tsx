import { FlatList } from "react-native";
import { DisplayAlarm } from "./DisplayAlarm";
import { useAlarms } from "@/context/alarmsContext";

export const ListAlarms = () => {
  const { alarms } = useAlarms();

  console.log("alarms", alarms);

  return (
    <FlatList
      data={alarms}
      renderItem={({ item }) => {
        return <DisplayAlarm data={item} />;
      }}
      style={{ marginTop: 24 }}
    />
  );
};
