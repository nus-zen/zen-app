import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { getAverageMeditationRating } from "../utils/AsyncStorageUtils";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const MeditationCard = ({
  title,
  subtitle,
  imageSource,
  onPress,
  isSpecialStyle,
}) => {
  const [averageRating, setAverageRating] = useState(null);

  useEffect(() => {
    // Fetch the average rating for the meditation
    getAverageRating();
  }, []);

  const getAverageRating = async () => {
    const rating = await getAverageMeditationRating(title);
    setAverageRating(rating);
  };

  if (!!isSpecialStyle) {
    return (
      <View style={styles.cardContainer}>
        <Pressable
          style={({ pressed }) => pressed && styles.pressedIndicator}
          onPress={onPress}
        >
          <Text style={styles.smallerTitle}>{title}</Text>

          {averageRating !== null ? (
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>{averageRating.toFixed(1)}</Text>
              <Ionicons name="star" size={20} color="gold" />
            </View>
          ) : (
            <Text style={styles.noRatingText}>No rating yet</Text>
          )}
        </Pressable>
      </View>
    );
  }
  return (
    <View style={styles.cardContainer}>
      <Pressable
        style={({ pressed }) => pressed && styles.pressedIndicator}
        onPress={onPress}
      >
        <Image source={imageSource} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        {averageRating !== null ? (
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{averageRating.toFixed(1)}</Text>
            <Ionicons name="star" size={20} color="gold" />
          </View>
        ) : (
          <Text style={styles.noRatingText}>No rating yet</Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#333333",
  },
  smallerTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 0,
    textAlign: "center",
    color: "#333333",
  },
  subtitle: {
    fontSize: 16,
    color: "#555555",
    textAlign: "center",
  },
  pressedIndicator: {
    opacity: 0.75,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  rating: {
    marginRight: 8,
    fontSize: 18,
    color: "#FFC107",
    fontWeight: "bold",
  },
  noRatingText: {
    marginTop: 4,
    fontStyle: "italic",
    color: "gray",
  },
});

export default MeditationCard;
