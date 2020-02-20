import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import CupertinoSwitch from "../src/components/CupertinoSwitch";
import CupertinoSwitch1 from "../src/components/CupertinoSwitch1";



export default class NotificationScreen extends Component {


render() {
  return (
    <View style={styles.container}>
      <View style={styles.disableRow}>
        <Text style={styles.disable}>Disable System {"\n"}Notifications</Text>
        <CupertinoSwitch style={styles.cupertinoSwitch}></CupertinoSwitch>
      </View>
      <View style={styles.disable2Row}>
        <Text style={styles.disable2}>Disable Cover {"\n"}Notifications</Text>
        <CupertinoSwitch1 style={styles.cupertinoSwitch1}></CupertinoSwitch1>
      </View>
      <View style={styles.loremIpsumStack}>
        <Text style={styles.loremIpsum}>Lorem Ipsum</Text>
        <Text style={styles.loremIpsum3}>Lorem Ipsum</Text>
      </View>
      <Text style={styles.loremIpsum2}>Lorem Ipsum</Text>
    </View>
  );
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  disable: {
    color: "#121212",
    fontSize: 25,
    fontFamily: "roboto-regular"
  },
  cupertinoSwitch: {
    width: 45,
    height: 23,
    marginLeft: 74,
    marginTop: 13
  },
  disableRow: {
    height: 50,
    flexDirection: "row",
    marginTop: 124,
    marginLeft: 20,
    marginRight: 37
  },
  disable2: {
    color: "#121212",
    fontSize: 25,
    fontFamily: "roboto-regular"
  },
  cupertinoSwitch1: {
    width: 45,
    height: 23,
    marginLeft: 93,
    marginTop: 14
  },
  disable2Row: {
    height: 50,
    flexDirection: "row",
    marginTop: 39,
    marginLeft: 20,
    marginRight: 37
  },
  loremIpsum: {
    top: 0,
    left: 14,
    color: "#121212",
    position: "absolute",
    fontSize: 25,
    fontFamily: "roboto-regular"
  },
  loremIpsum3: {
    top: 0,
    left: 0,
    color: "#121212",
    position: "absolute",
    fontSize: 25,
    fontFamily: "roboto-regular"
  },
  loremIpsumStack: {
    width: 161,
    height: 25,
    marginTop: 56,
    marginLeft: 74
  },
  loremIpsum2: {
    color: "#121212",
    fontSize: 25,
    fontFamily: "roboto-regular",
    marginTop: 15,
    marginLeft: 177
  }
});

