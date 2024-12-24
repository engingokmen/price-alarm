import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { usePrice } from "./priceContext"; // Assuming you're using a PriceContext for price updates
import { IAlarm } from "@/types";
import { PermissionStatus } from "expo-modules-core";
import * as Notifications from "expo-notifications";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import { Alert, Platform } from "react-native";
import { api } from "@/api";
import { useAppContext } from "./appContext";

// Context value type definition
interface AlarmsContextType {
  alarms: Array<IAlarm>;
}

interface AlarmsDispatchContextType {
  addAlarm: (price: number, type: "above" | "below") => void;
  removeAlarm: (id: number) => void;
}

const AlarmsContext = createContext<AlarmsContextType | undefined>(undefined);

const AlarmsDispatchContext = createContext<
  AlarmsDispatchContextType | undefined
>(undefined);

interface AlarmsProviderProps {
  children: ReactNode;
}

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

export const AlarmsProvider: React.FC<AlarmsProviderProps> = ({ children }) => {
  const { data: alarms, setData: setAlarms } = useAsyncStorage<IAlarm[]>(
    "alarms",
    (alarms) => alarms[alarms.length - 1]?.id,
    []
  );
  const [notificationPermissions, setNotificationPermissions] =
    useState<PermissionStatus>(PermissionStatus.UNDETERMINED);
  const { price } = usePrice(); // Live price from PriceContext
  const { expoPushToken } = useAppContext();

  const addAlarm = useCallback((price: number, type: "above" | "below") => {
    const newAlarm: IAlarm = {
      id: Date.now(),
      price,
      type,
      isDone: false,
    };
    setAlarms((prevAlarms) => [...prevAlarms, newAlarm]);
  }, []);

  const removeAlarm = useCallback((id: number) => {
    setAlarms((prevAlarms) => prevAlarms.filter((alarm) => alarm.id !== id));
  }, []);

  const disableAlarm = useCallback((id: number) => {
    setAlarms((prevAlarms) =>
      prevAlarms.map((alarm) =>
        alarm.id === id ? { ...alarm, isDone: true } : alarm
      )
    );
  }, []);

  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    setNotificationPermissions(status);
    return status;
  };

  const handleNotification = (notification: Notifications.Notification) => {
    const { title } = notification.request.content;
    console.warn(title);
  };

  useEffect(() => {
    if (!expoPushToken) return;
    api.getAlarms(expoPushToken).then((alarms) => {
      console.log("alarms", alarms);
    });
  }, [expoPushToken]);

  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  useEffect(() => {
    console.log("notificationPermissions", notificationPermissions);
    if (notificationPermissions !== PermissionStatus.GRANTED) return;
    const listener =
      Notifications.addNotificationReceivedListener(handleNotification);
    return () => listener.remove();
  }, [notificationPermissions]);

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
        disableAlarm(alarm.id); // Optionally remove the alarm after triggering
      }
    });
  }, [price, alarms.length]);

  const alarmsValue = useMemo(() => ({ alarms }), [alarms]);

  return (
    <AlarmsContext.Provider value={alarmsValue}>
      <AlarmsDispatchContext.Provider value={{ addAlarm, removeAlarm }}>
        {children}
      </AlarmsDispatchContext.Provider>
    </AlarmsContext.Provider>
  );
};

export const useAlarms = (): AlarmsContextType => {
  const context = useContext(AlarmsContext);
  if (!context) {
    throw new Error("useAlarms must be used within an AlarmsProvider");
  }
  return context;
};

export const useAlarmsDispatch = (): AlarmsDispatchContextType => {
  const context = useContext(AlarmsDispatchContext);
  if (!context) {
    throw new Error("useAlarmsDispatch must be used within an AlarmsProvider");
  }
  return context;
};
