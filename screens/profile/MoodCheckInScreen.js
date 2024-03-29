import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Font from "expo-font";
import Icon from "react-native-vector-icons/FontAwesome";
import MoodCalendar from "../../components/MoodCalendar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import analytics from "@react-native-firebase/analytics";

export default function MoodCheckInScreen({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [mood, setMood] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        InterBlack: require("../../assets/fonts/inter-font/Inter-Black.ttf"),
      });

      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  const handleMoodSelection = async (selectedMood) => {
    try {
      console.log("selectedMood:", selectedMood);
      // Store the selected mood in AsyncStorage
      await AsyncStorage.setItem("selectedMood", selectedMood);

      // set analytics collection to enabled for this app
      await analytics().setAnalyticsCollectionEnabled(true);
      console.log("Analytics collection enabled");

      // Log the selected mood using Firebase Analytics
      await analytics().logSelectContent({
        content_type: "mood selection",
        item_id: selectedMood,
      });

      // Navigate to the DailyStreaksScreen
      navigation.navigate("DailyStreaksScreen");
    } catch (error) {
      console.error("Error storing mood:", error);
    }
  };

  useEffect(() => {
    const getCurrentDate = () => {
      const date = new Date();

      const options = { day: "2-digit", month: "short", year: "numeric" };
      const formattedDate = date.toLocaleDateString(undefined, options);

      setCurrentDate(formattedDate);
    };

    getCurrentDate();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      {fontLoaded && (
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
      )}
    </SafeAreaView>
  );
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
