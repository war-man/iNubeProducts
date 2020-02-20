import React from 'react'

import { View, Text , TouchableOpacity} from 'react-native' // 0.0.1
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';


class CalendarScreen extends React.Component {
  // It is not possible to select some to current day.
  
  
  render() {
    return (
      
      <View style={{flex: 1}}>
      <Text style = {{marginTop: 30, fontSize: 20,alignItems: 'center', marginBottom: 50 }}>
          Select from when the cover should get activated 
      </Text>
        
        <Calendar
  // Initially visible month. Default = Date()
  current={'2020-02-20'}
  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
  //minDate={'2012-05-10'}
  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
  //maxDate={'2012-05-30'}
  // Handler which gets executed on day press. Default = undefined
  onDayPress={(day) => {console.log('selected day', day)}}
  // Handler which gets executed on day long press. Default = undefined
  onDayLongPress={(day) => {console.log('selected day', day)}}
  // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
  markedDates={{
    '2012-05-20': {textColor: 'green'},
    '2012-05-22': {startingDay: true, color: 'green'},
    '2012-05-23': {selected: true, endingDay: true, color: 'green', textColor: 'gray'},
    '2012-05-04': {disabled: true, startingDay: true, color: 'green', endingDay: true}
  }}
  monthFormat={'yyyy MM'}
  // Handler which gets executed when visible month changes in calendar. Default = undefined
  onMonthChange={(month) => {console.log('month changed', month)}}
  // Hide month navigation arrows. Default = false
  hideArrows={true}
  // Replace default arrows with custom ones (direction can be 'left' or 'right')
  //renderArrow={(direction) => (<Arrow />)}
  // Do not show days of other months in month page. Default = false
  hideExtraDays={true}
  // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
  // day from another month that is visible in calendar page. Default = false
  disableMonthChange={true}
  // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
  firstDay={1}
  // Hide day names. Default = false
  hideDayNames={true}
  // Show week numbers to the left. Default = false
  showWeekNumbers={true}
  // Handler which gets executed when press arrow icon left. It receive a callback can go back month
  onPressArrowLeft={substractMonth => substractMonth()}
  // Handler which gets executed when press arrow icon left. It receive a callback can go next month
  onPressArrowRight={addMonth => addMonth()}
/>
<Text style = {{marginTop: 30, fontSize: 20,alignItems: 'center', marginBottom: 50 }}>
          Your Cover starts from: 
      </Text>

      <TouchableOpacity style = {{width : 200, height: 55, borderRadius: 25, backgroundColor: '#fff', marginLeft: '28%', marginTop: '5%'}}
      onPress={() => this.props.navigation.navigate('Vehicle')}>
              <Text style = {{fontSize: 25, marginLeft: 70, marginTop: 5, color: '#ff0066'}}>
                Submit
              </Text>
            </TouchableOpacity>
      </View>
    );
  }
}

export default CalendarScreen
