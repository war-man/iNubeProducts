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
import { Dropdown } from 'react-native-material-dropdown';
import AsyncStorage from '@react-native-community/async-storage';


export default class BillingScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "stateCode": "",
      "si": "",
      "noOfPC": "1",
      "noOfTW": "0",
      "driverAge": "",
      "driverExp": "",
      "additionalDriver": "0",
      "billingFrequency": "",
      'premium':''
    };

  }

  retrieveData = async () => {
    try {
      console.log('function called');
      let valSI = await AsyncStorage.getItem('LocalSI')
      let valDriverAge = await AsyncStorage.getItem('LocalDriverAge')
      let valLocExp = await AsyncStorage.getItem('LocalExp')
      let valLocfreq = await AsyncStorage.getItem('LocalFrequency')
      let LocalMobile = await AsyncStorage.getItem('LocalMobileNumber')
      console.log(LocalMobile);
      this.setState({si:valSI,driverAge:valDriverAge,driverExp:valLocExp,billingFrequency:valLocfreq})
      
      console.log('data',this.state)
      this.CalCulatePremium();

      if (values !== null) {
        // We have data!!
        console.log('success');
      }
    } catch (error) {
      // Error retrieving data
      console.log('not called');
    }
  };


  CalCulatePremium = () => {

    // this.retrieveData

    console.log('state: ', this.state);

    fetch("http://mica-publi-11qa3l637dqw3-293834673.ap-south-1.elb.amazonaws.com:9025/api/Mica_EGI/CalCulatePremium", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI5NTc4NmM2OS0xNjAxLTQzMGQtODM1Ni01M2RlNDUyZjUxZTYiLCJFbWFpbCI6InZpdGFsQGludWJlc29sdXRpb25zLmNvbSIsIk9yZ0lkIjoiMTEyIiwiUGFydG5lcklkIjoiMCIsIlJvbGUiOiJEZW1vIFJvbGUiLCJOYW1lIjoidml0aGFsIiwiVXNlck5hbWUiOiJ2aXRhbEBpbnViZXNvbHV0aW9ucy5jb20iLCJQcm9kdWN0VHlwZSI6Ik1pY2EiLCJTZXJ2ZXJUeXBlIjoiMSIsImV4cCI6MTY3MDY1NDMzMCwiaXNzIjoiSW51YmUiLCJhdWQiOiJJbnViZU1JQ0EifQ.nZsItQ97TGtSZ-IrZ8SlDeOCIKnaCI4tmeLC953z9qA'
      },
        body: JSON.stringify(this.state),
      },
    ).then(res => {
      if(res.status === 200){
        res.json().then(data => {
        console.log(data);
        this.setState({premium: data.perDayPremium});
        
      });
    }else{
      console.log('status: ', res.status)
    }
    });

  }


  componentDidMount() {
    this.retrieveData();
    // this.CalCulatePremium();

  }


  render() {
    console.log(this.state)

    // let premium = 36
    // let data = [{
    //   value: '3lakhs',
    // }, { value: '4lakhs', }, { value: '5lakhs' }];
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          cost per day post  addition/deletion of driver/vehicle.
          </Text>

        <View>
          <Text>your premium has change {this.state.premium} /- per day</Text>
          <Text>your SI is {this.state.si} </Text>

        </View>
        <View >
          <Button title="confirm"
            onPress={() => this.props.navigation.navigate('Front')}></Button>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,

    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});