import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';

export default function ActivityLog() {
  const [activityLog, setActivityLog] = useState([
    { text: 'Wow! You walked for 15 minutes! Keep up the good work!', image: require('../assets/activity_log/strong.png') },
    { text: 'Congratulations on meditating for 15 minutes', image: require('../assets/activity_log/brain.png') },
    { text: 'You bought a voucher for 100 tokens Enjoy!', image: require('../assets/activity_log/coupon.png') },
    { text: 'Wow! You walked for 15 minutes! Keep up the good work!', image: require('../assets/activity_log/strong.png') },
  ]);

  const handleActivityPress = (activity) => {
    console.log(`Pressed activity: ${activity.text}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity Log</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {activityLog.map((activity, index) => (
          <TouchableOpacity
            key={index}
            style={styles.activityButton}
            onPress={() => handleActivityPress(activity)}
          >
            <Image
              source={activity.image}
              style={[styles.activityImage, { tintColor: 'green' }]}
              resizeMode="contain"
            />
            <Text style={styles.activityText}>{activity.text}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    marginBottom: 10,
    textAlign: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  activityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 90,
    backgroundColor: '#eaeaea',
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  activityImage: {
    width: 40,
    height: 40,
    marginHorizontal: -10,

  },
  activityText: {
    textAlign: 'left',
    fontSize: 16,
    paddingHorizontal: 20, 
  },
});
