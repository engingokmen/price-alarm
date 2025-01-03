import { useColors } from "@/hooks/useColors";
import { Link, LinkProps } from "expo-router";
import { ReactNode } from "react";
import { Text, StyleSheet } from "react-native";

interface LinkProperties extends LinkProps {
  children?: ReactNode;
}

export default function LinkButton(props: LinkProperties) {
  const { children = "Save", style = {} as any, ...rest } = props;
  const isDisabled = rest.disabled ?? false;
  const colors = useColors();

  return (
    <Link
      style={[
        linkButtonStyles.button,
        { opacity: isDisabled ? "0.4" : "1" },
        {
          backgroundColor: colors.buttonBackground,
          borderColor: colors.buttonBorder,
        },
        style,
      ]}
      {...rest}
    >
      <Text style={[linkButtonStyles.text, { color: colors.text }]}>
        {children}
      </Text>
    </Link>
  );
}

export const linkButtonStyles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
});
