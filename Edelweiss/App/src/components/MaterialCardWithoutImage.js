import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

function MaterialCardWithoutImage(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.bodyContent}>
        <Text style={styles.titleStyle}>Title goes here</Text>
        <Text style={styles.subtitleStyle}>Subtitle here</Text>
      </View>
      <View style={styles.body2}>
        <Text style={styles.bodyText}></Text>
      </View>
      <View style={styles.actionBody}>
        <TouchableOpacity style={styles.actionButton1}>
          <Text style={styles.actionText1}>ACTION 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton2}>
          <Text style={styles.actionText2}>ACTION 2</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexWrap: "nowrap",
    elevation: 3,
    borderRadius: 2,
    borderColor: "#CCC",
    borderWidth: 1,
    shadowOffset: {
      height: 2,
      width: -2
    },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    overflow: "hidden"
  },
  bodyContent: {
    justifyContent: "center",
    padding: 16,
    paddingTop: 24
  },
  titleStyle: {
    color: "#000",
    paddingBottom: 12,
    fontSize: 24,
    fontFamily: "roboto-regular"
  },
  subtitleStyle: {
    color: "#000",
    opacity: 0.5,
    fontSize: 14,
    fontFamily: "roboto-regular",
    lineHeight: 16
  },
  body2: {
    padding: 16,
    paddingTop: 8
  },
  bodyText: {
    color: "#424242",
    flexWrap: "wrap",
    fontSize: 14,
    lineHeight: 20
  },
  actionBody: {
    flexDirection: "row",
    padding: 8
  },
  actionButton1: {
    height: 36,
    padding: 8
  },
  actionText1: {
    color: "#000",
    opacity: 0.9,
    fontSize: 14
  },
  actionButton2: {
    height: 36,
    padding: 8
  },
  actionText2: {
    color: "#000",
    opacity: 0.9,
    fontSize: 14
  }
});

export default MaterialCardWithoutImage;
