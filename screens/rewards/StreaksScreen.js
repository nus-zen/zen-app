import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StreaksScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Streaks</Text>
      <Text style={styles.subtitle}>Track your daily streaks here!</Text>
      {/* Add your streaks components and logic here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
});
