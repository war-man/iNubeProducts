import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
//import {Constants} from 'expo-constants';
//import AssetExample from './components/AssetExample';
//import { Card } from 'react-native-paper';
import { Dropdown } from 'react-native-material-dropdown';



export default class ClaimInitimation extends React.Component {


  render() {
    let premium = 36
      let data=[{
     value:'1 Driver',},{value:'2 Drivers',},{value:'3 Drivers'}];
     let data1=[{
     value:' vehicle 1',},{value:' vehicle 2',},{value:' vehicle 3'}];
     let data2=[{
     value:'3 lakh',},{value:'4 lakh',},{value:'5 lakh'}];
      return (
     <View style={styles.container}>
     

  <View>
  
      <Dropdown
      label="Select Driver"
      data={data}    />
   
    </View>
    <View>
   
      <Dropdown
      label='Select Vehicle'
      data={data1}    />

    </View>
    <View>
   
      <Dropdown
      label='Claim amount'
      data={data2}    />

    </View>
          
            </View>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop:20,
       backgroundColor: '#ecf0f1',
       marginTop: 10,
       marginBottom: 10,
       marginLeft: 8,
       marginRight: 8,
       
    
  },

  });


