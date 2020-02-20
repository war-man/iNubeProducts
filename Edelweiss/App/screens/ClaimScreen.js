import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import CupertinoButtonInfo1 from "../src/components/CupertinoButtonInfo1";
import CupertinoButtonInfo2 from "../src/components/CupertinoButtonInfo2";
import CupertinoButtonInfo3 from "../src/components/CupertinoButtonInfo3";
import CupertinoButtonInfo4 from "../src/components/CupertinoButtonInfo4";
import { colors } from "react-native-elements";


export default class ClaimScreen extends Component{

 
render(){
  return (
    <View style={styles.container}>
      <CupertinoButtonInfo1
        text1="Check status of my claim"
        style={styles.cupertinoButtonInfo1}
      ></CupertinoButtonInfo1>
      <CupertinoButtonInfo2
        text1="RSA"
        style={styles.cupertinoButtonInfo2}
      ></CupertinoButtonInfo2>
      <CupertinoButtonInfo3
        text1="Call customer support  "
        style={styles.cupertinoButtonInfo3}
      ></CupertinoButtonInfo3>

      <View >
      <TouchableOpacity  onPress={() => this.props.navigation.navigate('Intimation')} text1="Claim Online"
        style={styles.cupertinoButtonInfo4} >

        <Text style = {{fontSize: 16, color: '#ffffff', marginLeft: 50}}>
            Claim Online
        </Text>
       
        
        
     
      </TouchableOpacity>

      </View>
      
      
    </View>
  );
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cupertinoButtonInfo1: {
    width: 277,
    height: 106,
    marginTop: 87,
    alignSelf: "center"
  },
  cupertinoButtonInfo2: {
    width: 124,
    height: 44,
    marginTop: 54,
    alignSelf: "center"
  },
  cupertinoButtonInfo3: {
    width: 228,
    height: 75,
    marginTop: 56,
    alignSelf: "center"
  },
  cupertinoButtonInfo4: {
    width: 136,
    height: 44,
    marginTop: 46,
    alignSelf: "center",
    backgroundColor: '#007AFF'
    
  }
});


