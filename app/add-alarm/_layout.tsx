import LinkButton from "@/components/LinkButton";
import { Slot, usePathname } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function HomeLayout() {
  const path = usePathname();
  return (
    <View style={styles.container}>
      <View style={styles.linkContainer}>
        <LinkButton
          href="/add-alarm/fixed"
          disabled={path === "/add-alarm/fixed"}
        >
          Fixed
        </LinkButton>
        <LinkButton
          href="/add-alarm/ratio"
          disabled={path === "/add-alarm/ratio"}
        >
          Ratio
        </LinkButton>
        <LinkButton
          href="/add-alarm/automated"
          disabled={path === "/add-alarm/automated"}
        >
          Auto
        </LinkButton>
      </View>
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    maxWidth: 400,
    marginTop: 32,
    marginBottom: 48,
  },
  title: { fontSize: 24 },
});
