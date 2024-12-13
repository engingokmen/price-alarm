import { useEffect } from "react";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import * as Notifications from "expo-notifications";
import { formattedPrice } from "@/utilities/formattedNumber";

const BACKGROUND_FETCH_TASK = "price-fetch";

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const data = await fetch(
    "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
  );

  const json = await data.json();
  const price = formattedPrice(json.price);

  // Be sure to return the successful result type!
  Notifications.scheduleNotificationAsync({
    content: {
      title: `${price}`,
      body: `FROM BACKGROUND FETCH`,
      sound: "sound1.wav",
    },
    trigger: null,
  });
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

// 2. Register the task at some point in your app by providing the same name,
// and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 1, // 1 minute
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function unregisterBackgroundFetchAsync() {
  //   return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

export const useBackgroundFetch = () => {
  useEffect(() => {
    console.log(
      "useBackgroundFetch",
      TaskManager.isTaskDefined(BACKGROUND_FETCH_TASK)
    );
    registerBackgroundFetchAsync();
  }, []);
};
