import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RatingStars({ rating, setRating }) {
  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          style={styles.star}
          onPress={() => handleStarPress(star)}
        >
          <Ionicons
            name={star <= rating ? "star" : "star-outline"}
            size={32}
            color="gold"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  star: {
    marginRight: 5,
  },
});
