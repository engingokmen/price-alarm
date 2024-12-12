import { Link, Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { HeaderRight } from "@/components/HeaderRight";
import { useScreenOrientation } from "@/hooks/useScreenOrientation";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isLandscape } = useScreenOrientation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
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
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="alarms"
        options={{
          title: "Alarms",
          headerRight: () => (
            <Link href="/add-alarm/fixed" style={{ marginRight: 20 }}>
              <Ionicons name="add" size={24} color="white" />
            </Link>
          ),
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
        name="coins"
        options={{
          title: "Coins",
          headerRight: () => <HeaderRight />,
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
