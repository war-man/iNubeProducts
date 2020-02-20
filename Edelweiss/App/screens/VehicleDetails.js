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

import React, { Component } from 'react';
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


export default class VehicleDetails extends Component {

  render() {
    return (

      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#ecf0f1',
      }}>
        <Text style={{ marginTop: -50 }}>Your Vehicle Details</Text>
        <View>
          <Image
            style={{ width: 150, height: 60, }}
            source={require('../src/assets/images/car.png')}
          />

        </View>


        <Text>Vehicle Number</Text>



        <Text style={{ color: 'grey' }}></Text>
        <TextInput style={{
          width: 250,
          height: 44,
          padding: 10,
          marginBottom: 10,
          backgroundColor: 'grey'
        }}
          // value={this.state.vehicleno}
          // onChangeText={(vehicleno) => this.setState({ vehicleno })}
          placeholder={''}
        />
        <Text style={{ marginTop: 10 }}>Make & Model</Text>
        <Text style={{ color: 'grey' }}></Text>
        <TextInput style={{
          width: 250,
          height: 44,
          padding: 10,
          marginBottom: 10,
          backgroundColor: 'grey'
        }}
          //value={this.state.make}
          // onChangeText={(make) => this.setState({ make })}
          // placeholder={''}
          keyboardType={'decimal-pad'}
        />
        <Text>Year of Registration</Text>
        <Text style={{ color: 'grey' }}></Text>
        <TextInput style={{
          width: 250,
          height: 44,
          padding: 10,
          marginBottom: 10,
          backgroundColor: 'grey'
        }}
          // value={this.state.yor}
          // onChangeText={(yor) => this.setState({ yor })}
          placeholder={''}
          maxLength={4}
          keyboardType={'numeric'}
        />
        <View >
          <Button

            title="Done"
            color="#009933"
            onPress={() => this.props.navigation.navigate('VImage')}
          />
        </View>
      </View>

    );
  }
}
