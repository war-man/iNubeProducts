import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Container, Item, Input, Icon} from 'native-base';

import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,

  //Component,
} from 'react-native';
import {Button} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage, RFValue as size} from 'react-native-responsive-fontsize';

export default class WelcomeScreen extends Component {
  render() {
    return (
      <ImageBackground
        source={require('../images/welcome.jpg')}
        style={{
          width: wp('100%'),
          height: hp('100%'),
        }}>
        <Text
          style={{
            width: wp('60%'),
            height: hp('20%'),
            color: '#ffffff',
            fontFamily: 'Roboto-Regular',
            fontSize: size(32),
            //fontWeight: '400',
            lineHeight: 47,
            marginTop: hp('50%'),
            marginLeft: wp('30%'),
          }}>
          Welcome to Edelweiss
        </Text>

        <TouchableOpacity
          style={{
            width: wp('80%'),
            height: hp('8%'),
            backgroundColor: '#ff0066',
            borderRadius: 6,
            marginTop: hp('5%'),
            marginLeft: wp('11%'),
          }}
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text
            style={{
              width: wp('70%'),
              height: hp('22%'),
              color: '#ffffff',
              fontFamily: 'Roboto',
              fontSize: size(17),
              fontWeight: '700',
              letterSpacing: -0.41,
              lineHeight: 22,
              marginLeft: wp('30%'),
              marginTop: hp('2.3%'),
            }}>
            Get Started
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}
