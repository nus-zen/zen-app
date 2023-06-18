import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

export default function MoodCalendar() {
  const currentDate = moment().format('YYYY-MM-DD');

  const CustomCalendar = () => {
    const marked = {
      '2023-12-10': { marked: true, dotColor: 'red' },
      '2023-12-12': { selected: true, selectedColor: '#aa2222', selectedTextColor: 'yellow' },
      '2023-12-13': {
        marked: true,
        selected: true,
        selectedColor: '#222222',
        selectedTextColor: 'yellow',
        dotColor: 'white'
      }
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
