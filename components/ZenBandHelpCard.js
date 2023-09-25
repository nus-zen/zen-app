import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function ZenBandHelpCard({ isVisible, onClose }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            width: "80%",
          }}
        >
          <Text style={{ fontSize: 18 }}>Help & FAQ</Text>
          {/* Add your help content here */}
          <Text>Your help content goes here.</Text>
          <TouchableOpacity
            onPress={onClose}
            style={{
              marginTop: 20,
              backgroundColor: "#007AFF",
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
