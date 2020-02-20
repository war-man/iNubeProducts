import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Container, Item, Input, Icon } from 'native-base';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

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


import StepIndicator from 'react-native-step-indicator';
 
const labels = ["Cliam Intimated", 'Vehicle Inspection', 'Under Repair', 'Document Awaited', 'Claim under Process'];
const customStyles = {
  stepIndicatorSize: 50,
  currentStepIndicatorSize:40,
  separatorStrokeWidth: 3,
  
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: '#e7ab37',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#e7ab37',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#e7ab37',
  
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#e7ab37',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 20,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#000',
  labelSize: 15,
  currentStepLabelColor: '#fe7013',
  marginLeft: 10
}
 
 
export default class ClaimStatus extends Component {



 


render() {
  return (

    <View style = {{backgroundColor: '#fff'}}>
    <TouchableOpacity style = {{ width: '35%', height: '5%', marginLeft: '10%', marginTop: '10%'}}>
    <Text style = {{color: '#e7ab37',
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0.1,
    marginLeft: '10%'}}>
        Claim Status
    </Text>
    </TouchableOpacity>
    <TouchableOpacity style = {{ width: '35%', height: '5%', marginLeft: '50%', marginTop: '-8.5%'}}>
    <Text style = {{color: '#e9e9e9',
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0.1,
    marginLeft: '10%'}}
    onPress={() => this.props.navigation.navigate('COnline')}>
        Claim Online
    </Text>
    </TouchableOpacity>

   
    
    <View style = {{width : '100%', height: '90%', marginLeft: '0%',backgroundColor: '#fff',alignContent: 'center', paddingLeft: '30%',marginTop: '0%'}}>
   
    <StepIndicator 
         customStyles={customStyles}
         //currentPosition={this.state.currentPosition}
         labels={labels}
         direction = 'vertical'
         currentPosition = '2'
         
         
    />
     </View>

        

    </View>
    

    
    
  )
}

 

}