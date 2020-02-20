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
import {Dropdown} from 'react-native-material-dropdown';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';

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
    NoOfDriver: '',
    VehicleAge: '',
    VehicleNumber: '',
    VehicleModelNumber: '',
    fileData_1: '',
    fileData_2: '',
    fileData_3: '',
    fileData_4: '',
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
        if (side === '1') {
          console.log('left if');

          this.setState({
            fileData_1: response.data,
          });
        } else if (side === '2') {
          console.log('2');
          this.setState({
            fileData_2: response.data,
          });
        } else if (side === '3') {
          console.log('2');
          this.setState({
            fileData_3: response.data,
          });
        } else if (side === '4') {
          console.log('4');
          this.setState({
            fileData_4: response.data,
          });
        }
      }
    });
  };

  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('LocalVehicleAge');
      this.setState({VehicleAge: value});
      if (value !== null) {
        // We have data!!
        console.log('LocalVehicleAge', value);
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };

  componentDidMount() {
    this.retrieveData();
  }

  getModelNumber = e => {
    console.log(e.nativeEvent.text);
    this.setState({VehicleNumber: e.nativeEvent.text}, () => {
      fetch(
        `http://mica-publi-11qa3l637dqw3-293834673.ap-south-1.elb.amazonaws.com:9025/api/Mica_EGI/GetVehicleDetails?VehicleId=${this.state.VehicleNumber}`,
        {
          method: 'GET',
        },
      )
        .then(res => {
          console.log(res.status);
          if (res.status === 200) {
            res.json().then(data => {
              this.setState({
                VehicleNumber: this.state.VehicleNumber,
                VehicleModelNumber: data.vehicleModel,
              });
            });
          } else {
            this.setState({
              VehicleNumber: this.state.VehicleNumber,
              VehicleModelNumber: 'No vechile Found',
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
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
              fileName: '1.png',
              fileExtension: '.png',
              fileData: this.state.fileData_1,
              contentType: 'string',
              tagname: '1st Side',
              tagValue: '1st side pic',
            },
            {
              fileName: '2.png',
              fileExtension: '.png',
              fileData: this.state.fileData_2,
              contentType: 'string',
              tagname: ' 2nd side',
              tagValue: '2nd side pic',
            },
            {
              fileName: '3.png',
              fileExtension: '.png',
              fileData: this.state.fileData_3,
              contentType: 'string',
              tagname: ' 3rd side',
              tagValue: '3rd side pic',
            },
            {
              fileName: '4.png',
              fileExtension: '.png',
              fileData: this.state.fileData_4,
              contentType: 'string',
              tagname: ' 4th side',
              tagValue: '4th side pic',
            },
          ],
        }),
      },
    )
      .then(res => {
        if (res.status === 200) {
          res.json().then(data => {
            console.log(data);
            //Alert.alert('Upload Success');
            this.props.navigation.navigate('Alert2');
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

  render() {
    let nameTitles = [{value: 'Mr'}, {value: 'Miss'}, {value: 'Mrs'}];
    console.log(this.state);

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
          Vehicle Details
        </Text>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Driver')}
          style={{
            width: 180,
            height: 40,
            borderRadius: 50,
            backgroundColor: '#f8f8f8',
            marginLeft: 110,
            marginTop: 20,
          }}>
          <Image
            style={{width: 20, height: 25, marginLeft: 35, marginTop: 8}}
            source={require('../images/DriverIcon.png')}></Image>

          <TouchableOpacity
            style={{
              width: 210,
              width: 92,
              height: 34,
              borderRadius: 50,
              backgroundColor: '#e7ab37',
              marginLeft: 90,
              marginTop: -30,
            }}>
            <Image
              style={{width: 30, height: 25, marginLeft: 35, marginTop: 5}}
              source={require('../images/car.png')}></Image>
          </TouchableOpacity>
        </TouchableOpacity>
        <View>
          <View
            style={{
              width: 300,
              height: 40,
              borderRadius: 6,
              borderColor: '#d7d7d7',
              borderStyle: 'solid',
              borderWidth: 1,
              backgroundColor: '#ffffff',
              marginLeft: 50,
              marginTop: 60,
            }}>
            <Text
              style={{
                marginTop: -25,
                marginLeft: 0,
                width: 150,
                height: 20,
                color: '#626262',
                fontFamily: 'Roboto',
                fontSize: 16,
                fontWeight: '500',
              }}>
              Vehicle Number
            </Text>

            <TextInput
              onChange={this.getModelNumber}
              value={this.state.VehicleNumber}></TextInput>
          </View>
        </View>

        <View
          style={{
            width: 300,
            height: 40,
            borderRadius: 6,
            borderColor: '#d7d7d7',
            borderStyle: 'solid',
            borderWidth: 1,
            backgroundColor: '#ffffff',
            marginTop: 40,
            marginLeft: 50,
          }}>
          <Text
            style={{
              marginTop: -25,
              marginLeft: 0,
              width: 150,
              height: 20,
              color: '#626262',
              fontFamily: 'Roboto',
              fontSize: 16,
              fontWeight: '500',
            }}>
            Make & Model
          </Text>
          <TextInput
            // placeholder={this.state.VehicleModelNumber}
            value={this.state.VehicleModelNumber}></TextInput>
        </View>

        <View
          style={{
            width: 300,
            height: 40,
            borderRadius: 6,
            borderColor: '#d7d7d7',
            borderStyle: 'solid',
            borderWidth: 1,
            backgroundColor: '#ffffff',
            marginTop: 40,
            marginLeft: 50,
          }}>
          <Text
            style={{
              marginTop: -25,
              marginLeft: 0,
              width: 150,
              height: 20,
              color: '#626262',
              fontFamily: 'Roboto',
              fontSize: 16,
              fontWeight: '500',
            }}>
            Year of Registration
          </Text>
          <TextInput
            placeholder={this.state.VehicleAge}
            value={this.state.VehicleAge}></TextInput>
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
            Upload Car Images
          </Text>
        </View>

        <View>
          {this.state.fileData_1 ? (
            <TouchableOpacity onPress={() => this.chooseImage('1')}>
              <Image
                source={{
                  uri: 'data:image/jpeg;base64,' + this.state.fileData_1,
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
                backgroundColor: '#fff',
                marginLeft: 25,
                marginTop: 20,
              }}
              onPress={() => this.chooseImage('1')}>
                <Image
                style={{width: '100%', height:'100%'}}
                source={require('../images/f.png')}
              />
              </TouchableOpacity>
          )}

          {this.state.fileData_2 ? (
            <TouchableOpacity onPress={() => this.chooseImage('2')}>
              <Image
                source={{
                  uri: 'data:image/jpeg;base64,' + this.state.fileData_2,
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
                backgroundColor: '#fff',
                marginLeft: 100,
                marginTop: -60,
              }}
              onPress={() => this.chooseImage('2')}>
                <Image
                style={{width: '100%', height:'50%',marginTop: '23%'}}
                source={require('../images/l.png')}
              />
              </TouchableOpacity>
          )}

          {this.state.fileData_3 ? (
            <TouchableOpacity onPress={() => this.chooseImage('3')}>
              <Image
                source={{
                  uri: 'data:image/jpeg;base64,' + this.state.fileData_3,
                }}
                style={{
                  width: 68,
                  height: 59,
                  borderRadius: 8,
                  marginLeft: 175,
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
                backgroundColor: '#fff',
                marginLeft: 175,
                marginTop: -60,
              }}
              onPress={() => this.chooseImage('3')}>
                <Image
                style={{width: '100%', height:'100%'}}
                source={require('../images/b.png')}
              />
              </TouchableOpacity>
          )}

          {this.state.fileData_4 ? (
            <TouchableOpacity onPress={() => this.chooseImage('4')}>
              <Image
                source={{
                  uri: 'data:image/jpeg;base64,' + this.state.fileData_4,
                }}
                style={{
                  width: 68,
                  height: 59,
                  borderRadius: 8,
                  marginLeft: 250,
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
                backgroundColor: '#fff',
                marginLeft: 250,
                marginTop: -60,
              }}
              onPress={() => this.chooseImage('4')}>
                <Image
                style={{width: '100%', height:'50%',marginTop: '23%'}}
                source={require('../images/r.png')}
              />
              </TouchableOpacity>
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
            onPress={this.uploadImage}>
            <Text style={{color: '#fff', textAlign: 'center'}}> Submit </Text>
          </TouchableOpacity>
          <TouchableOpacity style = {{width : 200, height: 55, borderRadius: 25, backgroundColor: '#fff', marginLeft: '28%', marginTop: '5%'}}
                            onPress={() => this.props.navigation.navigate('Vehicle2')}>
            <Text style = {{fontSize: 25, marginLeft: 30, marginTop: 5, color: '#ff0066'}}>
              Add Vehicle
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
