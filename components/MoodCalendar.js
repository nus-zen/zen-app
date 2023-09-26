import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MoodCalendar({}) {
  const currentDate = moment().format('YYYY-MM-DD');
  const [storedMood, setStoredMood] = useState(null);

  useEffect(() => {
    getStoredMood();
  }, []);

  const getStoredMood = async () => {
    try {
      const storedMood = await AsyncStorage.getItem("selectedMood");
      setStoredMood(storedMood);
      console.log("Mood stored:", storedMood);
    } catch (error) {
      console.error("Error retrieving mood:", error);
    }
  };

  const CustomCalendar = () => {
    // Calculate the date range for one year from the current date
    const oneYearAgo = moment().subtract(1, 'year').format('YYYY-MM-DD');
    const oneYearFromNow = moment().add(1, 'year').format('YYYY-MM-DD');
    console.log(getColorForMood(storedMood));
    console.log(currentDate);
    // Define the marked dates object inside the CustomCalendar component
    const marked = {};

  marked[currentDate] = {
    dotColor: getColorForMood(storedMood), // Pass storedMood here
    selected: true,
  };


    return (
      <Calendar
        initialDate={currentDate}
        minDate={oneYearAgo} // Set minDate to one year ago
        maxDate={oneYearFromNow} // Set maxDate to one year from now
        disableAllTouchEventsForDisabledDays={true}
        markedDates={marked}
        style={styles.calendar}
      />
    );
  };

  const getColorForMood = (mood) => {
    let color = 'transparent'; // Default color
  
    if (mood === 'Good') {
      color = '#7CFC00'; // Green
    } else if (mood === 'Awful') {
      color = '#228B22'; // Forest Green
    } else if (mood === 'Meh') {
      color = '#556B2F'; // Dark Olive Green
    } else if (mood === 'Amazing') {
      color = '#FFFF00'; // Yellow
    }
  
    return color;
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
