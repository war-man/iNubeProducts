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

import { Dropdown } from 'react-native-material-dropdown';

import { Divider } from 'react-native-elements';
 
export default class ClaimOnline extends Component {



 


render() {

  let data = [{
    value: 'Driver 1',
  }, {
    value: 'Driver 2',
  }, {
    value: 'Driver 3',
  }];
  let data1 = [{
    value: 'Vehicle 1',
  }, {
    value: 'Vehicle 2',
  }, {
    value: 'Vehicle 3',
  }];
  return (

    <View style = {{backgroundColor: '#fff', height : '100%'}}>
    
    <TouchableOpacity style = {{ width: '35%', height: '5%', marginLeft: '10%', marginTop: '10%'}}>
    <Text style = {{color: '#e9e9e9',
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0.1,
    marginLeft: '10%'}}
    onPress={() => this.props.navigation.navigate('CStatus')}>
        Claim Status
    </Text>
    </TouchableOpacity>
    
    <TouchableOpacity style = {{ width: '35%', height: '5%', marginLeft: '50%', marginTop: '-9%'}}>
    <Text style = {{color: '#e7ab37',
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0.1,
    marginLeft: '10%'}}>
        Claim Online
    </Text>
    </TouchableOpacity>
    
    

    <View style = {{backgroundColor: '#fff' ,marginTop: '30%', width: '80%', marginLeft:'10%'}}>

    <Dropdown 
        label='Select Driver'
        data={data}
      />

      </View>

<View style = {{backgroundColor: '#fff' ,marginTop: '10%', width: '80%', marginLeft:'10%'}}>

<Dropdown 
        label='Select Vehicle'
        data={data1}
      />

    </View>
    </View>
   
    
   

        

    

    
    
  )
}

 

}