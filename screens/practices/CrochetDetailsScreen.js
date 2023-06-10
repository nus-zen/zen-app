import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { GlobalColors } from "../../themes/GlobalColors";

const CrochetDetailsScreen = () => {
  const [progressImages, setProgressImages] = useState([]);

  const handleAddImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        // Permission denied, handle accordingly
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.cancelled) {
        const imageSource = { uri: result.uri };
        setProgressImages((prevImages) => [...prevImages, imageSource]);
      }
    } catch (error) {
      // Handle any errors that occur during image selection
      console.log("Error selecting image:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Crocheting</Text>
        <Text style={styles.description}>
          Crocheting is a versatile craft that uses a hook and yarn to create
          various items such as blankets, scarves, and hats. It provides a
          creative outlet and can be a relaxing and meditative activity.
        </Text>
      </View>

      <View style={styles.middleSection}>
        <Text style={styles.sectionTitle}>How to Crochet</Text>
        <Text style={styles.instructions}>
          1. Hold the crochet hook in your dominant hand.
        </Text>
        <Text style={styles.instructions}>
          2. Make a slipknot and place it on the hook.
        </Text>
        <Text style={styles.instructions}>
          3. Insert the hook into the designated stitch or space.
        </Text>
        <Text style={styles.instructions}>
          4. Yarn over and pull through the stitch or space, creating a loop on
          the hook.
        </Text>
        <Text style={styles.instructions}>
          5. Yarn over again and pull through both loops on the hook.
        </Text>
        {/* Add more instructions as needed */}
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.sectionTitle}>Track Your Progress</Text>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  topSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  middleSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  instructions: {
    marginBottom: 6,
  },
  bottomSection: {
    marginBottom: 20,
  },
  addImageButton: {
    backgroundColor: GlobalColors.primary300,
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
  progressImagesContainer: {
    flexDirection: "row",
  },
  progressImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    resizeMode: "cover",
  },
});

export default CrochetDetailsScreen;
