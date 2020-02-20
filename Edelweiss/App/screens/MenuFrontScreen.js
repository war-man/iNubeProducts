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
  import {createBottomTabNavigator,} from 'react-navigation-tabs'
import Icon from "react-native-vector-icons/FontAwesome";

import ClaimScreen from './ClaimScreen.js';
import PaymentSettings from './PaymentSettings.js';
import BillingScreen from './BillingScreen.js';
import VehicleSchedule from './VehicleSchedule.js'





export default class MenuFrontScreen extends Component {

    render(){
        return(
            
           
                <AppContainer  />
            
           

        );
    }
}


const bottomTabNavigator = createBottomTabNavigator(
    {
      DashBoard: {
        screen: FrontScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon name="home" size={25} color={tintColor} 
                  
            />
          )
        }
      },
      Claims: {
        screen: ClaimScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon name="comments" size={25} color={tintColor} />
          )
        }
      },
      Payment: {
        screen: PaymentSettings,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon name="money" size={25} color={tintColor} />
          )
        }
      },
      Billing: {
        screen: BillingScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon name="search" size={25} color={tintColor} />
          )
        }
      },
    },
    {
      initialRouteName: 'DashBoard',
      tabBarOptions: {
        activeTintColor: '#eb6e3d'
      }
    }
  );

  
  
  const AppContainer = createAppContainer(bottomTabNavigator);