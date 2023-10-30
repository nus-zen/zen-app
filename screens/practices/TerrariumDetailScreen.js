import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { GlobalColors } from "../../themes/GlobalColors";
import { useNavigation } from "@react-navigation/native";
import {
  loadProgressImagesForTerrarium,
  saveProgressImagesForTerrarium,
} from "../../utils/AsyncStorageUtils";
import firestore from "@react-native-firebase/firestore";
import analytics from "@react-native-firebase/analytics";
import auth from "@react-native-firebase/auth";
import { PointsPopup } from "../../components/PointsPopup";
import * as ImagePicker from "expo-image-picker";
import ImageModal from "../../components/ImageModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TerrariumDetailScreen = () => {
  const navigation = useNavigation(); // Initialize the navigation object
  const [terrariumImages, setTerrariumImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // To track the selected image
  const [isImageModalVisible, setImageModalVisible] = useState(false); // To control the visibility of the modal
  const [showPopup, setShowPopup] = useState(false);
  const [lastTimeTerImageAdded, setLastTerTimeImageAdded] = useState(null); // To track the last time an image was added
  const POINTS_TO_ADD = 50;

  const steps = [
    "Begin with a layer of white pebbles for drainage, a stylish start for your plant paradise.",
    "Create a green haven with potting soil. Your plants will love their cozy new home.",
    "Add a dash of enchantment with blue pebbles, crafting a whimsical path.",
    "Elevate your container's charm by introducing a quaint house or a rock to the mix.",
    "Take it up a notch by including a rabbit figurine in your container.",
    "Introduce a whimsical duck figurine to your garden. Your plants will love their new friend.",
    "The time has come to introduce your air plants to their new abode. Feel free to experiment with different plant varieties.",
  ];

  const stepImages = [
    require("../../assets/terrarium/terra-step-1.jpg"),
    require("../../assets/terrarium/terra-step-2.jpg"),
    require("../../assets/terrarium/terra-step-3.jpg"),
    require("../../assets/terrarium/terra-step-4.jpg"),
    require("../../assets/terrarium/terra-step-5.jpg"),
    require("../../assets/terrarium/terra-step-6.jpg"),
    require("../../assets/terrarium/terra-step-7.jpg"),
  ];

  const currUserDoc = firestore()
    .collection("users")
    .doc(auth().currentUser.email);

  useEffect(() => {
    loadTerrariumImagesFromStorage();
    loadLastTerTimeImageAdded();
  }, []);

  const loadLastTerTimeImageAdded = async () => {
    const lastTimeImageAdded = await AsyncStorage.getItem("lastTimeImageAdded");
    setLastTerTimeImageAdded(lastTimeImageAdded);
  };

  const saveLastTerTimeImageAdded = async () => {
    const today = new Date();
    await AsyncStorage.setItem("lastTimeImageAdded", today.toString());
    setLastTerTimeImageAdded(today.toString());
  };

  const loadTerrariumImagesFromStorage = async () => {
    const storedImagesForTerrarium = await loadProgressImagesForTerrarium();
    setTerrariumImages(storedImagesForTerrarium);
  };

  const addTerrariumImage = async (imageUri) => {
    const updatedImages = [...terrariumImages, imageUri];
    setTerrariumImages(updatedImages);
    await saveProgressImagesForTerrarium(updatedImages); // Save the updated progress images to AsyncStorage
  };

  const addPoints = async (amount) => {
    // update points to firestore
    await currUserDoc.update({
      points: firestore.FieldValue.increment(amount),
    });
    console.log(
      "Points Added to firestore:",
      amount,
      "from",
      auth().currentUser.email
    );

    // log analytics event
    await analytics().logEarnVirtualCurrency({
      virtual_currency_name: "points",
      value: amount,
    });

    console.log(
      "points analytics logged:",
      amount,
      "points from TerrariumDetailsScreen.js"
    );
  };

  const handleAddImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please allow access to your photos to add images."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const terraImageSource = { uri: result.assets[0].uri };

        addTerrariumImage(terraImageSource);

        // if first time adding image, or if today is a new day, award points
        if (
          lastTimeTerImageAdded === null ||
          new Date(lastTimeTerImageAdded).getDate() !== new Date().getDate()
        ) {
          addPoints(POINTS_TO_ADD);
          // Show the popup
          setShowPopup(true);

          // Hide the popup after 3 seconds
          setTimeout(() => {
            setShowPopup(false);
          }, 2000);

          // Save the last time an image was added
          await saveLastTerTimeImageAdded();
        }

        // else points already awarded today, so don't award points
        else {
          console.log(
            "Points already awarded today for Terrarium, no points awarded."
          );
          Alert.alert(
            "Points Already Awarded Today",
            "Keep up the good work! You've already earned points for adding an ZenTerrarium Progress image today."
          );
        }
      }
    } catch (error) {
      console.log("Error selecting terra image:", error);
    }
  };
  //   const [selectedTerraImage, setSelectedTerraImage] = useState(null);
  const handleImagePress = (imageUri) => {
    setSelectedImage(imageUri);
    setImageModalVisible(true);
  };
  return (
    <ScrollView style={styles.container}>
      {/* Terrarium Image */}
      <Image
        source={require("../../assets/terrarium/terra-final.jpg")}
        style={styles.terrariumImage}
      />

      {/* Instructions */}
      <View style={styles.instructionsContainer}>
        <Text style={styles.sectionTitle}>
          ZenTerrarium Making Instructions
        </Text>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Image source={stepImages[index]} style={styles.stepImage} />
            <Text style={styles.stepText}>{`${index + 1}. ${step}`}</Text>
          </View>
        ))}
      </View>

      {/* Materials List */}
      <View style={styles.materialsContainer}>
        <Text style={styles.sectionTitle}>Materials List</Text>

        <Image
          source={require("../../assets/terrarium/terra-materials.jpg")}
          style={styles.materialsImage}
        />
        <Text style={styles.materialsText}>
          • Plastic container{"\n"}• White Pebbles {"\n"}• Blue Pebbles {"\n"}•
          Potting soil{"\n"}• Air plants{"\n"}• Decorative elements (optional)
        </Text>
      </View>

      {/* Plant Care Instructions */}
      <View style={styles.plantCareContainer}>
        <Text style={styles.sectionTitle}>Plant Care Instructions</Text>
        <Text style={styles.plantCareText}>
          • Place your terrarium in a location with indirect sunlight.{"\n"}•
          Water your air plants sparingly, about once a week, by misting them.
          {"\n"}• Keep an eye on the moisture level of the potting soil, and
          water if it dries out.{"\n"}• Prune any dead or yellowing leaves from
          your air plants.{"\n"}• Enjoy the beauty of your mini garden!
        </Text>
        {showPopup && (
          <PointsPopup
            pointsEarned={POINTS_TO_ADD}
            isVisible={showPopup}
            onClose={() => setShowPopup(false)}
          />
        )}
      </View>
      <TouchableOpacity style={styles.addImageButton} onPress={handleAddImage}>
        <Text style={styles.buttonText}>Add Image</Text>
      </TouchableOpacity>

      <ScrollView horizontal={true} style={styles.progressImagesContainer}>
        {terrariumImages.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleImagePress(image.uri)} // Open the modal on image press
          >
            <Image source={image} style={styles.progressImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Image Modal */}
      <ImageModal
        visible={isImageModalVisible}
        imageUri={selectedImage}
        onClose={() => setImageModalVisible(false)} // Close the modal
        // onDelete={handleDeleteImage}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  terrariumImage: {
    width: "100%",
    height: 400,
    resizeMode: "stretch",
  },
  instructionsContainer: {
    padding: 16,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  stepImage: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    marginRight: 8,
  },
  stepText: {
    flex: 1,
    fontSize: 16,
  },
  materialsContainer: {
    alignItems: "center",
    paddingVertical: 16,
  },
  materialsImage: {
    width: "80%",
    height: 300,
    resizeMode: "contain",
  },
  materialsText: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 16,
    textAlign: "justify",
  },
  plantCareContainer: {
    padding: 16,
  },
  plantCareText: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 16,
    textAlign: "justify",
    paddingHorizontal: 16,
  },
  amazingButton: {
    backgroundColor: GlobalColors.primary300,
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 30,
  },
  amazingButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  addImageButton: {
    backgroundColor: GlobalColors.primary300,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  progressImagesContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginHorizontal: 10,
  },
  progressImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    resizeMode: "cover",
  },
});

export default TerrariumDetailScreen;
