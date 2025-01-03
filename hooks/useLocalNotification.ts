import { Alert, Platform } from "react-native";
import * as Notifications from "expo-notifications";

interface INotifyUser {
  title: string;
  body: string;
}

export const useLocalNotification = () => {
  const notifyUser = ({ title, body }: INotifyUser) => {
    if (Platform.OS === "ios") {
      Alert.alert(title, body);
    } else {
      Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
        },
        trigger: null,
      });
    }
  };

  return { notifyUser };
};
