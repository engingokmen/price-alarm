import { Tabs } from "expo-router";
import { HapticTab } from "@/components/HapticTab";
import { Ionicons } from "@expo/vector-icons";
import { useScreenOrientation } from "@/hooks/useScreenOrientation";
import { useColors } from "@/hooks/useColors";

export default function TabLayout() {
  const colors = useColors();
  const { isLandscape } = useScreenOrientation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        headerStyle: {
          backgroundColor: colors.headerBackground,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: !isLandscape,
          tabBarStyle: isLandscape ? { display: "none" } : {},
          title: "Price",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={28}
              name={focused ? "eye" : "eye-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="alarms"
        options={{
          title: "Alarms",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={28}
              name={focused ? "alarm" : "alarm-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add-alarm"
        options={{
          title: "Add alarm",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={28}
              name={focused ? "list-circle" : "list-circle-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
