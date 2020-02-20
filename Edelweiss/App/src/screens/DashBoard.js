import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import MaterialRadio1 from "../components/MaterialRadio1";
import MaterialSwitch2 from "../components/MaterialSwitch2";

function DashBoard(props) {
  return (
    <View style={styles.container}>
      <View style={styles.materialRadio1Row}>
        <MaterialRadio1 style={styles.materialRadio1}></MaterialRadio1>
        <MaterialRadio1 style={styles.materialRadio5}></MaterialRadio1>
        <MaterialRadio1 style={styles.materialRadio4}></MaterialRadio1>
        <MaterialRadio1 style={styles.materialRadio3}></MaterialRadio1>
        <MaterialRadio1 style={styles.materialRadio2}></MaterialRadio1>
        <MaterialRadio1 style={styles.materialRadio6}></MaterialRadio1>
        <MaterialRadio1 style={styles.materialRadio7}></MaterialRadio1>
      </View>
      <View style={styles.s7Row}>
        <Text style={styles.s7}>S</Text>
        <Text style={styles.s}>M</Text>
        <View style={styles.loremIpsumStack}>
          <Text style={styles.loremIpsum}>Lorem Ipsum</Text>
          <Text style={styles.loremIpsum2}>T</Text>
          <Text style={styles.s3}>W</Text>
        </View>
        <Text style={styles.s4}>T</Text>
        <Text style={styles.s5}>F</Text>
        <Text style={styles.s6}>S</Text>
      </View>
      <View style={styles.rectRow}>
        <View style={styles.rect}>
          <Text style={styles.selectYourCover}>Select Your Cover</Text>
        </View>
        <View style={styles.rect1}>
          <Text style={styles.selectYourCover1}>1800 2333 222888</Text>
          <Text style={styles.selectYourCover2}>RSA</Text>
        </View>
      </View>
      <View style={styles.selectYourCover3Row}>
        <Text style={styles.selectYourCover3}>Insurance Cover</Text>
        <MaterialSwitch2 style={styles.materialSwitch2}></MaterialSwitch2>
      </View>
      <Image
        source={require("../assets/images/car.png")}
        resizeMode="contain"
        style={styles.image}
      ></Image>
      <Text style={styles.selectYourCover4}>
        1 Cliam On this vehicle{"\n"}SI Balance : 2,30,000
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  materialRadio1: {
    width: 40,
    height: 40,
    overflow: "visible"
  },
  materialRadio5: {
    width: 40,
    height: 40
  },
  materialRadio4: {
    width: 40,
    height: 40
  },
  materialRadio3: {
    width: 40,
    height: 40
  },
  materialRadio2: {
    width: 40,
    height: 40
  },
  materialRadio6: {
    width: 40,
    height: 40,
    marginLeft: 4
  },
  materialRadio7: {
    width: 40,
    height: 40,
    marginLeft: 8
  },
  materialRadio1Row: {
    height: 40,
    flexDirection: "row",
    marginTop: 618,
    marginLeft: 43,
    marginRight: 40
  },
  s7: {
    width: 8,
    height: 14,
    color: "#121212",
    fontFamily: "roboto-regular"
  },
  s: {
    width: 8,
    height: 14,
    color: "#121212",
    fontFamily: "roboto-regular",
    marginLeft: 36
  },
  loremIpsum: {
    top: 9,
    left: 0,
    color: "#121212",
    position: "absolute",
    fontFamily: "roboto-regular"
  },
  loremIpsum2: {
    top: 0,
    left: 11,
    width: 8,
    height: 14,
    color: "#121212",
    position: "absolute",
    fontFamily: "roboto-regular"
  },
  s3: {
    top: 0,
    left: 51,
    width: 8,
    height: 14,
    color: "#121212",
    position: "absolute",
    fontFamily: "roboto-regular"
  },
  loremIpsumStack: {
    width: 82,
    height: 23,
    marginLeft: 21
  },
  s4: {
    width: 8,
    height: 14,
    color: "#121212",
    fontFamily: "roboto-regular",
    marginLeft: 9
  },
  s5: {
    width: 8,
    height: 14,
    color: "#121212",
    fontFamily: "roboto-regular",
    marginLeft: 36
  },
  s6: {
    width: 8,
    height: 14,
    color: "#121212",
    fontFamily: "roboto-regular",
    marginLeft: 40
  },
  s7Row: {
    height: 23,
    flexDirection: "row",
    marginLeft: 55,
    marginRight: 56
  },
  rect: {
    width: 160,
    height: 147,
    backgroundColor: "rgba(230, 230, 230,1)"
  },
  selectYourCover: {
    width: 110,
    height: 32,
    color: "#121212",
    fontSize: 18,
    fontFamily: "arial-regular",
    lineHeight: 15,
    textAlign: "center",
    marginTop: 74,
    marginLeft: 25
  },
  rect1: {
    width: 160,
    height: 147,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginLeft: 23
  },
  selectYourCover1: {
    width: 110,
    height: 32,
    color: "#121212",
    fontSize: 13,
    fontFamily: "arial-regular",
    lineHeight: 15,
    textAlign: "center",
    marginTop: 23,
    marginLeft: 21
  },
  selectYourCover2: {
    width: 110,
    height: 32,
    color: "#121212",
    fontSize: 18,
    fontFamily: "arial-regular",
    lineHeight: 15,
    textAlign: "center",
    marginTop: 35,
    marginLeft: 25
  },
  rectRow: {
    height: 147,
    flexDirection: "row",
    marginTop: -260,
    marginLeft: 19,
    marginRight: 13
  },
  selectYourCover3: {
    width: 144,
    height: 32,
    color: "#121212",
    fontSize: 18,
    fontFamily: "arial-regular",
    lineHeight: 15,
    textAlign: "left",
    marginTop: 7
  },
  materialSwitch2: {
    width: 45,
    height: 23,
    marginLeft: 86
  },
  selectYourCover3Row: {
    height: 39,
    flexDirection: "row",
    marginTop: -220,
    marginLeft: 43,
    marginRight: 57
  },
  image: {
    width: 248,
    height: 184,
    marginTop: -348,
    marginLeft: 63
  },
  selectYourCover4: {
    width: 132,
    height: 32,
    color: "#121212",
    fontSize: 12,
    fontFamily: "arial-regular",
    lineHeight: 15,
    textAlign: "left",
    marginTop: 32,
    marginLeft: 188
  }
});

export default DashBoard;
