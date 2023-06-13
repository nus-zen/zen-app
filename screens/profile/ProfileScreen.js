import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import UploadImage from '../../components/UploadImage';
import MoodCalendar from '../../components/MoodCalendar';
import AccountsScreen from "../../screens/profile/AccountsScreen";


export default function ProfileScreen({ navigation, route }) {
  const navigateToAccounts = () => {
    navigation.navigate('AccountsScreen'); 
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.uploadContainer}>
          <UploadImage />
          <View style={styles.settingsContainer}>
            <TouchableOpacity onPress={navigateToAccounts}>
              <Image source={require('../../assets/Settings.png')} style={styles.settingsIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{ marginVertical: 20, fontSize: 16 }}>GOAT</Text>
        <MoodCalendar />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 120,
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
  uploadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  settingsContainer: {
    marginLeft: 'auto',
  },
  settingsIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});