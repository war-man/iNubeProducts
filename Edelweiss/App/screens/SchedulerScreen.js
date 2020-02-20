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
  StatusBar,
  Linking,
  Switch,
} from 'react-native';

import {CheckBox} from 'react-native-elements';
import {TextInput} from 'react-native-gesture-handler';
import OtpInputs from 'react-native-otp-inputs';
import {Dropdown} from 'react-native-material-dropdown';

export default class SchedulerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleRegistrationNo: '001/1',
      policyNo: '9783/1234/0001',
      mon: true,
      tue: true,
      wed: true,
      thu: true,
      fri: true,
      sat: true,
      sun: true,
      repeatWeek: true,
      createdDate: '2020-02-06T07:22:07.738Z',
      modifiedDate: '2020-02-06T07:22:07.738Z',
      modifyCount: 0,
      isActive: true,
      vehicleMasId: 1,
      vehicleType: 'pc',
    };
  }

  componentDidMount() {
    fetch(
      'http://mica-publi-11qa3l637dqw3-293834673.ap-south-1.elb.amazonaws.com:9025/api/Mica_EGI/ScheduleStatus?VehicleRegstrationNo=001%202F1&PolicyNo=9783%202F1234%202F0001',
      {
        method: 'GET',
      },
    ).then(res => {
      res.json().then(data => {
        this.setState(data.scheduleDTO);
      });
    });
  }

  handlesubmit = () => {
    //debugger;
    fetch(
      'http://mica-publi-11qa3l637dqw3-293834673.ap-south-1.elb.amazonaws.com:9025/api/Mica_EGI/CreateSchedule',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state),
      },
    ).then(res => {
      if (res.status === 200) {
        res.json().then(resp => {
          console.log('chk', resp);
          this.props.navigation.navigate('Schedule', {update: 'dataUpdate'});
        });
      } else {
        console.log(res.status);
      }
    });
  };

  render() {
    console.log(this.state);
    return (
      <View>
        <View
          style={{
            backgroundColor: '#4a78c2',
            width: '98%',
            borderRadius: 20,
            height: '96%',
            marginTop: '5%',
            marginLeft: 3,
          }}>
          <Text
            style={{
              width: 39,
              height: 22,
              color: '#ffffff',
              fontFamily: 'Roboto',
              fontSize: 16,
              fontWeight: '400',
              marginLeft: 50,
              marginTop: 40,
            }}>
            Days
          </Text>

          <Text
            style={{
              width: 80,
              height: 22,
              color: '#ffffff',
              fontFamily: 'Roboto',
              fontSize: 16,
              fontWeight: '400',
              marginLeft: 320,
              marginTop: -20,
            }}>
            Status
          </Text>

          <Text style={styles.Textstyle}>Sunday</Text>

          <Switch
            style={styles.SwitchStyle}
            onValueChange={code => this.setState({sun: code})}
            value={this.state.sun}></Switch>

          <Text style={styles.Textstyle}>Monday</Text>

          <Switch
            style={styles.SwitchStyle}
            onValueChange={code => this.setState({mon: code})}
            value={this.state.mon}></Switch>

          <Text style={styles.Textstyle}>Tuesday</Text>

          <Switch
            style={styles.SwitchStyle}
            onValueChange={code => this.setState({tue: code})}
            value={this.state.tue}></Switch>

          <Text style={styles.Textstyle}>Wednesday</Text>

          <Switch
            style={styles.SwitchStyle}
            onValueChange={code => this.setState({wed: code})}
            value={this.state.wed}></Switch>

          <Text style={styles.Textstyle}>Tursday</Text>

          <Switch
            style={styles.SwitchStyle}
            onValueChange={code => this.setState({thu: code})}
            value={this.state.thu}></Switch>

          <Text style={styles.Textstyle}>Friday</Text>

          <Switch
            style={styles.SwitchStyle}
            onValueChange={code => this.setState({fri: code})}
            value={this.state.fri}></Switch>

          <Text style={styles.Textstyle}>Saturday</Text>

          <Switch
            style={styles.SwitchStyle}
            onValueChange={code => this.setState({sat: code})}
            value={this.state.sat}></Switch>

          <TouchableOpacity
            style={styles.ButtonStyle}
            onPress={this.handlesubmit}>
            <Text style={styles.ButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Textstyle: {
    width: 84,
    height: 22,
    color: '#ffffff',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 50,
    marginTop: 40,
  },

  SwitchStyle: {
    width: 80,
    height: 22,
    color: '#ffffff',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 290,
    marginTop: -20,
  },

  ButtonStyle: {
    width: '40%',
    height: '7%',
    backgroundColor: '#ff0066',
    borderRadius: 20,
    marginLeft: 130,
    marginTop: '3%',
  },

  ButtonText: {
    marginLeft: 65,
    marginTop: 10,
    color: '#fff',
  },
});
