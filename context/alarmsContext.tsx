import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { IAlarm } from "@/types";
import { PermissionStatus } from "expo-modules-core";
import * as Notifications from "expo-notifications";
import { useUserAlarms } from "@/hooks/useUserAlarms";

// Context value type definition
interface AlarmsContextType {
  alarms: Array<IAlarm>;
}

interface AlarmsDispatchContextType {
  addAlarm: (price: number, type: "above" | "below") => void;
  disableAlarm: (id: string | undefined) => void;
  removeAlarm: (id: string) => void;
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
  const { alarms, save, update, remove } = useUserAlarms();
  const [notificationPermissions, setNotificationPermissions] =
    useState<PermissionStatus>(PermissionStatus.UNDETERMINED);

  const addAlarm = (price: number, type: "above" | "below") => {
    const newAlarm: IAlarm = {
      price,
      type,
      isDone: false,
    };
    save(newAlarm);
  };

  const removeAlarm = (id: string) => {
    remove(id);
  };

  const disableAlarm = (id: string | undefined) => {
    const prevAlarm = alarms.find((alarm) => alarm._id === id);
    if (prevAlarm) {
      update({ ...prevAlarm, isDone: true });
    }
  };

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
    requestNotificationPermissions();
  }, []);

  useEffect(() => {
    if (notificationPermissions !== PermissionStatus.GRANTED) return;
    const listener =
      Notifications.addNotificationReceivedListener(handleNotification);
    return () => listener.remove();
  }, [notificationPermissions]);

  const alarmsValue = useMemo(() => ({ alarms }), [alarms]);

  return (
    <AlarmsContext.Provider value={alarmsValue}>
      <AlarmsDispatchContext.Provider
        value={{ addAlarm, disableAlarm, removeAlarm }}
      >
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
