import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DailyStreaksLoginScreen({ navigation }) {
  const [streak, setStreak] = useState(0);
  const [points, setPoints] = useState(0);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const currentDate = new Date();
  const dayOfWeekIndex = currentDate.getDay();
  const dayOfWeekName = daysOfWeek[dayOfWeekIndex];

  useEffect(() => {
    handleLogin();
    loadStreak();
    loadPoints();
  }, []);

  const loadStreak = async () => {
    const storedStreak = await AsyncStorage.getItem("dailyStreak");
    setStreak(storedStreak ? parseInt(storedStreak) : 0);
  };

  const loadPoints = async () => {
    const storedPoints = await AsyncStorage.getItem("userPoints");
    setPoints(storedPoints ? parseInt(storedPoints) : 0);
  };

  const incrementStreak = async () => {
    const newStreak = streak + 1;
    setStreak(newStreak);
    await AsyncStorage.setItem("dailyStreak", newStreak.toString());

    if (newStreak >= 1) {
      addPoints(50);
    }
  }; 

  const resetStreak = async () => {
    setStreak(0);
    await AsyncStorage.setItem("dailyStreak", "0");

    if (newStreak === 0) {
      addPoints(-50);
    }
  };

  const handleLogin = async () => {
    const lastLoginDate = await AsyncStorage.getItem("lastLoginDate");
    const currentTime = new Date().getTime();
  
    if (!lastLoginDate) {
      // User's first login or app's first use, directly increment streak
      incrementStreak();
    } else {
      const timeDifference = currentTime - parseInt(lastLoginDate, 10);
      const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000;
  
      if (timeDifference >= twentyFourHoursInMilliseconds) {
        // More than 24 hours since last login, reset streak
        resetStreak();
      } else {
        // Less than 24 hours since last login, increment streak
        incrementStreak();
      }
    }
  
    await AsyncStorage.setItem("lastLoginDate", currentTime.toString());
  };
  

  const handleNavigateToBottomTabs = () => {
    navigation.navigate("BottomTabsOverview");
  };

  const addPoints = async (amount) => {
    const newPoints = points + amount;
    setPoints(newPoints);

    await AsyncStorage.setItem("userPoints", newPoints.toString());
  };



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../../assets/flame.png")} style={styles.TextImage} />
        <Text style={styles.streakHeaderText}>{` ${streak}   `}</Text>
        <Image source={require("../../assets/money.png")} style={styles.TextImage} />
        <Text style={styles.pointsText}>{` ${points}`}</Text>           
      </View>
      <View style={styles.content}>
        <Image source={require("../../assets/flame.png")} style={styles.flameImage} />
        <View style={styles.rectangleContainer}>
          <View style={styles.daysContainer}>
            {daysOfWeek.map((day, index) => (
              <View key={index} style={styles.dayContainer}>
                <View style={[styles.circle, streak === 1 && dayOfWeekName === day ? styles.redCircle : (streak === 0 ? styles.grayCircle : null)]}>
                  {streak === 1 && dayOfWeekName === day ? (
                    <Image source={require("../../assets/redcheckcircle.png")} style={styles.checkIcon} />
                  ) : null}
                </View>

                <Text style={styles.dayLabel}>{day}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <Text style={styles.subtitle}>
        {streak >= 1 
          ? `Wow, you are making great progress! Adding ${points} points!`
          : `You can try harder next time. Removing ${points} points`}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleNavigateToBottomTabs}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    alignItems: "center",
    marginTop: 40,
    marginRight: -250,
    zIndex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 200,
    alignItems: "center",
  },
  continueButton: {
    backgroundColor: "green",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 30,
    width: "80%",
    marginBottom: 60,
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
  TextImage: {
    width: 20,
    height: 20,
  },
  streakHeaderText: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
  pointsText: {
    fontSize: 18,
    color: "gold",
    fontWeight: "bold",
  },
  rectangleContainer: {
    padding: 10,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "transparent",
  
  },
  daysContainer: {
    flexDirection: "row",
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
  },
  redCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "red",
    marginHorizontal: 6,
  },
  grayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "gray",
    marginHorizontal: 6,
  },
  checkIcon: {
    width: 40,
    height: 40,
  },
  dayLabel: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    marginTop: -100,
  },
});