import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WelcomeScreen({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        InterBlack: require("../../assets/fonts/inter-font/Inter-Black.ttf"),
      });

      setFontLoaded(true);
      console.log("Font loaded successfully!");
    } catch (error) {
      console.log("Error loading font:", error);
    }
  };

  const handleClearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage has been cleared.");
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };

  useEffect(() => {
    loadFonts();
    handleClearAsyncStorage();
  }, []);

  const handlePress = () => {
    navigation.navigate("LoginScreen");
    console.log("Welcome Screen Button is pressed");
  };

  const handleOnboardingPress = () => {
    console.log("pressed onboarding button");
    navigation.navigate("OnboardingScreen");
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../../assets/WelcomeScreenForestBackground.jpg")}
        style={styles.backgroundImage}
      >
        {fontLoaded && (
          <View style={styles.container}>
            <Text style={styles.text}>
              Welcome on your journey to mindfulness.
            </Text>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { marginTop: 20 }]}
              onPress={handleOnboardingPress}
            >
              <Text style={styles.buttonText}>Onboarding</Text>
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
    resizeMode: "stretch",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  text: {
    fontSize: 50,
    fontFamily: "InterBlack",
    fontWeight: "700",
    fontStyle: "normal",
    textAlign: "center",
    textAlignVertical: "top",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 3,
  },
  button: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    //position: "absolute",
    width: 220,
    bottom: "-20%",
    backgroundColor: "green",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 25,
  },
  buttonText: {
    fontFamily: "InterBlack",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 16,
    color: "#FFFFFF",
  },
});
