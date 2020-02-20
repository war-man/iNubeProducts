import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Container, Item, Input, Icon} from 'native-base';

import {createAppContainer, createBottomNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

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
  Switch,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {TextInput} from 'react-native-gesture-handler';
import OtpInputs from 'react-native-otp-inputs';
import {Dropdown} from 'react-native-material-dropdown';
import BottomDrawer from 'rn-bottom-drawer';
import SwipeablePanel, {swipeablePanelActive} from 'rn-swipeable-panel';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default class VehicleSchedule extends Component {
  _renderCurtainData = () => {
    return (
      <View>
        <Text>Your Data gos here!</Text>
      </View>
    );
  };
  state = {
    swipeablePanelActive: false,
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: true,
    sun: true,
    si: '',
  };

  scheduleData = () => {
    console.log('sate', this.state);
  };

  componentDidMount() {
    fetch(
      'http://mica-publi-11qa3l637dqw3-293834673.ap-south-1.elb.amazonaws.com:9025/api/Mica_EGI/ScheduleStatus?VehicleRegstrationNo=001%2F1&PolicyNo=9783%2F1234%2F0001',
      {
        method: 'GET',
      },
    ).then(res => {
      res.json().then(data => {
        // console.log('sedule0', data);

        this.setState({
          sun: data.scheduleDTO.sun,
          mon: data.scheduleDTO.mon,
          tue: data.scheduleDTO.tue,
          wed: data.scheduleDTO.wed,
          thu: data.scheduleDTO.thu,
          fri: data.scheduleDTO.fri,
          sat: data.scheduleDTO.sat,
        });
      });
    });
    fetch(
      'http://mica-publi-11qa3l637dqw3-293834673.ap-south-1.elb.amazonaws.com:9025/api/Mica_EGI/GetSIFromMakeModel?VehicleId=1',
      {
        method: 'GET',
      },
    ).then(res => {
      res.json().then(data => {
        console.log('Data', data);

        this.setState({si: String(data)});
      });
    });
  }

  componentWillReceiveProps() {
    console.log('rerender here');
    fetch(
      'http://mica-publi-11qa3l637dqw3-293834673.ap-south-1.elb.amazonaws.com:9025/api/Mica_EGI/ScheduleStatus?VehicleRegstrationNo=001%202F1&PolicyNo=9783%202F1234%202F0001',
      {
        method: 'GET',
      },
    ).then(res => {
      res.json().then(data => {
        console.log('sedule0', data);

        this.setState({
          sun: data.scheduleDTO.sun,
          mon: data.scheduleDTO.mon,
          tue: data.scheduleDTO.tue,
          wed: data.scheduleDTO.wed,
          thu: data.scheduleDTO.thu,
          fri: data.scheduleDTO.fri,
          sat: data.scheduleDTO.sat,
        });
      });
    });
  }

  openPanel = () => {
    // this.setState({swipeablePanelActive: true});
  };

  closePanel = () => {
    // this.setState({swipeablePanelActive: false});
  };

  render() {
    console.log('sate render', this.state);
    var siData = this.state.si;
    console.log(siData);

    return (
      <View>
        <TouchableOpacity
          style={{
            width: 420,
            height: 150,
            backgroundColor: '#568cc7',
          }}></TouchableOpacity>

        <View
          style={{
            width: 375,
            height: 90,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowOffset: {width: 1, height: 0},
            shadowRadius: 3,
            shadowColor: 'rgba(0, 0, 0, 0.14)',
            shadowOffset: {width: 2, height: 0},
            shadowRadius: 2,
            shadowColor: 'rgba(0, 0, 0, 0.12)',
            shadowOffset: {width: 0, height: 0},
            shadowRadius: 2,
            borderRadius: 4,
            backgroundColor: '#ffffff',
            marginLeft: 18,
            marginTop: -20,
          }}>
          <Text
            style={{
              width: '50%',
              height: 15,
              color: '#888888',
              fontFamily: 'Roboto',
              fontSize: 12,
              fontWeight: '500',
              marginTop: 10,
              marginLeft: 10,
            }}>
            Current Week
          </Text>
          {this.state.sun === true ? (
            <View
              style={{
                width: '10%',
                height: '50%',
                backgroundColor: '#4a78c2',
                marginTop: '4%',
                marginLeft: '3%',
              }}>
              <Text style={styles.daysText}>S</Text>
            </View>
          ) : (
            <View
              style={{
                width: '10%',
                height: '50%',
                backgroundColor: '#f8f8f8',
                marginTop: '4%',
                marginLeft: '3%',
              }}>
              <Text style={styles.daysText}>S</Text>
            </View>
          )}
          {this.state.mon === true ? (
            <View
              style={{
                width: '10%',
                height: '50%',
                backgroundColor: '#4a78c2',
                marginTop: '-12%',
                marginLeft: '17%',
              }}>
              <Text style={styles.daysText}>M</Text>
            </View>
          ) : (
            <View
              style={{
                width: '10%',
                height: '50%',
                backgroundColor: '#f8f8f8',
                marginTop: '-12%',
                marginLeft: '17%',
              }}>
              <Text style={styles.daysText}>M</Text>
            </View>
          )}
          {this.state.tue === true ? (
            <View
              style={{
                width: '10%',
                height: '50%',
                backgroundColor: '#4a78c2',
                marginTop: '-12%',

                marginLeft: '31%',
              }}>
              <Text style={styles.daysText}>T</Text>
            </View>
          ) : (
            <View
              style={{
                width: '10%',
                height: '50%',
                backgroundColor: '#f8f8f8',
                marginTop: '-12%',

                marginLeft: '31%',
              }}>
              <Text style={styles.daysText}>T</Text>
            </View>
          )}
          {this.state.wed === true ? (
            <View
              style={{
                width: '10%',
                height: '50%',
                backgroundColor: '#4a78c2',
                marginTop: '-12%',

                marginLeft: '45%',
              }}>
              <Text style={styles.daysText}>W</Text>
            </View>
          ) : (
            <View
              style={{
                width: '10%',
                height: '50%',
                backgroundColor: '#f8f8f8',
                marginTop: '-12%',

                marginLeft: '45%',
              }}>
              <Text style={styles.daysText}>W</Text>
            </View>
          )}
          {this.state.thu === true ? (
            <View
              style={{
                width: '10%',
                height: '50%',
                backgroundColor: '#4a78c2',
                marginTop: '-12%',

                marginLeft: '59%',
              }}>
              <Text style={styles.daysText}>T</Text>
            </View>
          ) : (
            <View
              style={{
                width: '10%',
                height: '50%',
                backgroundColor: '#f8f8f8',
                marginTop: '-12%',

                marginLeft: '59%',
              }}>
              <Text style={styles.daysText}>T</Text>
            </View>
          )}
          {this.state.fri === true ? (
            <View
              style={
                (styles.daysText,
                {
                  marginLeft: '72%',
                  width: '10%',
                  height: '50%',
                  backgroundColor: '#4a78c2',
                  marginTop: '-12%',
                })
              }>
              <Text style={styles.daysText}>F</Text>
            </View>
          ) : (
            <View
              style={
                (styles.daysText,
                {
                  marginLeft: '72%',
                  width: '10%',
                  height: '50%',
                  backgroundColor: '#f8f8f8',
                  marginTop: '-12%',
                })
              }>
              <Text style={styles.daysText}>F</Text>
            </View>
          )}
          {this.state.sat ? (
            <View
              style={{
                marginLeft: '85%',
                width: '10%',
                height: '50%',
                backgroundColor: '#4a78c2',
                marginTop: '-12%',
              }}>
              <Text style={styles.daysText}>S</Text>
            </View>
          ) : (
            <View
              style={{
                marginLeft: '85%',
                width: '10%',
                height: '50%',
                backgroundColor: '#f8f8f8',
                marginTop: '-12%',
              }}>
              <Text style={styles.daysText}>S</Text>
            </View>
          )}
        </View>

        <View
          style={{
            width: 375,
            height: 90,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowOffset: {width: 1, height: 0},
            shadowRadius: 3,
            shadowColor: 'rgba(0, 0, 0, 0.14)',
            shadowOffset: {width: 2, height: 0},
            shadowRadius: 2,
            shadowColor: 'rgba(0, 0, 0, 0.12)',
            shadowOffset: {width: 0, height: 0},
            shadowRadius: 2,
            borderRadius: 4,
            backgroundColor: '#ffffff',
            marginLeft: 18,
            marginTop: 40,
            borderEndColor: '#fff'
            
          }}>
          <Text
            style={{
              width: 100,
              height: 14,
              color: '#787878',
              fontFamily: 'Roboto',
              fontSize: 12,
              fontWeight: '700',
              marginLeft: 60,
              marginTop: 20,
            }}>
            No of Claims
          </Text>
          <Text
            style={{
              width: 13,
              height: 26,
              color: '#e7ab37',
              fontFamily: 'Roboto',
              fontSize: 22,
              fontWeight: '500',
              marginLeft: 85,
            }}>
            1
          </Text>
          <Text
            style={{
              width: 58,
              height: 14,
              color: '#787878',
              fontFamily: 'Roboto',
              fontSize: 12,
              fontWeight: '700',
              marginLeft: 230,
              marginTop: -40,
            }}>
            SI Balance
          </Text>
          <Text
            style={{
              width: 120,
              height: 26,
              color: '#fc63a0',
              fontFamily: 'Roboto',
              fontSize: 22,
              fontWeight: '500',
              marginLeft: 200,
            }}>
            ₹ {siData}
          </Text>
        </View>

        <Text
          style={{
            width: 132,
            height: 21,
            opacity: 0.2,
            color: '#737373',
            fontFamily: 'Roboto',
            fontSize: 18,
            fontWeight: '700',
            marginLeft: 40,
            marginTop: 10,
          }}>
          Insurance Cover
        </Text>
        <Switch style={{marginRight: 100, marginTop: -20}}></Switch>
        <TouchableOpacity
          style={{
            width: 160,
            height: 67,
            backgroundColor: '#ececec',
            marginLeft: 20,
            marginTop: 10,
          }}>
          <Text
            style={{
              width: 100,
              height: 20,
              color: '#000000',
              fontFamily: 'Roboto',
              fontSize: 10,
              fontWeight: '700',
              marginLeft: 35,
              marginTop: 30,
            }}>
            Select your Cover
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 160,
            height: 67,
            backgroundColor: '#ececec',
            marginLeft: 210,
            marginTop: -65,
          }}>
          <Text
            style={{
              width: 100,
              height: 20,
              color: '#000000',
              fontFamily: 'Roboto',
              fontSize: 10,
              fontWeight: '700',
              marginLeft: 35,
              marginTop: 30,
            }}>
            RSA 1800 233 2309
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Scheduler')}
          style={{
            width: 390,
            height: 50,
            backgroundColor: '#4a78c2',
            borderRadius: 20,
            marginLeft: 10,
            marginTop: 40,
          }}>
          <Text
            style={{
              width: 90,
              height: 22,
              color: '#ffffff',
              fontFamily: 'Roboto',
              fontSize: 18,
              fontWeight: '700',
              marginLeft: 160,
              marginTop: 11,
            }}>
            Scheduler
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  daysText: {
    marginLeft: '36%',
    marginTop: '35%',
    color: 'red',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
