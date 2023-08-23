import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DailyStreaksLoginScreen() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    loadStreak();
  }, []);

  const loadStreak = async () => {
    const storedStreak = await AsyncStorage.getItem("dailyStreak");
    if (storedStreak) {
      setStreak(parseInt(storedStreak));
    }
  };

  const incrementStreak = async () => {
    const newStreak = streak + 1;
    setStreak(newStreak);
    await AsyncStorage.setItem("dailyStreak", newStreak.toString());
  };

  const resetStreak = async () => {
    setStreak(0);
    await AsyncStorage.removeItem("dailyStreak");
  };

  const handleLogin = async () => {
    const lastLoginDate = await AsyncStorage.getItem("lastLoginDate");
    const currentDate = new Date().toLocaleDateString();

    if (lastLoginDate === currentDate) {
      // User has already logged in today
      console.log("You've already logged in today!");
    } else {
      // User logs in on a new day
      console.log("Logged in successfully!");
      await AsyncStorage.setItem("lastLoginDate", currentDate);
      incrementStreak();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Streaks Login</Text>
      <Text style={styles.streakText}>Current Streak: {streak} days</Text>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.resetButton} onPress={resetStreak}>
        <Text style={styles.resetButtonText}>Reset Streak</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  streakText: {
    fontSize: 18,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#589310",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
  },
  resetButton: {
    marginTop: 20,
  },
  resetButtonText: {
    color: "red",
    fontSize: 16,
  },
});
