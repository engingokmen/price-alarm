import { IAlarm } from "@/types";
import { useEffect } from "react";
import { Alert, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { usePrice } from "@/context/priceContext";

const useLocalAlarms = (alarms: IAlarm[]) => {
  const { price } = usePrice();

  useEffect(() => {
    if (price === null) return;

    alarms.forEach((alarm) => {
      if (
        (!alarm.isDone && alarm.type === "above" && price >= alarm.price) ||
        (!alarm.isDone && alarm.type === "below" && price <= alarm.price)
      ) {
        if (Platform.OS === "web") {
          Alert.alert("Notifications are not supported on the web.");
        } else {
          Notifications.scheduleNotificationAsync({
            content: {
              title: alarm.price.toString(),
              body: `Price is now ${price}`,
              sound: "sound1.wav",
            },
            trigger: null,
          });
        }
      }
    });
  }, [price, alarms.length]);

  return { alarms };
};
