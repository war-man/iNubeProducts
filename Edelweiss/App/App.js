

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
//import SplashScreen from 'react-native-splash-screen


//import * as ImagePickers from 'expo-image-picker';
//import Constants from 'expo-constants';
//import * as Permissions from 'expo-permissions';



//HomeScreen goes here..........................................................................................................................

import HomeScreen from "./screens/HomeScreen.js";
import WelcomeScreen from "./screens/WelcomeScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import OtpScreen from "./screens/OtpScreen.js";
import AddDriverScreen from "./screens/AddDriverScreen.js";

import AddVehicle from "./screens/AddVehicle.js";
import AddVehicle2 from "./screens/AddVehicle2.js";
import VehicleDetails from "./screens/VehicleDetails.js"
import VehicleImage from "./screens/VehicleImage.js"
import BillingScreen from './screens/BillingScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import FrontScreen from "./screens/FrontScreen.js";
import VehicleSchedule from './screens/VehicleSchedule.js';
//import MenuFrontScreen from './screens/MenuFrontScreen.js';

import DashBoardScreen from './screens/DashBoardScreen.js';
import ViewLicense from './screens/ViewLicense.js';
import NotificationScreen from './screens/NotificationScreen.js';
import PaymentSettings from './screens/PaymentSettings.js';
import ClaimScreen from './screens/ClaimScreen.js';
import ClaimInitimation from './screens/ClaimIntimation.js';
import CoverDetailsScreen from './screens/CoverDetailsScreen.js';
import AlertScreen1 from './screens/AlertScreen1.js';
import AlertScreen2 from './screens/AlertScreen2.js';
import SchedulerScreen from './screens/SchedulerScreen.js';
import Splashscreen from './screens/Splashscreen.js';
import ViewDriverDetails from './screens/ViewDriverDetails.js';
import ClaimStatus from './screens/ClaimStatus.js';
import ClaimOnline from './screens/ClaimOnline.js';
import CalendarScreen from './screens/CalendarScreen.js';
console.disableYellowBox = true;

  
/*class ImagePicker extends Component  {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
    console.log('hi');
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePickers.launchImageLibraryAsync({
      mediaTypes: ImagePickers.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}*/


/*const App = {}  => {
  useEffect( ()=> {
    SplashScreen.hide();
  },  []);*/

const RootStack = createStackNavigator(
  {
    Splash: Splashscreen,
    Home: HomeScreen,
    Login: LoginScreen,
    Welcome: WelcomeScreen,
    Otp: OtpScreen, 
    Driver: AddDriverScreen,
    
   // Camera: ImagePicker,
    Vehicle: AddVehicle,
    Vehicle2: AddVehicle2,
    VDetails: VehicleDetails,
    Alert1: AlertScreen1,
    Alert2: AlertScreen2,
    Calendar: CalendarScreen,
    
    VImage : VehicleImage,
    Billing: BillingScreen,
    Front: FrontScreen,
    Profile: ProfileScreen,
    Schedule: VehicleSchedule,
    Scheduler: SchedulerScreen,
    //MenuF: MenuFrontScreen,
    DashBoard: DashBoardScreen,
    Profile: ProfileScreen,
    License: ViewLicense,
    Notification: NotificationScreen,
    Payment: PaymentSettings,
    Claim: ClaimScreen,
    CStatus: ClaimStatus,
    COnline: ClaimOnline,
    Intimation: ClaimInitimation,
    Cover: CoverDetailsScreen,
    DriverDetails: ViewDriverDetails,


    
  },
  
  {
    initialRouteName: 'Home',
  },
  {
    defaultNavigationOptions: {
      header: null
    },
  }

  
);



const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

