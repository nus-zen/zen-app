import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function ZenBandHelpCard({ isVisible, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isVisible) {
      setCurrentIndex(0);
    }
  }, [isVisible]);

  const instructions = [
    {
      title: "How to Wear a Watch",
      steps: [
        "1. Select the wrist on which you want to wear the watch. Most people wear watches on their non-dominant wrist.",
        "2. Slide the watch band through the buckle and fasten it securely around your wrist.",
        "3. Ensure that the watch fits comfortably but not too tightly. You should be able to slide one finger between the band and your wrist.",
      ],
    },
    {
      title: "How to Change the Battery of the Watch",
      steps: [
        "1. Open the back cover of the watch. Some watches have a removable back cover, while others may require a special tool to open.",
        "2. Locate the old battery and carefully remove it using a small screwdriver or a pair of tweezers.",
        "3. Insert a new battery of the same type and size as the old one.",
        "4. Close the back cover of the watch securely.",
      ],
    },
  ];

  const handleNext = () => {
    if (currentIndex < instructions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const renderCircles = () => {
    return instructions.map((instruction, index) => (
      <View
        key={index}
        style={[
          styles.circle,
          index === currentIndex ? styles.activeCircle : null,
        ]}
      />
    ));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>

        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              {instructions[currentIndex].title}
            </Text>
            <Text style={styles.instructionText}>
              {instructions[currentIndex].steps.join("\n")}
            </Text>
            <View style={styles.circleContainer}>
                {renderCircles()}
            </View>             
          </View>
        </View>
       
        <View style={styles.buttonContainer}>
          {currentIndex < instructions.length - 1 && (
            <TouchableOpacity
              onPress={handleNext}
              style={[styles.button, styles.nextButton]}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={onClose}
            style={[styles.button, styles.closeButton]}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  circleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40,
    justifyContent: "center",
    height: 30,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "black",
    marginHorizontal: 5,
  },
  activeCircle: {
    backgroundColor: "green",
  },
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 18,
    width: "90%",
  },
  card: {
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  instructionText: {
    fontSize: 16,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  button: {
    padding: 15,
    borderRadius: 18,
    alignItems: "center",
    width: "40%",
  },
  nextButton: {
    backgroundColor: "green",
    marginRight: 10,
  },
  closeButton: {
    backgroundColor: "black",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
