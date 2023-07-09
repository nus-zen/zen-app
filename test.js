import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Font from "expo-font";
import Icon from "react-native-vector-icons/FontAwesome"; // Import the icon library

export default function MoodCheckInScreen({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [mood, setMood] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        InterBlack: require("../../assets/fonts/inter-font/Inter-Black.ttf"),
      });

      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  useEffect(() => {
    const checkVisibility = async () => {
      const currentDate = new Date().toISOString().split("T")[0];
      const hasBeenShownToday = await AsyncStorage.getItem("hasBeenShownToday");

      if (hasBeenShownToday === currentDate) {
        setIsVisible(false);
      } else {
        await AsyncStorage.setItem("hasBeenShownToday", currentDate);
        setIsVisible(true);
      }
    };

    checkVisibility();
  }, []);

  const handleMoodSelection = (selectedMood) => {
    setMood(selectedMood);
    navigation.navigate("BottomTabsOverview");
    console.log("MoodCheckIn Button is pressed");
  };

  return isVisible && fontLoaded ? (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.heading}>How are you?</Text>
        <View style={styles.dateContainer}>
          <Icon
            name="calendar"
            size={20}
            color="green"
            style={styles.calendarIcon}
          />
          <Text style={[styles.date, styles.underline, { color: "green" }]}>
            {currentDate}
          </Text>
        </View>
        <View style={styles.moodButtons}>
          <TouchableOpacity
            style={[
              styles.moodButton,
              mood === "Meh" && styles.selectedMoodButton,
            ]}
            onPress={() => handleMoodSelection("Meh")}
          >
            <ImageBackground
              source={require("../../assets/mood_icon/Meh.png")}
              style={styles.imageBackground}
              resizeMode="contain"
            />
            <Text style={[styles.moodButtonText, { color: "#556B2F" }]}>
              Meh
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.moodButton,
              mood === "Awful" && styles.selectedMoodButton,
            ]}
            onPress={() => handleMoodSelection("Awful")}
          >
            <ImageBackground
              source={require("../../assets/mood_icon/Awful.png")}
              style={styles.imageBackground}
              resizeMode="contain"
            />
            <Text style={[styles.moodButtonText, { color: "#228B22" }]}>
              Awful
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.moodButton,
              mood === "Good" && styles.selectedMoodButton,
            ]}
            onPress={() => handleMoodSelection("Good")}
          >
            <ImageBackground
              source={require("../../assets/mood_icon/Good.png")}
              style={styles.imageBackground}
              resizeMode="contain"
            />
            <Text style={[styles.moodButtonText, { color: "#7CFC00" }]}>
              Good
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.moodButton,
              mood === "Amazing" && styles.selectedMoodButton,
            ]}
            onPress={() => handleMoodSelection("Amazing")}
          >
            <ImageBackground
              source={require("../../assets/mood_icon/Amazing.png")}
              style={styles.imageBackground}
              resizeMode="contain"
            />
            <Text style={[styles.moodButtonText, { color: "#FFFF00" }]}>
              Amazing
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  ) : null;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    fontFamily: "InterBlack",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 140,
  },
  calendarIcon: {
    marginRight: 10,
  },
  date: {
    fontSize: 18,
    color: "white",
    fontFamily: "InterBlack",
  },
  underline: {
    textDecorationLine: "underline",
  },
  moodButtons: {
    flexDirection: "row",
    marginBottom: 20,
  },
  moodButton: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 7,
  },
  imageBackground: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  moodButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "InterBlack",
  },
});
