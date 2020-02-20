import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native';
import {Container, Item, Input, Icon} from 'native-base';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
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
import {Dropdown} from 'react-native-material-dropdown';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker/src';

import React, {Fragment, Component} from 'react';

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'imagesData',
  },
};

export default class AddDriverScreen extends Component {
  state = {
    primaryDriverName: '',
    age: '',
    mobileNo: '',
    image: null,
    vehicleAge: '',
    sumInsured: '',
    frequency: '',
    experience: '',

    leftfileData: '',
    rightfileData: '',
  };

  chooseImage = side => {
    console.log(side);

    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        if (side === 'left') {
          console.log('left if');

          this.setState({
            leftfileData: response.data,
          });
        } else if (side === 'right') {
          console.log('right if');
          this.setState({
            rightfileData: response.data,
          });
        }
      }
    });
  };

  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};

        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        });
      }
    });
  };

  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};

        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        });
        // console.log(this.state.filepath);
        // console.log(this.state.fileUri);
        console.log('launchImageLibrary');
      }
    });
  };

  renderFileData() {
    if (this.state.fileData) {
      return (
        <Image
          source={{uri: 'data:image/jpeg;base64,' + this.state.fileData}}
        />
      );
    }
  }

  storeData = async () => {
    try {
      AsyncStorage.multiSet([
        ['LocalVehicleAge', this.state.vehicleAge],
        ['LocalSI', this.state.sumInsured],
        ['LocalFrequency', this.state.frequency],
        ['LocalExp', this.state.experience],
        ['LocalDriverAge', this.state.age],
      ]);
      // this.retrieveData();
      var multiArr = await AsyncStorage.getItem('LocalSI');
      console.log(multiArr);
      console.log('stored fynction called');
      var value = await AsyncStorage.getItem('LocalVehicleAge');
      console.log(value);
    } catch (error) {
      // Error saving data
      console.log('Error in storing Data');
    }
  };

  retrieveData = async () => {
    console.log('colled data');
    try {
      const value = await AsyncStorage.getItem('LocalMobileNumber');

      console.log('Log', value);
      this.setState({mobileNo: value});
      if (value !== null) {
        // We have data!!
        console.log('mobile number', this.state.mobileNo);
        fetch(
          `http://mica-publi-11qa3l637dqw3-293834673.ap-south-1.elb.amazonaws.com:9025/api/Mica_EGI/GetQuotationbyMobileNo?mobileNo=${this.state.mobileNo}`,
          {
            method: 'GET',
          },
        )
          .then(res => {
            res.json().then(data => {
              console.log('data', data);
              this.setState({
                primaryDriverName: data.primaryDriverName,
                age: String(data.age),
                vehicleAge: data.vehicleAge,
                sumInsured: data.sumInsured,
                frequency: data.frequency,
                experience: String(data.experience),
              });
              this.storeData();
            });
          })
          .catch(error => {
            // console.log(error);
            console.log('errror value');
          });
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };

  uploadImage = () => {
    // console.log(this.state)
    console.log('uplaod image called');

    fetch(
      'https://inubeservicesnotification.azurewebsites.net/api/DMS/DocumentSimpleupload/DocumentSimpleupload',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        },
        body: JSON.stringify({
          fileUploadDTOs: [
            {
              fileName: 'left.png',
              fileExtension: '.png',
              fileData: this.state.leftfileData,
              contentType: 'string',
              tagname: 'left Side',
              tagValue: 'left side pic',
            },
            {
              fileName: 'right.png',
              fileExtension: '.png',
              fileData: this.state.rightfileData,
              contentType: 'string',
              tagname: ' right side',
              tagValue: 'provide tagvalue',
            },
          ],
        }),
      },
    )
      .then(res => {
        if (res.status === 200) {
          res.json().then(data => {
            console.log(data);
           // Alert.alert('Upload Success');
            this.props.navigation.navigate('Alert1');
          });
        } else {
          console.log('not uploaded');
          Alert.alert('Upload Failed');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.retrieveData();
  }

  render() {
    let nameTitles = [{value: 'Mr'}, {value: 'Miss'}, {value: 'Mrs'}];
    let {primaryDriverName, age, mobileNo, image} = this.state;
    // console.log(this.state);
    return (
      <View>
        <Text
          style={{
            width: 108,
            height: 18,
            color: '#414141',
            fontFamily: 'Roboto',
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 150,
            marginTop: 10,
          }}>
          Driver Details
        </Text>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Vehicle')}
          style={{
            width: 180,
            height: 40,
            borderRadius: 50,
            backgroundColor: '#f8f8f8',
            marginLeft: 110,
            marginTop: 20,
          }}>
          <TouchableOpacity
            style={{
              width: 210,
              width: 92,
              height: 34,
              borderRadius: 50,
              backgroundColor: '#e7ab37',
              marginLeft: 4,
              marginTop: 0,
            }}>
            <Image
              style={{width: 20, height: 25, marginLeft: 35, marginTop: 5}}
              source={require('../images/DriverIcon.png')}></Image>
            <Image
              style={{width: 30, height: 25, marginLeft: 115, marginTop: -23}}
              source={require('../images/car.png')}></Image>
          </TouchableOpacity>
        </TouchableOpacity>
        <View>
          <View
            style={{
              width: 56,
              height: 32,
              borderRadius: 6,
              borderColor: '#d7d7d7',
              borderStyle: 'solid',
              borderWidth: 1,
              backgroundColor: '#ffffff',
              marginLeft: 23,
              marginTop: 60,
            }}>
            <Dropdown label="Title" data={nameTitles} />
          </View>

          <View
            style={{
              width: 240,
              height: 40,
              borderRadius: 6,
              borderColor: '#d7d7d7',
              borderStyle: 'solid',
              borderWidth: 1,
              backgroundColor: '#ffffff',
              marginLeft: 110,
              marginTop: -30,
            }}>
            <TextInput
              placeholder={this.state.primaryDriverName}
              value={this.state.primaryDriverName}></TextInput>
          </View>
        </View>

        <View
          style={{
            width: 260,
            height: 45,
            borderRadius: 6,
            borderColor: '#d7d7d7',
            borderStyle: 'solid',
            borderWidth: 1,
            backgroundColor: '#ffffff',
            marginTop: 50,
            marginLeft: 25,
          }}>
          <TextInput
            placeholder={this.state.age}
            value={this.state.age}></TextInput>
        </View>

        <View style={{marginLeft: 25, marginTop: 30}}>
          <Text
            style={{
              width: 120,
              height: 25,
              color: '#626262',
              fontFamily: 'Roboto',
              fontSize: 16,
              fontWeight: '500',
            }}>
            Upload License
          </Text>
        </View>

        <View>
          {this.state.leftfileData ? (
            <TouchableOpacity onPress={() => this.chooseImage('left')}>
              <Image
                source={{
                  uri: 'data:image/jpeg;base64,' + this.state.leftfileData,
                }}
                style={{
                  width: 68,
                  height: 59,
                  borderRadius: 8,
                  marginLeft: 25,
                  marginTop: 20,
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                width: 68,
                height: 59,
                borderRadius: 8,
                backgroundColor: '#c4c4c4',
                marginLeft: 25,
                marginTop: 20,
              }}
              onPress={() => this.chooseImage('left')}></TouchableOpacity>
          )}
          {this.state.rightfileData ? (
            <TouchableOpacity onPress={() => this.chooseImage('right')}>
              <Image
                source={{
                  uri: 'data:image/jpeg;base64,' + this.state.rightfileData,
                }}
                style={{
                  width: 68,
                  height: 59,
                  borderRadius: 8,
                  marginLeft: 100,
                  marginTop: -60,
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                width: 68,
                height: 59,
                borderRadius: 8,
                backgroundColor: '#c4c4c4',
                marginLeft: 100,
                marginTop: -60,
              }}
              onPress={() => this.chooseImage('right')}></TouchableOpacity>
          )}
        </View>

        <View>
          <TouchableOpacity
            style={{
              marginTop: 50,
              paddingTop: 15,
              paddingBottom: 15,
              marginLeft: '20%',
              marginRight: '20%',
              backgroundColor: '#ff0066',
              borderRadius: 50,
              borderWidth: 1,
              borderColor: '#fff',
            }}
            activeOpacity={0.5}
            onPress={() => this.props.navigation.navigate('Alert1')}>
            <Text
              style={{color: '#fff', textAlign: 'center'}}
              onPress={this.uploadImage}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
