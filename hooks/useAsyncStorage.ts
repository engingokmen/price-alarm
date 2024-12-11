import { IAlarm } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const useAsyncStorage = () => {
  const [alarms, setAlarms] = useState<IAlarm[]>([]);

  const setDataObj = async (key: string, value: object) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getDataObj = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      const parsed = jsonValue !== null ? JSON.parse(jsonValue) : [];

      return parsed;
    } catch (e) {
      console.log(e);
    }
  };

  //  get alarms from storage
  useEffect(() => {
    async function getAlarms() {
      const alarms = await getDataObj("alarms");
      if (alarms && alarms.length > 0) {
        setAlarms(alarms);
      }
    }
    getAlarms();
  }, []);

  //  save alarms to storage
  useEffect(() => {
    if (alarms) {
      setDataObj("alarms", alarms);
    }
  }, [alarms[alarms.length - 1]?.id]);

  return { alarms, setAlarms };
};
