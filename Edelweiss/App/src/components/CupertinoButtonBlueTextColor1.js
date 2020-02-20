import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function CupertinoButtonBlueTextColor1(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <Text style={styles.caption}>Button</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  caption: {
    color: "#007AFF",
    fontSize: 17,
    fontFamily: "roboto-500"
  }
});

export default CupertinoButtonBlueTextColor1;
