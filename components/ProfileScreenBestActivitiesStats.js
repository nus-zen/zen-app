import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import * as Font from 'expo-font';

export default function ProfileScreenBestActivitiesStats({ bestStreaks, bestActivity, activitiesCompleted }) {
  const days = 8; // Variable storing the number of days
  const updatedBestStreaks = `${days} days`;

  const activity = "walking"; // Variable storing the best activity
  const updatedBestActivity = `${activity}`;

  const activityDone = 100; // Variable storing the number of activities completed
  const updatedActivitiesCompleted = `${activityDone} activities`;

  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          'InterRegular': require('../assets/fonts/inter-font/Inter-Regular.ttf'),
          'InterBold': require('../assets/fonts/inter-font/Inter-Bold.ttf'),
        });

        setFontLoaded(true);
        console.log("Font loaded successfully!");
      } catch (error) {
        console.log("Error loading font:", error);
      }
    };

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null; 
  }

  return (
    <View style={styles.container}>
      <View style={styles.statContainer}>
        <Text style={styles.statValue}>{updatedBestStreaks}</Text>
        <Text style={styles.statTitle}>Best Streaks</Text>
      </View>
      <View style={styles.statContainer}>
        <Text style={[styles.statValue, styles.centerText]}>{updatedBestActivity}</Text>        
        <Text style={styles.statTitle}>Best Activity</Text>
      </View>
      <View style={styles.statContainer}>
        <Text style={styles.statValue}>{updatedActivitiesCompleted}</Text>        
        <Text style={styles.statTitle}>Activities Completed</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statContainer: {
    alignItems: 'center',
    padding: 5,
  },
  statTitle: {
    fontFamily: 'InterBold', 
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  statValue: {
    fontFamily: 'InterRegular',
    fontSize: 18,
    marginTop: 4,
    textTransform: 'capitalize',
    color: '#589310',
  },
  centerText: {
    textAlign: 'center',
  },
});
