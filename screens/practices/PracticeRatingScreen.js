import React, { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RatingStars from "../../components/RatingStars";
import { useNavigation } from "@react-navigation/native";
import { saveMeditationRating } from "../../utils/AsyncStorageUtils";

export default function PracticeRatingScreen({ route }) {
  const [rating, setRating] = useState(0);
  const navigation = useNavigation();
  const { title } = route.params;

  const handleFinishRating = () => {
    saveMeditationRating(title, rating);
    Alert.alert("Rating", `You have rated ${rating} stars!`, [
      { onPress: () => navigation.navigate("BottomTabsOverview") },
    ]);
  };

  const handleBackButton = () => {
    // When user presses back on android, it goes to home screen instead of video.
    navigation.navigate("BottomTabsOverview"); // Navigate to the home screen
    return true; // Prevent default back button behavior
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButton
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>You have completed the practice!</Text>

      <Text style={styles.subtitle}>Was that activity useful?</Text>
      {/* Rating */}
      <View style={styles.ratingContainer}>
        <RatingStars rating={rating} setRating={setRating} />
      </View>

      {/* Finish Rating button */}
      <TouchableOpacity style={styles.button} onPress={handleFinishRating}>
        <Text style={styles.buttonText}>Finish Rating</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  ratingContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
