import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

function CupertinoButtonInfo(props) {
  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
    ></TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    borderRadius: 5
  }
});

export default CupertinoButtonInfo;
