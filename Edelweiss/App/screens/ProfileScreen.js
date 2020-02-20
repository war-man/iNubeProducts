import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import MaterialButtonShare from '../src/components/MaterialButtonShare';
import MaterialButtonGrey from '../src/components/MaterialButtonGrey';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

export default class ProfileScreen extends Component {
  logout = async () => {
    try {
      await AsyncStorage.removeItem('LocalMobileNumber');
      // this.retrieveData();
      console.log('Logged Out');
      this.props.navigation.navigate('Home', {log_out: 'true'});
    } catch (error) {
      // Error saving data
      console.log(error);

      console.log('Error in storing Data');
    }
  };

  render() {
    return (
      <View overflow="scroll">
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            backgroundColor: 'grey',
            marginLeft: 150,
            marginTop: 50,
          }}></View>

        <View
          style={{
            height: 50,
            marginBottom: 10,
            marginTop: 100,
            width: 150,
            height: 50,
            marginLeft: 150,
          }}>
          <TouchableOpacity
            style={{height: 50}}
            onPress={() => this.props.navigation.navigate('License')}>
            <Text Color="Red">View and update License</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 50,
            marginBottom: 10,
            marginTop: 10,
            width: 150,
            height: 50,
            marginLeft: 150,
          }}>
          <Text onPress={() => this.props.navigation.navigate('Notification')}>
            Notifications
          </Text>
        </View>
        <View
          style={{
            height: 50,
            marginBottom: 10,
            marginTop: 10,
            width: 150,
            height: 50,
            marginLeft: 150,
          }}>
          <TouchableOpacity style={{height: 50}}>
            <Text Color="Red">Marketting preferences</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 50,
            marginBottom: 10,
            marginTop: 10,
            width: 150,
            height: 50,
            marginLeft: 150,
          }}>
          <TouchableOpacity style={{height: 50}}>
            <Text Color="Red">Change Password</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 50,
            marginBottom: 10,
            marginTop: 10,
            width: 150,
            height: 50,
            marginLeft: 150,
          }}>
          <TouchableOpacity style={{height: 50}} onPress={this.logout}>
            <Text Color="Red">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  materialButtonShare: {
    width: 56,
    height: 56,
    marginTop: 49,
    marginLeft: 293,
  },
  materialButtonGrey: {
    width: 267,
    height: 36,
    backgroundColor: 'rgba(15,15, 15,0)',
    borderColor: '#000000',
    borderWidth: 0,
    shadowOpacity: 0.01,
    overflow: 'visible',
    marginTop: 265,
    marginLeft: 58,
  },
  materialButtonGrey2: {
    width: 260,
    height: 36,
    backgroundColor: 'rgba(15,15, 15,0)',
    shadowOpacity: 0.01,
    marginTop: 26,
    marginLeft: 59,
  },
  materialButtonGrey3: {
    width: 260,
    height: 36,
    backgroundColor: 'rgba(15,15, 15,0)',
    shadowOpacity: 0.01,
    marginTop: 20,
    marginLeft: 59,
  },
  materialButtonGrey4: {
    width: 267,
    height: 36,
    backgroundColor: 'rgba(15,15, 15,0)',
    shadowOpacity: 0.01,
    marginTop: 30,
    marginLeft: 58,
  },
  materialButtonGrey5: {
    width: 267,
    height: 36,
    backgroundColor: 'rgba(15,15, 15,0)',
    shadowOpacity: 0.01,
    marginTop: 25,
    marginLeft: 65,
  },
  image: {
    width: 155,
    height: 126,
    marginTop: -546,
    alignSelf: 'center',
  },
  sunilKher: {
    color: '#121212',
    fontFamily: 'roboto-700',
    marginTop: 38,
    marginLeft: 155,
  },
  loremIpsum: {
    color: '#121212',
    fontFamily: 'roboto-700',
    marginTop: 19,
    marginLeft: 117,
  },
});
