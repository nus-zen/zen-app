import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

const MeditationCard = ({ title, subtitle, imageSource, onPress }) => {
  return (
    <View style={styles.cardContainer}>
      <Pressable
        style={({ pressed }) => pressed && styles.pressedIndicator}
        onPress={onPress}
      >
        <Image source={imageSource} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFFFFF",
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555555",
    textAlign: "center",
  },
  pressedIndicator: {
    opacity: 0.75,
  },
});

export default MeditationCard;
