import { HeaderRight } from "@/components/HeaderRight";
import { AlarmsProvider } from "@/context/alarmsContext";
import { AppProvider } from "@/context/appContext";
import { FiltersProvider } from "@/context/filterContext";
import { PriceProvider } from "@/context/priceContext";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <AppProvider>
      <PriceProvider>
        <AlarmsProvider>
          <FiltersProvider>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              {/* Optionally configure static options outside the route.*/}
              <Stack.Screen name="(tabs)" />
            </Stack>
            <Toast />
          </FiltersProvider>
        </AlarmsProvider>
      </PriceProvider>
    </AppProvider>
  );
}
