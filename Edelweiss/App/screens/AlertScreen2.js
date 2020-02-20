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
  import { Dropdown } from 'react-native-material-dropdown';

 



export default class AlertScreen1 extends Component{
    render(){
        return(


            <View style = {{width: 330,
                height: 220,
                borderRadius: 26,
                backgroundColor: '#ffffff',
                marginTop: 170,
                marginLeft: 40 }}>
                <View  style = {{width: 40, height: 40, marginLeft: 135, marginTop: 20}}>
                <Image source={require('../images/right.png')}>

                </Image>

                </View>
                

                <Text style = {{width: 250,
                    height: 86,
                    color: '#595959',
                    fontFamily: 'Roboto',
                    fontSize: 22,
                    fontWeight: '400', marginLeft: 40, marginTop: 45, textAlign: 'center'}}>

                    Your Policy has been created successfully
                    
                </Text>
                <Text 
                        onPress={() => this.props.navigation.navigate('Front')}
                        style = {{width: 50,
                        height: 50,
                        color: '#595959',
                        fontFamily: 'Roboto-Bold',
                        fontSize: 30,
                        fontWeight: '900', marginTop: -25, marginLeft: 270}}>
                     ok
                </Text>

            
            </View>

        );
    }
}