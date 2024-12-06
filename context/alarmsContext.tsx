import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { usePrice } from "./priceContext"; // Assuming you're using a PriceContext for price updates

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

export const AlarmsProvider: React.FC<AlarmsProviderProps> = ({ children }) => {
  const [alarms, setAlarms] = useState<IAlarm[]>([]);
  const price = usePrice(); // Live price from PriceContext

  const addAlarm = (price: number, type: "above" | "below") => {
    const newAlarm: IAlarm = {
      id: Date.now(),
      price,
      type,
    };
    setAlarms((prevAlarms) => [...prevAlarms, newAlarm]);
  };

  const removeAlarm = (id: number) => {
    setAlarms((prevAlarms) => prevAlarms.filter((alarm) => alarm.id !== id));
  };

  useEffect(() => {
    if (price === null) return;

    alarms.forEach((alarm) => {
      if (
        (alarm.type === "above" && price >= alarm.price) ||
        (alarm.type === "below" && price <= alarm.price)
      ) {
        alert(`Price Alert: Bitcoin is ${alarm.type} $${alarm.price}`);
        removeAlarm(alarm.id); // Optionally remove the alarm after triggering
      }
    });
  }, [price, alarms]);

  return (
    <AlarmsContext.Provider value={{ alarms }}>
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
