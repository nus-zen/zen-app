import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const PracticeModal = ({ isVisible, onClose, onPressLearnMore }) => {
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
      <Text style={styles.titleText}>
        A crochet a day keeps the doctor away!
      </Text>

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
