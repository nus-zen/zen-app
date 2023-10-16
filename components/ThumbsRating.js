import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // You can use other icon libraries if preferred
import { useNavigation } from "@react-navigation/native";
import analytics from "@react-native-firebase/analytics";
import { PointsPopup } from "./PointsPopup";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const ThumbsRating = ({ title }) => {
  const [rating, setRating] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const navigation = useNavigation();
  const AMOUNT_TO_ADD = 5;

  const handleRating = async (selectedRating) => {
    setRating(selectedRating);
    setShowPopup(true); // Show the popup

    // log analytics event
    await analytics().logEvent("rate_practice", {
      title: title,
      rating: selectedRating,
    });
    console.log("user rated practice:", title, "with rating:", selectedRating);
    console.log("analytics: rate_practice logged from ThumbsRating.js");

    // add AMOUNT_TO_ADD points to firestore document
    const currUserDoc = firestore()
      .collection("users")
      .doc(auth().currentUser.email);

    await currUserDoc.update({
      points: firestore.FieldValue.increment(AMOUNT_TO_ADD),
    });
    console.log(
      `Points Added to firestore: ${AMOUNT_TO_ADD} for`,
      auth().currentUser.email,
      "from thumb rating practice"
    );

    // analytics log virtual currency earned
    await analytics().logEarnVirtualCurrency({
      virtual_currency_name: "points",
      value: AMOUNT_TO_ADD,
    });
    console.log(
      "analytics: logEarnVirtualCurrency logged from ThumbsRating.js"
    );
    // After 3 seconds, hide the popup and navigate
    setTimeout(() => {
      setShowPopup(false);
      navigation.navigate("BottomTabsOverview");
    }, 3000);
  };

  return (
    <View style={styles.container}>
      {showPopup && (
        <View style={styles.popupContainer}>
          <PointsPopup
            pointsEarned={AMOUNT_TO_ADD}
            isVisible={showPopup}
            onClose={() => setShowPopup(false)}
          />
        </View>
      )}
      <TouchableOpacity
        style={[
          styles.thumbButton,
          rating === "thumbs-down" && styles.selectedThumb,
        ]}
        onPress={() => handleRating("thumbs-down")}
      >
        <FontAwesome name="thumbs-down" size={30} color="red" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.thumbButton,
          rating === "thumbs-medium" && styles.selectedThumb,
        ]}
        onPress={() => handleRating("thumbs-medium")}
      >
        <FontAwesome name="thumbs-o-up" size={30} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.thumbButton,
          rating === "thumbs-up" && styles.selectedThumb,
        ]}
        onPress={() => handleRating("thumbs-up")}
      >
        <FontAwesome name="thumbs-up" size={30} color="green" />
      </TouchableOpacity>
    </View>
  );
};

export default ThumbsRating;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  thumbButton: {
    borderWidth: 1,
    borderColor: "transparent",
    padding: 10,
  },
  selectedThumb: {
    borderColor: "blue", // Add a border color for the selected thumb
  },
  popupContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Optional semi-transparent background
  },
});
