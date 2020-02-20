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

import {  createAppContainer } from 'react-navigation';
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
  Platform,


  //Component,
  StatusBar,
  Linking,
  AppRegistry,
} from 'react-native';

import { TextInput } from 'react-native-gesture-handler';

import { Dropdown } from 'react-native-material-dropdown';


import {createBottomTabNavigator,} from 'react-navigation-tabs'
import Icon from "react-native-vector-icons/FontAwesome";
import DashBoardScreen from './DashBoardScreen.js';
import ClaimScreen from './ClaimScreen.js';
import PaymentSettings from './PaymentSettings.js';
import BillingScreen from './BillingScreen.js';


import { SearchBar } from 'react-native-elements';

export default class FrontScreen extends Component {

  
  render() {


    return (




      <View style = {{backgroundColor: '#fff'}} >
      
      
        <View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={{
            width: 50,
            height: 50, backgroundColor: '#c4c4c4', borderRadius: 25, marginLeft: 15, marginTop: 15
          }}>

          </TouchableOpacity>
          <View style = {{backgroundColor: '#fff', marginLeft: '25%',marginTop: '-12%' }}>
      <SearchBar

      round = 'true'
      lightTheme = 'false'
        placeholder="Search for your Car"
        //showLoading = 'true'
        color = '#fff'
        platform = 'android'
        //onChangeText={this.updateSearch}
        //value={search}
      />

      </View>
        </View>

        <SafeAreaView>
          <ScrollView>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('DriverDetails')}
              style={{
                width: 160,
                height: 40,
                borderRadius: 50,
                backgroundColor: '#f8f8f8',
                marginLeft: 130, marginTop: 0
              }}>
              <Image style={{ width: 30, height: 30, marginLeft: 35, marginTop: 5 }} source={require('../images/DriverIcon.png')}></Image>
              

            </TouchableOpacity>
            <TouchableOpacity style={{
              width: 210,
              width: 92,
              height: 39,
              borderRadius: 50,
              backgroundColor: '#e7ab37', marginLeft: 210, marginTop: -40
            }}>
              <Image style={{ width: 30, height: 30, marginLeft: 30, marginTop: 5 }} source={require('../images/car.png')}></Image>
            </TouchableOpacity>

            <Text style={{
              width: 50,
              height: 30,
              color: '#626262',
              fontFamily: 'Roboto',
              fontSize: 20,
              fontWeight: '700', marginLeft: 20, marginTop: 10
            }}>

              Cars

                  </Text>

            <TouchableOpacity style={{
              width: 350,
              height: 150, marginLeft: 30, backgroundColor: 'grey', marginTop: 10
            }}
              onPress={() => this.props.navigation.navigate('Schedule')}>

              <Image style={{ width: 350, height: 150 }} source={require('../images/vehicle.png')}></Image>

              <Text style={{
                width: 133,
                height: 17,
                color: '#ffffff',
                fontFamily: 'Roboto',
                fontSize: 16,
                fontWeight: '700', marginLeft: 15, marginTop: -90
              }}>
                Vehicle Number
                                          </Text>

              <Text style={{
                width: 70,
                height: 12,
                color: '#ffffff',
                fontFamily: 'Roboto',
                fontSize: 10,
                fontWeight: '700', marginLeft: 15, marginTop: 10
              }}>

                Car Model
                                          </Text>
              <Text style={{
                width: 100,
                height: 20,
                color: '#ffffff',
                fontFamily: 'Roboto',
                fontSize: 15,
                fontWeight: '700', marginLeft: 15, marginTop: 10
              }}>
                Covered Days
                                          </Text>


              <TouchableOpacity style={{
                width: 25,
                height: 8,
                borderRadius: 6,
                backgroundColor: '#e7ab37', marginLeft: 10, marginTop: 5
              }}>
                <Text style={{
                  width: 11,
                  height: 7,
                  color: '#ffffff',
                  fontFamily: 'Roboto',
                  fontSize: 6,
                  fontWeight: '700', marginLeft: 8, marginTop: -1
                }}>
                  S
                                                            </Text>

              </TouchableOpacity>
              <TouchableOpacity style={{
                width: 25,
                height: 8,
                borderRadius: 6,
                backgroundColor: 'rgba(105, 105, 105, 0.6)', marginLeft: 40, marginTop: -7
              }}>
                <Text style={{
                  width: 11,
                  height: 7,
                  color: '#ffffff',
                  fontFamily: 'Roboto',
                  fontSize: 6,
                  fontWeight: '700', marginLeft: 8, marginTop: -1
                }}>
                  M
                                                            </Text>

              </TouchableOpacity>
              <TouchableOpacity style={{
                width: 25,
                height: 8,
                borderRadius: 6,
                backgroundColor: '#e7ab37', marginLeft: 70, marginTop: -8
              }}>

                <Text style={{
                  width: 11,
                  height: 7,
                  color: '#ffffff',
                  fontFamily: 'Roboto',
                  fontSize: 6,
                  fontWeight: '700', marginLeft: 9, marginTop: -1
                }}>
                  T
                                                            </Text>

              </TouchableOpacity>
              <TouchableOpacity style={{
                width: 25,
                height: 8,
                borderRadius: 6,
                backgroundColor: '#e7ab37', marginLeft: 100, marginTop: -8
              }}>
                <Text style={{
                  width: 11,
                  height: 7,
                  color: '#ffffff',
                  fontFamily: 'Roboto',
                  fontSize: 6,
                  fontWeight: '700', marginLeft: 9, marginTop: -1
                }}>
                  W
                                                            </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                width: 25,
                height: 8,
                borderRadius: 6,
                backgroundColor: 'rgba(105, 105, 105, 0.6)', marginLeft: 130, marginTop: -8
              }}>
                <Text style={{
                  width: 11,
                  height: 7,
                  color: '#ffffff',
                  fontFamily: 'Roboto',
                  fontSize: 6,
                  fontWeight: '700', marginLeft: 10, marginTop: -1
                }}>
                  T
                                                            </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                width: 25,
                height: 8,
                borderRadius: 6,
                backgroundColor: 'rgba(105, 105, 105, 0.6)', marginLeft: 160, marginTop: -8
              }}>
                <Text style={{
                  width: 11,
                  height: 7,
                  color: '#ffffff',
                  fontFamily: 'Roboto',
                  fontSize: 6,
                  fontWeight: '700', marginLeft: 10, marginTop: -1
                }}>
                  F
                                                            </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                width: 25,
                height: 8,
                borderRadius: 6,
                backgroundColor: '#e7ab37', marginLeft: 190, marginTop: -8
              }}>
                <Text style={{
                  width: 11,
                  height: 7,
                  color: '#ffffff',
                  fontFamily: 'Roboto',
                  fontSize: 6,
                  fontWeight: '700', marginLeft: 10, marginTop: -1
                }}>
                  S
                                                            </Text>
              </TouchableOpacity>




            </TouchableOpacity>

            <TouchableOpacity style={{
              width: 350,
              height: 150, marginLeft: 30, backgroundColor: 'grey', marginTop: 10
            }}>
              <Image style={{ width: 350, height: 150 }} source={require('../images/vehicle.png')}></Image>

              <Text style={{
                width: 133,
                height: 17,
                color: '#ffffff',
                fontFamily: 'Roboto',
                fontSize: 16,
                fontWeight: '700', marginLeft: 15, marginTop: -90
              }}>
                Vehicle Number
</Text>
              <Text style={{
                width: 70,
                height: 12,
                color: '#ffffff',
                fontFamily: 'Roboto',
                fontSize: 10,
                fontWeight: '700', marginLeft: 15, marginTop: 10
              }}>

                Car Model
                                          </Text>
              <Text style={{
                width: 100,
                height: 20,
                color: '#ffffff',
                fontFamily: 'Roboto',
                fontSize: 15,
                fontWeight: '700', marginLeft: 15, marginTop: 10
              }}>
                Covered Days
                                          </Text>

              <TouchableOpacity style={{
                width: 25,
                height: 8,
                borderRadius: 6,
                backgroundColor: '#e7ab37', marginLeft: 10, marginTop: 5
              }}>
                <Text style={{
                  width: 11,
                  height: 7,
                  color: '#ffffff',
                  fontFamily: 'Roboto',
                  fontSize: 6,
                  fontWeight: '700', marginLeft: 8, marginTop: -1
                }}>
                  S
                                                            </Text>

              </TouchableOpacity>
              <TouchableOpacity style={{
                width: 25,
                height: 8,
                borderRadius: 6,
                backgroundColor: 'rgba(105, 105, 105, 0.6)', marginLeft: 40, marginTop: -7
              }}>
                <Text style={{
                  width: 11,
                  height: 7,
                  color: '#ffffff',
                  fontFamily: 'Roboto',
                  fontSize: 6,
                  fontWeight: '700', marginLeft: 8, marginTop: -1
                }}>
                  M
                                                            </Text>

              </TouchableOpacity>
              <TouchableOpacity style={{
                width: 25,
                height: 8,
                borderRadius: 6,
                backgroundColor: '#e7ab37', marginLeft: 70, marginTop: -8
              }}>

                <Text style={{
                  width: 11,
                  height: 7,
                  color: '#ffffff',
                  fontFamily: 'Roboto',
                  fontSize: 6,
                  fontWeight: '700', marginLeft: 9, marginTop: -1
                }}>
                  T
                                                            </Text>

              </TouchableOpacity>
              <TouchableOpacity style={{
                width: 25,
                height: 8,
                borderRadius: 6,
                backgroundColor: '#e7ab37', marginLeft: 100, marginTop: -8
              }}>
                <Text style={{
                  width: 11,
                  height: 7,
                  color: '#ffffff',
                  fontFamily: 'Roboto',
                  fontSize: 6,
                  fontWeight: '700', marginLeft: 9, marginTop: -1
                }}>
                  W
                                                            </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                width: 25,
                height: 8,
                borderRadius: 6,
                backgroundColor: 'rgba(105, 105, 105, 0.6)', marginLeft: 130, marginTop: -8
              }}>
                <Text style={{
                  width: 11,
                  height: 7,
                  color: '#ffffff',
                  fontFamily: 'Roboto',
                  fontSize: 6,
                  fontWeight: '700', marginLeft: 10, marginTop: -1
                }}>
                  T
                                                            </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                width: 25,
                height: 8,
                borderRadius: 6,
                backgroundColor: 'rgba(105, 105, 105, 0.6)', marginLeft: 160, marginTop: -8
              }}>
                <Text style={{
                  width: 11,
                  height: 7,
                  color: '#ffffff',
                  fontFamily: 'Roboto',
                  fontSize: 6,
                  fontWeight: '700', marginLeft: 10, marginTop: -1
                }}>
                  F
                                                            </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                width: 25,
                height: 8,
                borderRadius: 6,
                backgroundColor: '#e7ab37', marginLeft: 190, marginTop: -8
              }}>
                <Text style={{
                  width: 11,
                  height: 7,
                  color: '#ffffff',
                  fontFamily: 'Roboto',
                  fontSize: 6,
                  fontWeight: '700', marginLeft: 10, marginTop: -1
                }}>
                  S
                                                            </Text>
              </TouchableOpacity>



            </TouchableOpacity>

            <TouchableOpacity style={{
              width: 350,
              height: 150, marginLeft: 30, backgroundColor: 'grey', marginTop: 10
            }}>
              <Image style={{ width: 350, height: 150 }} source={require('../images/vehicle.png')}></Image>

              <Text style={{
                width: 133,
                height: 17,
                color: '#ffffff',
                fontFamily: 'Roboto',
                fontSize: 16,
                fontWeight: '700', marginLeft: 15, marginTop: -90
              }}>
                Vehicle Number
</Text>
              <Text style={{
                width: 70,
                height: 12,
                color: '#ffffff',
                fontFamily: 'Roboto',
                fontSize: 10,
                fontWeight: '700', marginLeft: 15, marginTop: 10
              }}>

                Car Model
                                          </Text>
              <Text style={{
                width: 100,
                height: 20,
                color: '#ffffff',
                fontFamily: 'Roboto',
                fontSize: 15,
                fontWeight: '700', marginLeft: 15, marginTop: 10
              }}>
                Covered Days
                                          </Text>

              <TouchableOpacity style={{
                width: 25,
                height: 8,
                borderRadius: 6,
                backgroundColor: '#e7ab37', marginLeft: 10, marginTop: 5
              }}>
                <Text style={{
                  width: 11,
                  height: 7,
                  color: '#ffffff',
                  fontFamily: 'Roboto',
                  fontSize: 6,
                  fontWeight: '700', marginLeft: 8, marginTop: -1
                }}>
                  S
                                                            </Text>

              </TouchableOpacity>
              <TouchableOpacity style={{
                width: 25,
                height: 8,
                borderRadius: 6,
                backgroundColor: 'rgba(105, 105, 105, 0.6)', marginLeft: 40, marginTop: -7
              }}>
                <Text style={{
                  width: 11,
                  height: 7,
                  color: '#ffffff',
                  fontFamily: 'Roboto',
                  fontSize: 6,
                  fontWeight: '700', marginLeft: 8, marginTop: -1
                }}>
                  M
                                                            </Text>

              </TouchableOpacity>
              <TouchableOpacity style={{
                width: 25,
                height: 8,
                borderRadius: 6,
                backgroundColor: '#e7ab37', marginLeft: 70, marginTop: -8
              }}>

                <Text style={{
                  width: 11,
                  height: 7,
                  color: '#ffffff',
                  fontFamily: 'Roboto',
                  fontSize: 6,
                  fontWeight: '700', marginLeft: 9, marginTop: -1
                }}>
                  T
                                                            </Text>

              </TouchableOpacity>
              <TouchableOpacity style={{
                width: 25,
                height: 8,
                borderRadius: 6,
                backgroundColor: '#e7ab37', marginLeft: 100, marginTop: -8
              }}>
                <Text style={{
                  width: 11,
                  height: 7,
                  color: '#ffffff',
                  fontFamily: 'Roboto',
                  fontSize: 6,
                  fontWeight: '700', marginLeft: 9, marginTop: -1
                }}>
                  W
                                                            </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                width: 25,
                height: 8,
                borderRadius: 6,
                backgroundColor: 'rgba(105, 105, 105, 0.6)', marginLeft: 130, marginTop: -8
              }}>
                <Text style={{
                  width: 11,
                  height: 7,
                  color: '#ffffff',
                  fontFamily: 'Roboto',
                  fontSize: 6,
                  fontWeight: '700', marginLeft: 10, marginTop: -1
                }}>
                  T
                                                            </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                width: 25,
                height: 8,
                borderRadius: 6,
                backgroundColor: 'rgba(105, 105, 105, 0.6)', marginLeft: 160, marginTop: -8
              }}>
                <Text style={{
                  width: 11,
                  height: 7,
                  color: '#ffffff',
                  fontFamily: 'Roboto',
                  fontSize: 6,
                  fontWeight: '700', marginLeft: 10, marginTop: -1
                }}>
                  F
                                                            </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                width: 25,
                height: 8,
                borderRadius: 6,
                backgroundColor: '#e7ab37', marginLeft: 190, marginTop: -8
              }}>
                <Text style={{
                  width: 11,
                  height: 7,
                  color: '#ffffff',
                  fontFamily: 'Roboto',
                  fontSize: 6,
                  fontWeight: '700', marginLeft: 10, marginTop: -1
                }}>
                  S
                                                            </Text>
              </TouchableOpacity>
            </TouchableOpacity>

            <View style = {{marginTop: '7%' }}>
 
            <AppContainer>
          
          </AppContainer>
           
           

            </View>

           

           
           
            
       
           
          </ScrollView>
        </SafeAreaView>

       


       
      </View>

    );
  }
}


const bottomTabNavigator = createBottomTabNavigator(
  {
    DashBoard: {
      screen: DashBoardScreen,
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