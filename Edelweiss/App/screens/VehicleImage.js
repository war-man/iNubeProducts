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


export default class VehicleImage extends Component
  {
    render(){
     
        return (
          
         <View >
           <Text style = {{marginTop: 50, fontSize: 18, marginLeft: 25}}> Your Vehicle has been added successfully </Text>
                 
               
         <View style = {{width: 150, marginLeft: 120, marginTop: 20}}>
         
          <Button 
          title="Upload a video of your vehicle"
          color="grey"
          />
          </View>
          
          <TouchableOpacity  activeOpacity={1.5}>
        
          </TouchableOpacity>
    
            <Text >Add vehicle 2</Text>
                    <View >
                     <Button  
                            
                            title="Skip>>"  
                            color="blue"  
                        />  
            </View>
            <View >
                     <Button  
                            
                            title="Done"  
                            color="blue"  
                            onPress={() => this.props.navigation.navigate('Billing')}
                        />  
            </View>
          </View>
          
         
        );
      }
    }