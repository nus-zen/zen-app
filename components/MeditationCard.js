import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  retrieveFavStatus,
  setFavStatusAsync,
} from "../utils/AsyncStorageUtils";

const MeditationCard = ({ title, subtitle, imageSource, onPress }) => {
  // track favourite status
  const [isFav, setIsFav] = useState(false);

  // Toggle the fav status and save it in asyncStorage
  const onFavPress = async () => {
    const newFav = !isFav;
    setIsFav(newFav);

    // save to asyncstorage
    await setFavStatusAsync(title, newFav);
  };

  // use UseEffect to set the initial fav status when the component mounts
  useEffect(() => {
    const fetchFavStatus = async () => {
      const favStatus = await retrieveFavStatus(title);
      setIsFav(favStatus);
    };

    fetchFavStatus();
  }, [title]);

  return (
    <View style={styles.cardContainer}>
      <Pressable
        style={({ pressed }) => pressed && styles.pressedIndicator}
        onPress={onPress}
      >
        <Image source={imageSource} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        <Pressable onPress={onFavPress}>
          <View style={styles.ratingContainer}>
            <Text>{isFav ? "Favourited" : "Not Favourited"}</Text>
            <Ionicons name="star" size={20} color={isFav ? "gold" : "grey"} />
          </View>
        </Pressable>
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
