import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

// mood calendar
export default function ProfileScreen({ navigation, route }) {
  return (
    <SafeAreaView style={styles.container}>
      
      <CustomCalendar
        //title="MoodCalender"
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

function CustomCalendar(props) {
  const marked = {
    '2022-12-10': { marked: true, dotColor: 'red' },
    '2022-12-12': { selected: true, selectedColor: '#aa2222', selectedTextColor: 'yellow' },
    '2022-12-13': {
      marked: true,
      selected: true,
      selectedColor: '#222222',
      selectedTextColor: 'yellow',
      dotColor: 'white'
    }
  };
  return (
    <Calendar
      initialDate="2022-12-01"
      minDate="2022-12-01"
      maxDate="2022-12-31"
      disableAllTouchEventsForDisabledDays={true}
      markedDates={marked}
      {...props}
    />
  );
}
