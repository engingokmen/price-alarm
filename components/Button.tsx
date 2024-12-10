import React from "react";
import { Text, StyleSheet, Pressable, PressableProps } from "react-native";

interface ButtonProps extends PressableProps {
  onPress: () => void;
  title?: string;
}

export default function Button(props: ButtonProps) {
  const { title = "Save", style = {} as any, ...rest } = props;
  return (
    <Pressable style={[styles.button, style]} {...rest}>
      <Text style={styles.text}>{title}</Text>
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
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
