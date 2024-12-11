import { useEffect, useState } from "react";
import { useStorageApi } from "./useStorageApi";

export const useAsyncStorage = <T>(
  key: string,
  dependency: (data: T) => any,
  initialData: T
) => {
  const [data, setData] = useState<T>(initialData);
  const { getDataObj, setDataObj } = useStorageApi();

  //  get data from storage
  useEffect(() => {
    async function getdata() {
      const storageData = await getDataObj(key);
      if (storageData) {
        setData(storageData);
      }
    }
    getdata();
  }, []);

  //  save data to storage
  useEffect(() => {
    if (data) {
      setDataObj(key, data);
    }
  }, [dependency]);

  return { data, setData };
};
