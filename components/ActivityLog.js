import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function ActivityLog() {
  const [activities, setActivities] = useState([]);

  const addActivity = (newActivity) => {
    setActivities((prevActivities) => [...prevActivities, newActivity]);
  };

  const renderActivity = ({ item }) => (
    <View style={styles.activityItem}>
      <Text>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity Log</Text>
      <FlatList
        data={activities}
        renderItem={renderActivity}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => addActivity('New activity')}
      >
        <Text style={styles.buttonText}>Add Activity</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  activityItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingVertical: 8,
  },
  addButton: {
    marginTop: 16,
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

