import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const MoodCalendar = ({ selectedMood, onMoodChange }) => {
  const currentDate = moment().format('YYYY-MM-DD');
  const [selectedMoodDate, setSelectedMoodDate] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const moodColors = {
    Amazing: '#FFFF00',
    Awful: '#7CFC00',
    Good: '#228B22',
    Meh: '#556B2F',
  };

  const getMarkedDates = () => {
    const marked = {};

    if (selectedMoodDate) {
      marked[selectedMoodDate] = {
        selected: true,
        selectedColor: moodColors[selectedMood],
      };
    }

    marked[currentDate] = {
      selected: true,
      selectedColor: moodColors[selectedMood],
    };

    return marked;
  };

  const onDayPress = (day) => {
    const selectedDate = day.dateString;
    setSelectedMoodDate(selectedDate);
  };

  const MoodSelectionPopup = () => {
    return (
      <Modal transparent visible={isPopupVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.popupHeading}>How is your mood today?</Text>
            {Object.keys(moodColors).map((mood) => (
              <TouchableOpacity
                key={mood}
                style={[
                  styles.moodOption,
                  { backgroundColor: moodColors[mood] },
                  selectedMood === mood && styles.selectedMoodOption,
                ]}
                onPress={() => {
                  onMoodChange(mood);
                  setSelectedMoodDate(currentDate);
                  setIsPopupVisible(false);
                }}
              >
                <Text style={styles.moodText}>{mood}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsPopupVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Calendar</Text>
      <Calendar
        initialDate={currentDate}
        minDate="2022-12-01"
        maxDate="2022-12-31"
        disableAllTouchEventsForDisabledDays={true}
        markedDates={getMarkedDates()}
        onDayPress={onDayPress}
        style={styles.calendar}
      />

      {/* Mood selection button */}
      <TouchableOpacity
        style={styles.selectMoodButton}
        onPress={() => setIsPopupVisible(true)}
      >
        <Text style={styles.selectMoodButtonText}>Select Mood</Text>
      </TouchableOpacity>

      {/* Mood Selection Popup */}
      <MoodSelectionPopup />
    </View>
  );
};

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
  selectMoodButton: {
    width: '100%',
    height: 40,
    backgroundColor: 'blue',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  selectMoodButtonText: {
    color: 'white',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  popupHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  moodOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedMoodOption: {
    borderWidth: 2,
    borderColor: 'black',
  },
  moodText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'blue',
  },
});

export default MoodCalendar;
