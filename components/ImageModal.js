import React from "react";
import {
  Modal,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";

const ImageModal = ({ visible, imageUri, onClose, onDelete }) => {
  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        {/* <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity> */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ImageModal;
