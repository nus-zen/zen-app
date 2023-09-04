import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';

const LeagueHomepageScreen = () => {
  const [selectedButton, setSelectedButton] = useState('GreenLeague'); // Initialize selectedButton
  const [showGreenShield, setShowGreenShield] = useState(true); // Initialize showGreenShield
  const [showRedShield, setShowRedShield] = useState(false);
  const [showYellowShield, setShowYellowShield] = useState(false);

  const toggleShowGreenShield = () => {
    setSelectedButton('GreenLeague');
    setShowGreenShield(true);
    setShowRedShield(false);
    setShowYellowShield(false);
  };

  const toggleShowRedShield = () => {
    setSelectedButton('RedLeague');
    setShowGreenShield(false);
    setShowRedShield(true);
    setShowYellowShield(false);
  };

  const toggleShowYellowShield = () => {
    setSelectedButton('YellowLeague');
    setShowGreenShield(false);
    setShowRedShield(false);
    setShowYellowShield(true);
  };

  // Define your animal data here
  const greenShieldData = [
    { id: '1', name: 'More amazing meditation types!' },
    { id: '2', name: 'More amazing meditation audio!' },
    { id: '3', name: 'Redeemable F&B Vouchers!' },
  ];

  const redShieldData = [
    { id: '1', name: 'Access to more activities' },

  ];

  const yellowShieldData = [
    { id: '1', name: 'More amazing meditation types!' },
    { id: '2', name: 'More amazing meditation audio!' },
    { id: '3', name: 'Redeemable F&B Vouchers!' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.shieldRow}>
        <TouchableOpacity
          onPress={toggleShowGreenShield}
          style={[
            styles.leagueButton,
            selectedButton === 'GreenLeague' && styles.selectedButton,
          ]}
        >
          <Image source={require('../../assets/shield-streaks/green_shield.png')} style={styles.leagueImage} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleShowRedShield}
          style={[
            styles.leagueButton,
            selectedButton === 'RedLeague' && styles.selectedButton,
          ]}
        >
          <Image source={require('../../assets/shield-streaks/red_shield.png')} style={styles.leagueImage} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleShowYellowShield}
          style={[
            styles.leagueButton,
            selectedButton === 'YellowLeague' && styles.selectedButton,
          ]}
        >
          <Image source={require('../../assets/shield-streaks/y_shield.png')} style={styles.leagueImage} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, width: '100%' }}>
        {showGreenShield && (
          <FlatList
            data={greenShieldData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.shieldItem}>
                <Text style={styles.shieldName}>{item.name}</Text>
              </View>
            )}
          />
        )}

        {showRedShield && (
          <FlatList
            data={redShieldData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.shieldItem}>
                <Text style={styles.shieldName}>{item.name}</Text>
              </View>
            )}
          />
        )}

        {showYellowShield && (
          <FlatList
            data={yellowShieldData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.shieldItem}>
                <Text style={styles.shieldName}>{item.name}</Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  shieldRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  leagueButton: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  selectedButton: {
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 5,
  },
  leagueImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  shieldItem: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    marginBottom: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: "#dddddd",
  },
  shieldName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LeagueHomepageScreen;
