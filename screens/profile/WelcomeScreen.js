import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import * as Font from 'expo-font';

export default function WelcomeScreen({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        InterBlack: require('../../assets/fonts/inter-font/Inter-Black.ttf'),
      });

      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  const handlePress = () => {
    navigation.navigate('MoodCheckInScreen');
    console.log('Welcome Screen Button is pressed');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../../assets/WelcomeScreenForestBackground.jpg')}
        style={styles.backgroundImage}
      >
        {fontLoaded && (
          <View style={styles.container}>
            <Text style={styles.text}>Welcome on your journey to mindfulness.</Text>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 50,
    fontFamily: 'InterBlack',
    fontWeight: '700',
    fontStyle: 'normal',
    textAlign: 'center',
    textAlignVertical: 'top',
    lineHeight: 60,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 3,
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    position: 'absolute',
    width: 220,
    height: 50,
    left: 86,
    top: 600,
    backgroundColor: 'green',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 25,
  },
  buttonText: {
    fontFamily: 'InterBlack',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 16,
    color: '#FFFFFF',
  },
});
