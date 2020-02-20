import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import MaterialButtonShare2 from "../src/components/MaterialButtonShare2";
import MaterialButtonGrey3 from "../src/components/MaterialButtonGrey3";

export default class ViewLicense extends Component{
    render() {
        return (
            <View style={styles.container}>
              <Text>
                  Hii
              </Text>
            </View>
          );

    }
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    top: 0,
    left: 0,
    width: 160,
    height: 126,
    position: "absolute"
  },
  materialButtonShare2: {
    top: 55,
    left: 123,
    width: 48,
    height: 49,
    position: "absolute"
  },
  imageStack: {
    width: 171,
    height: 126,
    marginTop: 79,
    marginLeft: 100
  },
  driver1: {
    color: "#121212",
    fontFamily: "roboto-700",
    marginTop: 39,
    marginLeft: 156
  },
  loremIpsum: {
    color: "#121212",
    fontFamily: "roboto-700",
    marginTop: 19,
    marginLeft: 111
  },
  materialButtonGrey3: {
    width: 320,
    height: 36,
    backgroundColor: "rgba(15,15, 15,0)",
    shadowOpacity: 0.01,
    marginTop: 41,
    marginLeft: 30
  },
  materialButtonGrey32: {
    width: 320,
    height: 36,
    backgroundColor: "rgba(15,15, 15,0)",
    shadowOpacity: 0.01,
    marginTop: 38,
    marginLeft: 30
  },
  materialButtonGrey33: {
    width: 320,
    height: 36,
    backgroundColor: "rgba(15,15, 15,0)",
    shadowOpacity: 0.01,
    marginTop: 36,
    marginLeft: 30
  },
  materialButtonGrey34: {
    width: 320,
    height: 36,
    backgroundColor: "rgba(15,15, 15,0)",
    shadowOpacity: 0.01,
    marginTop: 35,
    marginLeft: 30
  },
  materialButtonGrey35: {
    width: 320,
    height: 36,
    backgroundColor: "rgba(15,15, 15,0)",
    borderColor: "rgba(7,7,7,1)",
    borderWidth: 0,
    shadowOpacity: 0.01,
    marginTop: 36,
    marginLeft: 30
  }
});


