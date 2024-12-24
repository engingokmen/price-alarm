import * as Notifications from "expo-notifications";
import { usePushNotificationRegistration } from "@/hooks/usePushNotificationRegistration";
import { createContext, useContext } from "react";

interface AppContextType {
  expoPushToken: string | undefined;
  notification: Notifications.Notification | undefined;
}

const AppContext = createContext<AppContextType>({
  expoPushToken: undefined,
  notification: undefined,
});

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { expoPushToken, notification } = usePushNotificationRegistration();

  return (
    <AppContext.Provider value={{ expoPushToken, notification }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};
