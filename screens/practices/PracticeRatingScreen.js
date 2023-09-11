import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ThumbsRating from "../../components/ThumbsRating";

export default function PracticeRatingScreen() {
  const navigation = useNavigation();

  const handleFinishRating = () => {
    navigation.navigate("BottomTabsOverview");
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

      {/* <TouchableOpacity style={styles.button} onPress={handleFinishRating}>
        <Text style={styles.buttonText}>Great effort!</Text>
      </TouchableOpacity> */}
      <Text style={styles.buttonText}>Was that practice effective?</Text>
      <ThumbsRating />
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
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});
