import { useColors } from "@/hooks/useColors";
import React, { ReactNode } from "react";
import { Text, StyleSheet, Pressable, PressableProps } from "react-native";

interface ButtonProps extends PressableProps {
  onPress?: () => void;
  children?: ReactNode;
}

export default function Button(props: ButtonProps) {
  const { children = "Save", style = {} as any, ...rest } = props;
  const isDisabled = rest.disabled ?? false;
  const colors = useColors();

  return (
    <Pressable
      style={[
        styles.button,
        style,
        {
          backgroundColor: colors.buttonBackground,
          borderColor: colors.buttonBorder,
          opacity: isDisabled ? "0.4" : "1",
        },
      ]}
      {...rest}
    >
      <Text style={[styles.text, { color: colors.buttonText }]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
});
