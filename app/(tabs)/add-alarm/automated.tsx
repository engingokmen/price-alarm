import { StyleSheet, Text, View } from "react-native";

export default function Automated() {
  return (
    <View style={styles.container}>
      <Text>Automated Alarms</Text>
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
  title: { fontSize: 24 },
});
