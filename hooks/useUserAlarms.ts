import { api } from "@/api";
import { useAppContext } from "@/context/appContext";
import { IAlarm } from "@/types";
import { useEffect, useState } from "react";

export const useUserAlarms = () => {
  const { expoPushToken } = useAppContext();
  const [alarms, setAlarms] = useState<IAlarm[]>([]);

  useEffect(() => {
    // Fetch alarms from api
    const fetchAlarms = async () => {
      try {
        const alarms = await api.getAlarms(expoPushToken);
        setAlarms(alarms);
      } catch (e) {
        console.error(e);
      }
    };

    if (expoPushToken) {
      fetchAlarms();
    }
  }, [expoPushToken]);

  const save = async (alarm: IAlarm) => {
    try {
      const alarms = await api.saveAlarm(expoPushToken, alarm);
      setAlarms(alarms);
    } catch (e) {
      console.error(e);
    }
  };

  const update = async (alarm: IAlarm) => {
    try {
      const alarms = await api.updateAlarm(expoPushToken, alarm);
      setAlarms(alarms);
    } catch (e) {
      console.error(e);
    }
  };

  const remove = async (id: string) => {
    try {
      const alarms = await api.removeAlarm(expoPushToken, id);
      setAlarms(alarms);
    } catch (e) {
      console.error(e);
    }
  };

  return { alarms, save, update, remove };
};
