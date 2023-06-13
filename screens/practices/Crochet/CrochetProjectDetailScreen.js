import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const CrochetProjectDetailScreen = ({ route }) => {
  const { project } = route.params;
  const [progressImages, setProgressImages] = useState([]);
  const [journalEntry, setJournalEntry] = useState("");

  const handleAddImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      const imageSource = { uri: result.uri };
      setProgressImages((prevImages) => [...prevImages, imageSource]);
    }
  };

  const handleJournalEntryChange = (text) => {
    setJournalEntry(text);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.projectHeader}>
        <Text style={styles.projectTitle}>{project.title}</Text>
        {project.image ? (
          <Image source={{ uri: project.image }} style={styles.projectImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <MaterialCommunityIcons
              name="image-outline"
              size={48}
              color="gray"
            />
          </View>
        )}
      </View>

      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>Progress Images</Text>

        <TouchableOpacity
          style={styles.addImageButton}
          onPress={handleAddImage}
        >
          <Text style={styles.buttonText}>Add Image</Text>
        </TouchableOpacity>

        <ScrollView horizontal={true} style={styles.progressImagesContainer}>
          {progressImages.map((image, index) => (
            <Image key={index} source={image} style={styles.progressImage} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.journalSection}>
        <Text style={styles.sectionTitle}>Journal</Text>

        <TextInput
          style={styles.journalInput}
          placeholder="Write your thoughts here..."
          multiline={true}
          value={journalEntry}
          onChangeText={handleJournalEntryChange}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  projectHeader: {
    marginBottom: 20,
  },
  projectTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  projectImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 10,
  },
  placeholderImage: {
    width: "100%",
    height: 200,
    backgroundColor: "lightgray",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  progressSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addImageButton: {
    backgroundColor: "#F39200",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 10,
  },
  progressImagesContainer: {
    flexDirection: "row",
  },
  progressImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    resizeMode: "cover",
  },
  journalSection: {
    marginBottom: 20,
  },
  journalInput: {
    backgroundColor: "#E5E5E5",
    padding: 12,
    borderRadius: 8,
    textAlignVertical: "top",
    height: 150,
  },
});

export default CrochetProjectDetailScreen;
