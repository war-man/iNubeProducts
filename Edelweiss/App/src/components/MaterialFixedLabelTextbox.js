import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

function MaterialFixedLabelTextbox(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.label}>{props.text1 || "FixedLabel"}</Text>
      <TextInput
        placeholder={props.textInput1 || undefined}
        style={styles.inputStyle}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flexDirection: "row",
    paddingLeft: 16,
    borderColor: "#D9D5DC",
    borderBottomWidth: 1
  },
  label: {
    color: "#000",
    alignSelf: "flex-start",
    opacity: 0.5,
    paddingTop: 16,
    paddingBottom: 8,
    fontSize: 16,
    fontFamily: "roboto-regular",
    lineHeight: 16
  },
  inputStyle: {
    flex: 1,
    color: "#000",
    alignSelf: "stretch",
    paddingTop: 14,
    paddingRight: 5,
    paddingBottom: 8,
    paddingLeft: 30,
    fontSize: 16,
    fontFamily: "roboto-regular",
    lineHeight: 16
  }
});

export default MaterialFixedLabelTextbox;
