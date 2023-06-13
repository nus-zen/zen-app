import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadCrochetProjects } from "../../../utils/AsyncStorageUtils";

const AddCrochetProjectScreen = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (error) {
      // Handle the error appropriately (e.g., display an error message)
      console.log("Error picking image:", error);
    }
  };

  const handleAddProject = async () => {
    const newProject = {
      title,
      image,
      description,
    };

    try {
      // Retrieve existing projects from AsyncStorage
      const storedProjects = await AsyncStorage.getItem("CrochetProjects");
      let projects = [];

      if (storedProjects) {
        projects = JSON.parse(storedProjects);
      }

      // Add the new project to the projects array
      projects.push(newProject);

      // Save the updated projects array back to AsyncStorage
      await AsyncStorage.setItem("CrochetProjects", JSON.stringify(projects));

      // Reset the form fields and navigate back to the previous screen
      setImage(null);
      setTitle("");
      setDescription("");

      // // Load the updated projects to reflect the changes
      // loadCrochetProjects(); // Call the function to update the projects state or context
    } catch (error) {
      console.log("Error adding project:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
        {image ? (
          <Image source={{ uri: image }} style={styles.previewImage} />
        ) : (
          <Text style={styles.imagePickerText}>Pick an Image</Text>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Description (optional)"
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddProject}>
        <Text style={styles.buttonText}>Add Project</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  imagePicker: {
    width: "100%",
    height: 200,
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 8,
  },
  imagePickerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
  input: {
    backgroundColor: "#E5E5E5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#F39200",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddCrochetProjectScreen;
