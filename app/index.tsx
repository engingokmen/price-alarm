import { DisplayPrice } from "@/components/DisplayPrice";
import { ListAlarms } from "@/components/ListAlarms";
import { SetAlarm } from "@/components/SetAlarm";
import { AlarmsProvider } from "@/context/alarmsContext";
import { PriceProvider } from "@/context/priceContext";
import { View } from "react-native";

export default function Index() {
  return (
    <PriceProvider>
      <AlarmsProvider>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DisplayPrice />
          <SetAlarm />
          <ListAlarms />
        </View>
      </AlarmsProvider>
    </PriceProvider>
  );
}
