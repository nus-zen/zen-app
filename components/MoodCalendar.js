import React, { useState }  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import MoodCheckInScreen from "../screens/profile/MoodCheckInScreen";

export default function MoodCalendar({setMood}) {
  const currentDate = moment().format('YYYY-MM-DD');
  const [selectedMoodDate, setSelectedMoodDate] = useState('');
  const [moodColor, setMoodColor] = useState('');

  
  // const handleDayPress = (day) => {
  // setSelectedMoodDate(day.dateString);
  // };
  const getSelectedMoodDate = () => {
    if (setMood === 'Amazing') {
      return {
        selected: true,
        selectedColor: '#FFFF00',
        selectedTextColor: 'black',
      };
    } else if (setMood === 'Awful') {
      return {
        selected: true,
        selectedColor: '#7CFC00',
        selectedTextColor: 'white',
      };
    } else if (setMood === 'Good') {
      return {
        selected: true,
        selectedColor: '#228B22',
        selectedTextColor: 'white',
      };
    } else if (setMood === 'Meh') {
      return {
        selected: true,
        selectedColor: '#556B2F',
        selectedTextColor: 'white',
      };
    }
    return {};
  };


  const CustomCalendar = () => {
    const marked = {
      ...getSelectedMoodDate(),
      currentDate: {marked}
    };


    return (
      <Calendar
        initialDate={currentDate}
        minDate="2022-12-01"
        maxDate="2022-12-31"
        disableAllTouchEventsForDisabledDays={true}
        markedDates={marked}
        style={styles.calendar}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Calendar</Text>
      <CustomCalendar
        onDayPress={(day) => console.log('onDayPress', day)}
        onDayLongPress={(day) => console.log('onDayLongPress', day)}
        onMonthChange={(date) => console.log('onMonthChange', date)}
        onPressArrowLeft={(goToPreviousMonth) => {
          console.log('onPressArrowLeft');
          goToPreviousMonth();
        }}
        onPressArrowRight={(goToNextMonth) => {
          console.log('onPressArrowRight');
          goToNextMonth();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center', 
  },
  calendar: {
    width: '100%',
    aspectRatio: 1,
  },
});