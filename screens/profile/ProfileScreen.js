import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';

// Main imports for the calendar
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

// Main imports for choosing the profile picture
import UploadImage from '../../screens/profile/UploadImage';

export default function ProfileScreen({ navigation, route }) {
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    scrollView: {
      flex: 1,
      width: '100%',
    },
    contentContainer: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    calendar: {
      width: '100%',
      aspectRatio: 1,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <UploadImage />
        <Text style={{ marginVertical: 20, fontSize: 16 }}>GOAT</Text>
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
      </ScrollView>
    </SafeAreaView>
  );
}
