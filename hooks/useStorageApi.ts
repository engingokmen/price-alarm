import AsyncStorage from "@react-native-async-storage/async-storage";

export const useStorageApi = () => {
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

  return { setDataObj, getDataObj };
};
