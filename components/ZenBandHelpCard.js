import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet } from "react-native";
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
      title: "How to Wear a ZenBand",
      steps: [
        "1. Select the wrist on which you want to wear the ZenBand. Most people wear ZenBand on their non-dominant wrist.",
        "2. Slide the ZenBand band through the buckle and fasten it securely around your wrist.",
        "3. Ensure that the ZenBand fits comfortably but not too tightly. You should be able to slide one finger between the band and your wrist.",
      ],

      image: require("./../assets/zenband/components.png"), // Add the image source ../../assets/zenband/components.jpg


    },
    {
      title: "How to Refill ZenBand",
      steps: [
        "1. Remove the Ring and Lid the ZenBand.",
      ],
      image: require("./../assets/zenband/refillStep1.png"), // Add the image source
    },
    {
      title: "How to Refill ZenBand",
      steps: [
        "2. Remove the used scented sponge from the ZenBand.",
      ],
      image: require("./../assets/zenband/refillStep2.png"), // Add the image source
    },
    {
      title: "How to Refill ZenBand",
      steps: [
        "3. Add two to three drops of the desired scent to a new sponge",
      ],
      image: require("./../assets/zenband/refillStep3.png"), // Add the image source
    }, //C:\Users\Foo Shu Hui\OneDrive\Documents\GitHub\zen-app\assets\zenband\zenband_refil_ step1.png
    {
      title: "How to Refill ZenBand",
      steps: [
        "4. Put the new sponge, ZenBand lid and ZenBand ring back onto the ZenBand",
      ],
      image: require("./../assets/zenband/refillStep4.png"), // Add the image source
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
            <Image
              source={instructions[currentIndex].image}
              style={styles.instructionImage}
            />
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
    backgroundColor: "#ededed", 
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
  instructionImage: {
    width: "100%",
    height: 200,
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