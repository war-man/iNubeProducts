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
  
  
  
  import React, {Component, useEffect, Fragment} from 'react';
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



  export default class SplashScreen extends Component {

    constructor(props) {
        super(props);
    }

    async componentWillMount() {
        _.delay(() => this.props.navigator.replace({ component: 'Home' }), 1000);
    }

    render() {
        return (
            <View>
             <Image source={require('../images/splash.png')}>


</Image>

            </View>
            
           
        );
    }
}