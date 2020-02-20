import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Container, Item, Input, Icon} from 'native-base';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

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
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {TextInput} from 'react-native-gesture-handler';
import OtpInputs from 'react-native-otp-inputs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';

export default class LoginScreen extends Component {
  state = {
    mobileNo: '',
  };

  //  storing Data local

  storeData = async () => {
    try {
      AsyncStorage.setItem('LocalMobileNumber', this.state.mobileNo);
      // this.retrieveData();
      console.log('stored fynction called');
      var value = await AsyncStorage.getItem('LocalMobileNumber');
      console.log(value);
    } catch (error) {
      // Error saving data
      console.log('Error in storing Data');
    }
  };

  // end storing local Data

  sendOtp = () => {
    console.log('mobileno', this.state.mobileNo);
    fetch(
      'http://mica-publi-11qa3l637dqw3-293834673.ap-south-1.elb.amazonaws.com:9025/api/Mica_EGI/SendOTP',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactNumber: this.state.mobileNo,
        }),
      },
    ).then(res => {
      console.log('HelloWorld',res.status)
      if(res.status === 200){
        res.json().then(data => {
          console.log(data);
          this.setState({otpServer: data.sendOtp.otp});
          this.storeData();
          this.props.navigation.navigate('Otp');
        });
      }else if(res.status === 204){
        Alert.alert('Please enter the valid mobile number')
      }
      else{
        Alert.alert('Something went wrong!!')
      }

    });
  };

  render() {
    console.log(this.state);
    return (
      <ImageBackground
        source={require('../images/login.jpg')}
        style={{
          width: wp('100%'),
          height: hp('100%'),
        }}>
        <KeyboardAvoidingView behavior="padding" enabled></KeyboardAvoidingView>

        <Text
          style={{
            width: (Dimensions.get('window').width = 200),
            height: (Dimensions.get('window').height = 35),
            marginTop: (Dimensions.get('window').height = 300),
            fontSize: 25,
            fontWeight: 'bold',
            marginLeft: 125,
            color: '#fff',
            fontFamily: 'Roboto-Bold',
          }}>
          OTP Verification
        </Text>
        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
            width: (Dimensions.get('window').width = 350),
            height: (Dimensions.get('window').height = 45),
            marginTop: (Dimensions.get('window').height = 7),
            fontSize: 18,
            marginLeft: (Dimensions.get('window').width = 30),
          }}>
          We will send you an One Time Password on this number
        </Text>

        <View>
          <TextInput
            // Adding hint in Text Input using Place holder.
            style={{
              width: 350,
              height: 43,
              backgroundColor: 'rgba(255, 255, 255, 0.19)',
              fontSize: 20,
              marginLeft: 32,
              marginTop: 20,
              paddingLeft: 10,
            }}
            placeholder="Enter Your Phone Number"
            keyboardType="numeric"
            onChangeText={text => this.setState({mobileNo: text})}
            value={this.state.mobileNo}
          />
        </View>
        <View
          style={{width: 230, paddingTop: 60, marginLeft: 75, marginRight: 10}}>
          <TouchableOpacity
            style={{
              width: (Dimensions.get('window').width = 350),
              height: (Dimensions.get('window').height = 44),
              borderRadius: 6,
              marginTop: (Dimensions.get('window').height = 20),
              marginLeft: (Dimensions.get('window').width = -45),
              backgroundColor: '#ff0066',
            }}
            activeOpacity={0.5}
            onPress={this.sendOtp}>
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                margin: (Dimensions.get('window').scale = 7),
                fontSize: 20,
                fontStyle: 'Roboto-Bold',
              }}>
              {' '}
              Get OTP{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
