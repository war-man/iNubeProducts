import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Container, Item, Input, Icon} from 'native-base';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

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
import {CheckBox} from 'react-native-elements';
import {TextInput} from 'react-native-gesture-handler';
import OtpInputs from 'react-native-otp-inputs';
//import {Button} from 'galio-framework';
//import {CheckBox} from 'galio-framework';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      showLoader: false,
    };
  }

  handleCheckbox = evt => {
    this.setState({checked: evt.target.value});
  };

  showLoader = () => {
    this.setState({showLoader: true});
  };
  hideLoader = () => {
    this.setState({showLoader: false});
  };

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.title}>Terms & Conditions</Text>
        </View>

        <View style={styles.scrolldiv}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </ScrollView>
        </View>

        <View style={styles.checkbox}>
          <CheckBox
            checkedIcon={
              <Image
                style={{width: 23, height: 23}}
                source={require('../images/checked.png')}
              />
            }
            uncheckedIcon={
              <Image
                style={{width: 24, height: 24}}
                source={require('../images/unchecked.png')}
              />
            }
            checked={this.state.checked}
            onPress={() => this.setState({checked: !this.state.checked})}
          />
        </View>
        <View style={{width: 400, height: 30, paddingLeft: 80, paddingTop: 3}}>
          <Text
            style={{
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
              color: '#808080',
              fontSize: 18,
            }}>
            I accept the terms and conditions
          </Text>
        </View>

        <View
          style={{
            paddingTop: 50,
            marginLeft: 10,
            marginRight: 10,
            marginTop: -25,
          }}>
          <Button
            disabled={!this.state.checked}
            color="#ff0066"
            fontSize="20"
            title="Accept"
            // onPress={() => Alert.alert('Simple Button pressed')}
            onPress={() => this.props.navigation.navigate('Welcome')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 39,
    paddingLeft: 115,
    width: 162,
    height: 15,
  },
  title: {
    width: 162,

    fontSize: 18,
    //fontWeight: 'bold',
    fontStyle: 'normal',
    color: '#000000',
    fontFamily: 'sans-serif',

    // fontStyle: 'normal',
  },
  scrollView: {
    width: 315,
    height: 343,
    marginHorizontal: 20,
  },

  text: {
    width: 315,
    fontFamily: 'sans-serif',
    lineHeight: 30,
    fontSize: 16,
  },

  scrolldiv: {
    paddingTop: 80,
    paddingLeft: 27,
  },

  checkbox: {
    width: 18,
    height: 18,
    paddingTop: 38,
    paddingLeft: 30,
  },

  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },

  AddStyle: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    borderRadius: 5,
    margin: 5,
  },

  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },

  TextStyle: {
    marginBottom: 4,
    marginRight: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },

  ButtonStyle: {
    position: 'relative',
    marginTop: 30,
  },

  Paragraph: {
    position: 'relative',
    marginTop: 50,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
