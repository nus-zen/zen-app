import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const lines = [
  "A crochet a day keeps the doctor away!",
  "Hook, yarn, and stitch your worries away!",
  "In a stitch of time, stress unwinds!",
  "Knit one, purl one, embrace the fun!",
  "When life unravels, crochet to travel!",
  "One loop at a time, find your peace of mind!",
  "Wrap your worries in threads of crochet!",
  "Crochet away, make stress decay!",
  "Knit a little, laugh a lot!",
  "Cuddle your hook, bid stress goodbye!",
  "From chaos to crochet, find your Zen way!",
  "Chase away blues with a hook and hues!",
];

const PracticeModal = ({ isVisible, onClose, onPressLearnMore }) => {
  if (!isVisible) {
    return null;
  }

  const [randomLine, setRandomLine] = useState(
    "A crochet a day keeps the doctor away!"
  );

  // Function to select a random line from the lines array
  const selectRandomLine = () => {
    const randomIndex = Math.floor(Math.random() * lines.length);
    setRandomLine(lines[randomIndex]);
  };

  // Call selectRandomLine when the modal is opened or refreshed
  useEffect(() => {
    if (isVisible) {
      selectRandomLine();
    }
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.modalContainer}>
      {/* Crochet Icon */}
      <Image
        source={require("../assets/yarn-ball-icon.png")}
        style={styles.crochetIcon}
      />

      {/* Title */}
      <Text style={styles.titleText}>{randomLine}</Text>

      {/* Learn More Button */}
      <TouchableOpacity
        style={styles.learnMoreButton}
        onPress={onPressLearnMore}
      >
        <Text style={styles.learnMoreButtonText}>Learn More</Text>
      </TouchableOpacity>

      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <MaterialIcons name="close" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    borderColor: "black",
    borderWidth: 1,
  },
  crochetIcon: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  learnMoreButton: {
    backgroundColor: "#42b983",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 16,
  },
  learnMoreButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
  },
});

export default PracticeModal;
