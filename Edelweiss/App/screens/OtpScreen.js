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
  ImageBackground,

  //Component,
  StatusBar,
  Linking,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {TextInput} from 'react-native-gesture-handler';
import OtpInputs from 'react-native-otp-inputs';
import AsyncStorage from '@react-native-community/async-storage';

export default class OtpScreen extends Component {
  state = {
    otpMobile: '',
    mobileNo: '',
  };

  componentDidMount() {
    this.retrieveData();
  }

  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('LocalMobileNumber');

      console.log('Log', value);
      this.setState({mobileNo: value});
      if (value !== null) {
        // We have data!!
        console.log('Otp verify', value);
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };

  verifyOtp = () => {
    this.retrieveData();
    console.log('mobileno', this.state.mobileNo);
    fetch(
      'http://mica-publi-11qa3l637dqw3-293834673.ap-south-1.elb.amazonaws.com:9025/api/Mica_EGI/VerifyingOTP',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactNumber: this.state.mobileNo,
          otp: this.state.otpMobile,
        }),
      },
    ).then(res => {
      if (res.status === 200) {
        res.json().then(data => {
          console.log(data);
          // this.setState({otpServer: data.sendOtp.otp});
          if (data.responseMessage === 'OTP verified successfully!') {
            Alert.alert('OTP verified successfully!');
            this.props.navigation.navigate('Driver');
          } else {
            {
              Alert.alert('Please enter valid OTP');
            }
          }
        });
      } else {
        console.log('server respone error: ', res.status);
      }
    });
  };

  reSendOtp = () => {
    console.log('Clicked reSendOpt');
    fetch(
      'http://mica-publi-11qa3l637dqw3-293834673.ap-south-1.elb.amazonaws.com:9025/api/Mica_EGI/ResetOTP',
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
      console.log('HelloWorld', res.status);
      if (res.status === 200) {
        res.json().then(data => {
          console.log(data);
          Alert.alert('Otp re-sended');
        });
      } else if (res.status === 204) {
        Alert.alert('Otp re-send failed');
      } else {
        Alert.alert('Something went wrong!!');
      }
    });
  };

  render() {
    return (
      <ImageBackground
        source={require('../images/otp.jpg')}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <Text
          style={{
            width: 150,
            height: 30,
            marginTop: 300,
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 135,
            color: '#fff',
            fontFamily: 'Roboto-Bold',
          }}>
          OTP Verification
        </Text>
        <Text
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 350,
            height: 45,
            marginTop: 7,
            fontSize: 18,
            marginLeft: 50,
            fontFamily: 'sans-serif',
            color: '#fff',
          }}>
          Enter the OTP Sent to : +91 {this.state.mobileNo}
        </Text>

        <View>
          <OtpInputs //style={{width: 100, height: 100, borderColor: '#fff'}}
            handleChange={code => this.setState({otpMobile: code})}
            numberOfInputs={6}
          />
        </View>

        <View>
          <Text
            style={{
              width: 350,
              height: 40,
              fontSize: 12,
              marginLeft: 150,
              marginTop: 40,
            }}>
            Did'nt Recive the OTP?
          </Text>
          <Text
            style={{
              width: 350,
              height: 40,
              fontSize: 12,
              marginLeft: 180,
              marginTop: 0,
              color: '#e7ab37',
            }}
            onPress={this.reSendOtp}>
            Re-send
          </Text>
        </View>

        <View
          style={{
            width: 230,
            paddingTop: 5,
            marginLeft: 90,
            marginRight: 10,
            borderRadius: 100,
          }}>
          <TouchableOpacity
            style={{
              marginTop: 10,
              paddingTop: 15,
              paddingBottom: 15,
              marginLeft: '20%',
              marginRight: '20%',
              backgroundColor: '#ff0066',
              borderRadius: 50,
              borderWidth: 1,
              borderColor: '#fff',
            }}
            activeOpacity={0.5}
            onPress={this.verifyOtp}>
            <Text style={{color: '#fff', textAlign: 'center'}}> Submit </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 10,
              paddingTop: 15,
              paddingBottom: 15,
              marginLeft: '20%',
              marginRight: '20%',
              backgroundColor: '#ff0066',
              borderRadius: 50,
              borderWidth: 1,
              borderColor: '#fff',
            }}
            activeOpacity={0.5}
            onPress={() => this.props.navigation.navigate('Driver')}>
            <Text style={{color: '#fff', textAlign: 'center'}}> Submit </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
