import { HeaderRight } from "@/components/HeaderRight";
import { AlarmsProvider } from "@/context/alarmsContext";
import { CoinsProvider } from "@/context/coinsContext";
import { FavoritesProvider } from "@/context/favoritesContext";
import { FiltersProvider } from "@/context/filterContext";
import { PriceProvider } from "@/context/priceContext";
import { useBackgroundFetch } from "@/hooks/useBackgroundFetch";
import { usePushNotificationRegistration } from "@/hooks/usePushNotificationRegistration";
import { Stack } from "expo-router";

export default function RootLayout() {
  // useBackgroundFetch();
  // usePushNotificationRegistration();

  return (
    <PriceProvider>
      <AlarmsProvider>
        <FavoritesProvider>
          <FiltersProvider>
            <CoinsProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                  headerRight: () => <HeaderRight />,
                }}
              >
                {/* Optionally configure static options outside the route.*/}
                {/* <Stack.Screen name="home" options={{}} /> */}
                <Stack.Screen name="(tabs)" />
                <Stack.Screen
                  name="add-alarm"
                  options={{
                    presentation: "modal",
                  }}
                />
              </Stack>
            </CoinsProvider>
          </FiltersProvider>
        </FavoritesProvider>
      </AlarmsProvider>
    </PriceProvider>
  );
}
