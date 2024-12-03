import { Text } from "react-native";

export const DisplayAlarm = ({ data }: { data: IAlarm }) => {
  return <Text>{data.price}</Text>;
};
