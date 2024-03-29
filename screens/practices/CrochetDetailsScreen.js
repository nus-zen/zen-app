import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { GlobalColors } from "../../themes/GlobalColors";
import ImageModal from "../../components/ImageModal";
import {
  loadProgressImages,
  saveProgressImages,
} from "../../utils/AsyncStorageUtils";
import YouTubePlayer from "../../components/YouTubePlayer";
import firestore from "@react-native-firebase/firestore";
import analytics from "@react-native-firebase/analytics";
import auth from "@react-native-firebase/auth";
import { PointsPopup } from "../../components/PointsPopup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Tooltip from "react-native-walkthrough-tooltip";
import {} from "react-native";

const CrochetDetailsScreen = () => {
  const [progressImages, setProgressImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // To track the selected image
  const [isImageModalVisible, setImageModalVisible] = useState(false); // To control the visibility of the modal
  const [showPopup, setShowPopup] = useState(false);
  const [numColumns, setNumColumns] = useState(3); // Start with 3 column for image grid
  const [lastTimeCrochetImageAdded, setLastTimeCrochetImageAdded] =
    useState(null);

  const [crochetToolTipVisible, setCrochetToolTipVisible] = useState(false);
  const [uploadToolTipVisible, setUploadToolTipVisible] = useState(false);

  const checkFirstVisit = async () => {
    try {
      const hasVisited = await AsyncStorage.getItem("hasVisitedCrochet");
      if (!hasVisited) {
        console.log(
          "Tooltips for CrochetDetailsScreen.js will be shown for first time user."
        );
        setCrochetToolTipVisible(true);
        await AsyncStorage.setItem("hasVisitedCrochet", "true");
      }
    } catch (error) {
      console.error("Error checking First Visit:", error);
    }
  };

  const POINTS_TO_ADD = 50;
  const imageWidth = Dimensions.get("window").width / numColumns;

  // get user document from firestore
  const currUserDoc = firestore()
    .collection("users")
    .doc(auth().currentUser.email);

  useEffect(() => {
    loadProgressImagesFromStorage();
    loadLastTimeCrochetImageAdded();
    checkFirstVisit();
  }, []);

  const loadLastTimeCrochetImageAdded = async () => {
    const lastTimeImageAdded = await AsyncStorage.getItem(
      "lastTimeCrochetImageAdded"
    ); // Get the last time an image was added
    setLastTimeCrochetImageAdded(lastTimeImageAdded);
  };

  const saveLastTimeCrochetImageAdded = async () => {
    const today = new Date();
    await AsyncStorage.setItem("lastTimeCrochetImageAdded", today.toString());
    setLastTimeCrochetImageAdded(today.toString());
  };

  const loadProgressImagesFromStorage = async () => {
    const storedImages = await loadProgressImages();
    setProgressImages(storedImages);
  };

  const addProgressImage = async (imageUri) => {
    const updatedImages = [...progressImages, imageUri];
    setProgressImages(updatedImages);
    await saveProgressImages(updatedImages); // Save theupdated progress images
  };

  // const deleteProgressImage = (imageUri) => {
  //   const updatedImages = progressImages.filter((uri) => uri !== imageUri);
  //   setProgressImages(updatedImages);
  //   saveProgressImages(updatedImages); // Save the updated progress images after deletion
  //   console.log("Progress Image Deleted:", imageUri);
  // };

  // const handleDeleteImage = () => {
  //   if (selectedImage) {
  //     deleteProgressImage(selectedImage); // Delete the selected image URI
  //     setImageModalVisible(false);
  //   }
  // };

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
      "points from CrochetDetailsScreen.js"
    );
  };

  const handleAddImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        // Permission denied, handle accordingly
        Alert.alert(
          // Alert the user that permission is required to add images
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
        const imageSource = { uri: result.assets[0].uri };
        addProgressImage(imageSource);
        //setProgressImages((prevImages) => [...prevImages, imageSource]);

        // if first time adding image, or today is a new day, add points
        if (
          !lastTimeCrochetImageAdded ||
          new Date(lastTimeCrochetImageAdded).getDate() !== new Date().getDate()
        ) {
          addPoints(POINTS_TO_ADD);
          // Show the popup
          setShowPopup(true);

          // Hide the popup after 3 seconds
          setTimeout(() => {
            setShowPopup(false);
          }, 2000);
          await saveLastTimeCrochetImageAdded();
        } else {
          console.log(
            "Points already awarded today for Crochet, no points awarded."
          );
          Alert.alert(
            "Points Already Awarded Today",
            "Keep up the good work! You've already earned points for adding an ZenTree Progress image today."
          );
        }
      }
    } catch (error) {
      // Handle any errors that occur during image selection
      console.log("Error selecting image:", error);
    }
  };

  // Function to open the modal and display the selected image
  const handleImagePress = (imageUri) => {
    setSelectedImage(imageUri);
    setImageModalVisible(true);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      nestedScrollEnabled={true}
    >
      {showPopup && (
        <PointsPopup
          pointsEarned={POINTS_TO_ADD}
          isVisible={showPopup}
          onClose={() => setShowPopup(false)}
        />
      )}

      <View style={styles.topSection}>
        <Tooltip
          isVisible={crochetToolTipVisible}
          content={<Text>Learn about ZenTree and crocheting here!</Text>}
          allowChildInteraction={false}
          showChildInTooltip={false}
          onClose={() => {
            setCrochetToolTipVisible(false);
            setUploadToolTipVisible(true);
          }}
        >
          <Text style={styles.title}>Crocheting</Text>
        </Tooltip>
        <Text style={styles.description}>
          Crocheting is a versatile craft that uses a hook and yarn to create
          various items such as blankets, scarves, and hats. It provides a
          creative outlet and can be a relaxing and meditative activity.
        </Text>
      </View>
      <View style={styles.middleSection}>
        <YouTubePlayer videoId={"QdMwJyatGMI"} title={""} />
      </View>
      <Tooltip
        isVisible={uploadToolTipVisible}
        content={
          <Text>
            Below, upload your crochets once a day and earn 50 points!
          </Text>
        }
        placement="top"
        showChildInTooltip={false}
        onClose={() => setUploadToolTipVisible(false)}
      >
        <Text></Text>
      </Tooltip>

      <View style={styles.middleSection}>
        <Text style={styles.sectionTitle}>How to Crochet</Text>
        <Text style={styles.instructions}>
          1. Hold the crochet hook in your dominant hand.{"\n"}
          2. Make a slipknot and place it on the hook.{"\n"}
          3. Insert the hook into the designated stitch or space.{"\n"}
          4. Yarn over and pull through the stitch or space, creating a loop on
          the hook.{"\n"}
          5. Yarn over again and pull through both loops on the hook.
        </Text>

        <Text style={styles.sectionTitle}>How to Pepakura</Text>
        <Text style={styles.instructions}>
          1. Cut along solid lines. {"\n"}
          2. Teal lines: fold inwards, {"\n"}i.e. coloured surface folded
          towards each other {"\n"}
          3. Other dotted lines: fold outwards, {"\n"}i.e. coloured surface
          folded away from each other{"\n"}
          4. Paste the corresponding numbers together, {"\n"}i.e. flap 1 will be
          pasted to the underside (white part) of the red 1. {"\n"}
        </Text>

        <Text style={styles.sectionTitle}>Instructions for ZenTree</Text>
        <Text style={styles.instructions}>
          1, Once every day, crochet a leaf using yarn that is of a colour that
          corresponds to your most prevalent mood of that day. {"\n"}
          2. Attach the leaves onto the pepakura trunk with the excess yarn or
          using tape or glue.
        </Text>
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.sectionTitle}>Track Your Progress</Text>

        <TouchableOpacity
          style={styles.addImageButton}
          onPress={handleAddImage}
        >
          <Text style={styles.buttonText}>Add Image</Text>
        </TouchableOpacity>

        {/* Buttons for changing the number of columns in the grid */}
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => setNumColumns((prev) => Math.max(1, prev - 1))}
          >
            <Text>-</Text>
          </TouchableOpacity>

          <Text>{numColumns} Columns</Text>

          <TouchableOpacity onPress={() => setNumColumns((prev) => prev + 1)}>
            <Text>+</Text>
          </TouchableOpacity>
        </View> */}

        <ScrollView horizontal={true} style={styles.progressImagesContainer}>
          {progressImages.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleImagePress(image.uri)} // Open the modal on image press
            >
              <Image source={image} style={styles.progressImage} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* <FlatList
          data={progressImages}
          nestedScrollEnabled={true}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => handleImagePress(item.uri)}>
              <Image
                source={item}
                style={{
                  width: imageWidth,
                  height: imageWidth,
                  resizeMode: "cover",
                }}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
          style={styles.progressImagesContainer}
        /> */}

        {/* Image Modal */}
        <ImageModal
          visible={isImageModalVisible}
          imageUri={selectedImage}
          onClose={() => setImageModalVisible(false)} // Close the modal
          // onDelete={handleDeleteImage}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  progressImage: {
    resizeMode: "cover",
  },
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
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
    paddingHorizontal: 16,
  },
  PepaKuraimage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginRight: 8,
    alignSelf: "center",
  },
  middleSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  instructions: {
    marginBottom: 6,
    textAlign: "justify",
    paddingHorizontal: 16,
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
    textAlign: "center",
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
