import React, { useState, useRef, useEffect } from "react";
import { View, Text, Animated, TouchableOpacity } from "react-native";

export const PointsPopup = ({ pointsEarned, isVisible, onClose }) => {
  const fadeAnim = useRef(new Animated.Value(0.5)).current; // Initial value for opacity

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  return (
    <Animated.View style={{ ...styles.popup, opacity: fadeAnim }}>
      <Text style={styles.pointsText}>+{pointsEarned} points!</Text>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = {
  popup: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [
      { translateX: -150 }, // half of your popup width
      { translateY: -50 }, // half of your popup height
    ],
    width: 300, // example width
    height: 100, // example height
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pointsText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  closeText: {
    color: "white",
    marginTop: 10,
  },
};
