import { AlarmsProvider } from "@/context/alarmsContext";
import { PriceProvider } from "@/context/priceContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <PriceProvider>
      <AlarmsProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* Optionally configure static options outside the route.*/}
          {/* <Stack.Screen name="home" options={{}} /> */}
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="modal"
            options={{
              presentation: "modal",
            }}
          />
        </Stack>
      </AlarmsProvider>
    </PriceProvider>
  );
}
