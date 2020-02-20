//import * as React from 'react';
//import { Text, View, StyleSheet,Button } from 'react-native';
//import Constants from 'expo-constants';
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
  
  } from 'react-native/Libraries/NewAppScreen';
  import {
    Container,
    Item,
    Input,
    Icon
  } from 'native-base'
  
  import { createAppContainer } from 'react-navigation';
  import { createStackNavigator } from 'react-navigation-stack';
  
  /**
   * Sample React Native App
   * https://github.com/facebook/react-native
   *
   * @format
   * @flow
   */
  
  import React, {Component} from 'react';
  import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    style,
    Text,
    Image,
    Button,
    Alert,
    ActivityIndicator,
    TouchableOpacity,
    Picker,
    
    
    //Component,
    StatusBar,
    Linking,
  } from 'react-native';
  import { CheckBox } from 'react-native-elements';
  import { TextInput } from 'react-native-gesture-handler';
  import OtpInputs from "react-native-otp-inputs";


// You can import from local files

// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';

export default class PaymentSettings extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        
        
        <View style={styles.buttonContainer}>
          <Button title="Change my Credit Card/Bank Details"/>
</View><View style={styles.buttonContainer}>
          <Button title="Change my payment type"/>
  </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    
   
    padding: 8,
  },
  buttonContainer:{
    paddingTop: 5,
    paddingBottom: 5,
    marginTop:40,
    justifyContent: 'center',
     marginLeft:30,
    marginRight:30,
    backgroundColor:'#00BCD4',
    borderRadius:10,
    borderWidth: 1,
    
  },
 
});
