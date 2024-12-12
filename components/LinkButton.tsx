import { Link, LinkProps } from "expo-router";
import React, { ReactNode } from "react";
import { Text, StyleSheet } from "react-native";

interface LinkProperties extends LinkProps {
  children?: ReactNode;
}

export default function LinkButton(props: LinkProperties) {
  const { children = "Save", style = {} as any, ...rest } = props;
  const isDisabled = rest.disabled ?? false;

  return (
    <Link
      style={[styles.button, style, { opacity: isDisabled ? "0.4" : "1" }]}
      {...rest}
    >
      <Text style={styles.text}>{children}</Text>
    </Link>
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
