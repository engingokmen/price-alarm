import { linkButtonStyles } from "@/components/LinkButton";
import { StyleSheet, Text, View } from "react-native";
import { Tabs, TabList, TabTrigger } from "expo-router/ui";
import { DisplayPrice } from "@/components/DisplayPrice";
import { usePrice } from "@/context/priceContext";
import { Slot, usePathname } from "expo-router";
import { DismissKeyboard } from "@/components/DismissKeyboard";
import { useColors } from "@/hooks/useColors";

export default function HomeLayout() {
  const { price } = usePrice();
  const colors = useColors();
  const pathname = usePathname();

  return (
    <Tabs>
      <TabList>
        <TabTrigger
          name="fixed"
          href="/add-alarm/fixed"
          style={[
            styles.button,
            {
              borderColor: colors.buttonBorder,
              backgroundColor: colors.buttonBackground,
              opacity: pathname === "/add-alarm/fixed" ? 1 : 0.4,
            },
          ]}
        >
          <Text
            style={[
              linkButtonStyles.text,
              {
                color: colors.buttonText,
              },
            ]}
          >
            Fixed
          </Text>
        </TabTrigger>
        <TabTrigger
          name="ratio"
          href="/add-alarm/ratio"
          style={[
            styles.button,
            {
              borderColor: colors.buttonBorder,
              backgroundColor: colors.buttonBackground,
              opacity: pathname === "/add-alarm/ratio" ? 1 : 0.4,
            },
          ]}
        >
          <Text style={[linkButtonStyles.text, { color: colors.buttonText }]}>
            Ratio
          </Text>
        </TabTrigger>
        <TabTrigger
          name="automated"
          href="/add-alarm/automated"
          style={[
            styles.button,
            {
              borderColor: colors.buttonBorder,
              backgroundColor: colors.buttonBackground,
              opacity: pathname === "/add-alarm/automated" ? 1 : 0.4,
            },
          ]}
        >
          <Text style={[linkButtonStyles.text, { color: colors.buttonText }]}>
            Auto
          </Text>
        </TabTrigger>
      </TabList>
      <View style={styles.container}>
        <View>
          <DisplayPrice price={price} fontSize={32} />
        </View>
        <DismissKeyboard>
          <View style={{ flex: 1, width: "100%" }}>
            <Slot />
          </View>
        </DismissKeyboard>
      </View>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 20, marginTop: 20, alignItems: "center" },
  button: {
    ...linkButtonStyles.button,
  },
});
