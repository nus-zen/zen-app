import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // You can use other icon libraries if preferred
import { useNavigation } from "@react-navigation/native";

const ThumbsRating = () => {
  const [rating, setRating] = useState(null);
  const navigation = useNavigation();

  const handleRating = (selectedRating) => {
    // Handle the rating selection here, e.g., send it to a server or update state
    Alert.alert("you have rated " + selectedRating);
    setRating(selectedRating);
    navigation.navigate("BottomTabsOverview");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.thumbButton,
          rating === "thumbs-down" && styles.selectedThumb,
        ]}
        onPress={() => handleRating("thumbs-down")}
      >
        <FontAwesome name="thumbs-down" size={30} color="red" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.thumbButton,
          rating === "thumbs-medium" && styles.selectedThumb,
        ]}
        onPress={() => handleRating("thumbs-medium")}
      >
        <FontAwesome name="thumbs-o-up" size={30} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.thumbButton,
          rating === "thumbs-up" && styles.selectedThumb,
        ]}
        onPress={() => handleRating("thumbs-up")}
      >
        <FontAwesome name="thumbs-up" size={30} color="green" />
      </TouchableOpacity>
    </View>
  );
};

export default ThumbsRating;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  thumbButton: {
    borderWidth: 1,
    borderColor: "transparent",
    padding: 10,
  },
  selectedThumb: {
    borderColor: "blue", // Add a border color for the selected thumb
  },
});
