import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';

export default function MoodCheckInScreen({ navigation }) {
  const [mood, setMood] = useState('');

  const handleMoodSelection = (selectedMood) => {
    setMood(selectedMood);
    navigation.navigate('BottomTabsOverview');
    console.log('MoodCheckIn Button is pressed');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.heading}>How are you feeling today?</Text>
        <View style={styles.moodButtons}>          
          <TouchableOpacity
            onPress={() => handleMoodSelection('Meh')}
          >
            <ImageBackground
              source={require('../../assets/mood_icon/Meh.png')}
              style={[styles.moodButton, mood === 'Meh' && styles.selectedMoodButton]}
            ></ImageBackground>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => handleMoodSelection('Awful')}
          >
            <ImageBackground
              source={require('../../assets/mood_icon/Awful.png')}
              style={[styles.moodButton, mood === 'Awful' && styles.selectedMoodButton]}
            ></ImageBackground>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => handleMoodSelection('Good')}
          >
            <ImageBackground
              source={require('../../assets/mood_icon/Good.png')}
              style={[styles.moodButton, mood === 'Good' && styles.selectedMoodButton]}
            ></ImageBackground>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => handleMoodSelection('Amazing')}
          >
            <ImageBackground
              source={require('../../assets/mood_icon/Amazing.png')}
              style={[styles.moodButton, mood === 'Amazing' && styles.selectedMoodButton]}
            ></ImageBackground>
          </TouchableOpacity>
        </View>
        <Text style={styles.selectedMoodText}>Selected Mood: {mood}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  moodButtons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  moodButton: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginHorizontal: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedMoodButton: {
    backgroundColor: 'lightblue',
  },
  selectedMoodText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
