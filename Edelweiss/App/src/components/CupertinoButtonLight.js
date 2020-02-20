import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

function CupertinoButtonLight(props) {
  return (
    <TouchableOpacity
      /* Conditional navigation not supported at the moment */ style={[
        styles.container,
        props.style
      ]}
    ></TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFEFF4",
    paddingRight: 16,
    paddingLeft: 16,
    borderRadius: 5
  }
});

export default CupertinoButtonLight;
