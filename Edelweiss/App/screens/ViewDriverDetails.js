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
import { CheckBox } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import OtpInputs from 'react-native-otp-inputs';
import { Dropdown } from 'react-native-material-dropdown';
import AsyncStorage from '@react-native-community/async-storage';
import { Divider } from 'react-native-elements';



export default class ViewDriverDetails extends Component {
    render() {
        return (



            <View style = {{backgroundColor: '#fff'}}>
            <View>
                    <Text style={{
                        width: '25%',
                        height: '10%',
                        color: '#414141',
                        fontFamily: 'Roboto',
                        fontSize: 16,
                        fontWeight: '500',
                        marginTop: '10%',
                        marginLeft: '37%'
                    }}>
                        Driver Details
                    </Text>
                </View>
                 <TouchableOpacity
              onPress={() => this.props.navigation.navigate('DriverDetails')}
              style={{
                width: 160,
                height: 40,
                borderRadius: 50,
                backgroundColor: '#e7ab37',
                marginLeft: 125, marginTop: -30
              }}>
 <Image style={{ width: 30, height: 30, marginLeft: 35, marginTop: 5 }} source={require('../images/DriverIcon.png')}></Image>
    

            </TouchableOpacity>
            <TouchableOpacity style={{
              width: 210,
              width: 92,
              height: 42,
              borderRadius: 50,
              backgroundColor: '#f8f8f8', marginLeft: 200, marginTop: -40
            }}
            onPress={() => this.props.navigation.navigate('Front')}>
              <Image style={{ width: 35, height: 30, marginLeft: 30, marginTop: 5 }} source={require('../images/car.png')}></Image>
            </TouchableOpacity>

                
                <View>
                    <TouchableOpacity style={{
                        width: '25%',
                        height: '37%',
                        backgroundColor: '#c4c4c4',
                        marginLeft: '8%',
                        marginTop: '10%',
                        borderRadius: 15
                    }}>

                    </TouchableOpacity>
                    <Text style=
                        {{
                            marginLeft: '38%',
                            color: '#414141',
                            fontFamily: 'Roboto',
                            fontSize: 24,
                            fontWeight: '700',
                            marginTop: '-32%'
                        }}>
                        Mr. Driver Name
                </Text>
                    <Text style={{
                        color: '#bdbdbd',
                        fontFamily: 'Roboto',
                        fontSize: 14,
                        fontWeight: '500',
                        marginLeft: '38%',
                        marginTop: '2%'
                    }}>
                        Car Model
                </Text>
                    <Text style={{
                        color: '#8dc2ff',
                        fontFamily: 'Roboto',
                        fontSize: 12,
                        fontWeight: '500',
                        marginLeft: '38%',
                        marginTop: '8%'
                    }}>
                        Files
                </Text>
                <Text style={{
                        color: '#8dc2ff',
                        fontFamily: 'Roboto',
                        fontSize: 12,
                        fontWeight: '500',
                        marginLeft: '52%',
                        marginTop: '-3.5%'
                    }}>
                        Edit
                </Text>
                <Text style={{
                        color: '#8dc2ff',
                        fontFamily: 'Roboto',
                        fontSize: 12,
                        fontWeight: '500',
                        marginLeft: '66%',
                        marginTop: '-3.7%'
                    }}>
                        Delete
                </Text>

                
                </View>

                <View style = {{marginTop: '-30%'}}>
                    <TouchableOpacity style={{
                        width: '25%',
                        height: '28%',
                        backgroundColor: '#c4c4c4',
                        marginLeft: '8%',
                        marginTop: '10%',
                        borderRadius: 15
                    }}>

                    </TouchableOpacity>
                    <Text style=
                        {{
                            marginLeft: '38%',
                            color: '#414141',
                            fontFamily: 'Roboto',
                            fontSize: 24,
                            fontWeight: '700',
                            marginTop: '-32%'
                        }}>
                        Mr. Driver Name
                </Text>
                    <Text style={{
                        color: '#bdbdbd',
                        fontFamily: 'Roboto',
                        fontSize: 14,
                        fontWeight: '500',
                        marginLeft: '38%',
                        marginTop: '2%'
                    }}>
                        Car Model
                </Text>
                    <Text style={{
                        color: '#8dc2ff',
                        fontFamily: 'Roboto',
                        fontSize: 12,
                        fontWeight: '500',
                        marginLeft: '38%',
                        marginTop: '8%'
                    }}>
                        Files
                </Text>
                <Text style={{
                        color: '#8dc2ff',
                        fontFamily: 'Roboto',
                        fontSize: 12,
                        fontWeight: '500',
                        marginLeft: '52%',
                        marginTop: '-3.5%'
                    }}>
                        Edit
                </Text>
                <Text style={{
                        color: '#8dc2ff',
                        fontFamily: 'Roboto',
                        fontSize: 12,
                        fontWeight: '500',
                        marginLeft: '66%',
                        marginTop: '-3.7%'
                    }}>
                        Delete
                </Text>

                
                </View>

                <View style = {{marginTop: '-30%'}}>
                    <TouchableOpacity style={{
                        width: '25%',
                        height: '28%',
                        backgroundColor: '#c4c4c4',
                        marginLeft: '8%',
                        marginTop: '10%',
                        borderRadius: 15
                    }}>

                    </TouchableOpacity>
                    <Text style=
                        {{
                            marginLeft: '38%',
                            color: '#414141',
                            fontFamily: 'Roboto',
                            fontSize: 24,
                            fontWeight: '700',
                            marginTop: '-32%'
                        }}>
                        Mr. Driver Name
                </Text>
                    <Text style={{
                        color: '#bdbdbd',
                        fontFamily: 'Roboto',
                        fontSize: 14,
                        fontWeight: '500',
                        marginLeft: '38%',
                        marginTop: '2%'
                    }}>
                        Car Model
                </Text>
                    <Text style={{
                        color: '#8dc2ff',
                        fontFamily: 'Roboto',
                        fontSize: 12,
                        fontWeight: '500',
                        marginLeft: '38%',
                        marginTop: '8%'
                    }}>
                        Files
                </Text>
                <Text style={{
                        color: '#8dc2ff',
                        fontFamily: 'Roboto',
                        fontSize: 12,
                        fontWeight: '500',
                        marginLeft: '52%',
                        marginTop: '-3.5%'
                    }}>
                        Edit
                </Text>
                <Text style={{
                        color: '#8dc2ff',
                        fontFamily: 'Roboto',
                        fontSize: 12,
                        fontWeight: '500',
                        marginLeft: '66%',
                        marginTop: '-3.7%'
                    }}>
                        Delete
                </Text>

                
                </View>

                <View style = {{marginTop: '-30%'}}>
                    <TouchableOpacity style={{
                        width: '25%',
                        height: '10%',
                        backgroundColor: '#c4c4c4',
                        marginLeft: '38%',
                        marginTop: '10%',
                        borderRadius: 15
                    }} onPress={() => this.props.navigation.navigate('CStatus')}>

                    </TouchableOpacity>
                </View>

                

                

                

            </View>

            







        )
    }
}

