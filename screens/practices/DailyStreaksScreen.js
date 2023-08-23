import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DailyStreaksLoginScreen({ navigation }) {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    loadStreak();
  }, []);

  const loadStreak = async () => {
    const storedStreak = await AsyncStorage.getItem("dailyStreak");
    setStreak(storedStreak ? parseInt(storedStreak) : 0);
  };

  const incrementStreak = async () => {
    const newStreak = streak + 1;
    setStreak(newStreak);
    await AsyncStorage.setItem("dailyStreak", newStreak.toString());
  };

  const resetStreak = async () => {
    setStreak(0);
    await AsyncStorage.setItem("dailyStreak", "0");
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleLogin = async () => {
    const lastLoginDate = await AsyncStorage.getItem("lastLoginDate");
    const currentTime = new Date().getTime();

    if (!lastLoginDate || currentTime - parseInt(lastLoginDate, 10) >= 24 * 60 * 60 * 1000) {
      resetStreak();
    }

    await AsyncStorage.setItem("lastLoginDate", currentTime.toString());
    incrementStreak();
  };

  const handleNavigateToBottomTabs = () => {
    navigation.navigate("BottomTabsOverview");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image source={require("../../assets/flame.png")} style={styles.flameTextImage} />
          <Text style={styles.streakHeaderText}>{` ${streak}`}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Image source={require("../../assets/flame.png")} style={styles.flameImage} />
        <View style={styles.rectangleContainer}>
          <View style={styles.daysContainer}>
            {daysOfWeek.map((day, index) => (
              <View key={index} style={styles.dayContainer}>
                <View style={styles.circle} />
                <Text style={styles.dayLabel}>{day}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleNavigateToBottomTabs}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center", // Center vertically
    marginTop: 20,
    marginRight: -300,
    zIndex: 1,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  streakContainer: {
    marginBottom: 10,
    position: "relative",
  },

  continueButton: {
    backgroundColor: "green",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "80%",
    marginBottom: 20,
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  flameImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  flameTextImage: {
    width: 20,
    height: 20,
  },
  streakHeaderText: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
  rectangleContainer: {
    padding: 10,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "transparent",
    opacity: 0.8,
    marginBottom: 20,
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  dayContainer: {
    alignItems: "center",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    marginHorizontal: 6,
    opacity: 0.8,
  },
  dayLabel: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
    opacity: 0.8,
  },
  buttonContainer: {
    justifyContent: "flex-end",
  },
});
