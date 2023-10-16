import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import analytics from "@react-native-firebase/analytics";

export default function YouTubePlayer({ videoId, title }) {
  const navigation = useNavigation();

  const [isPlaying, setIsPlaying] = useState(false);
  const [points, setPoints] = useState(0);

  const IncreasePoints = (totalTimePlayed) => {
    const PointsToBeAdded = totalTimePlayed * 0.05; // 0.05 points per second of video watched
    return Math.round(PointsToBeAdded);
  };

  const handleVideoEnd = async (totalTimePlayed) => {
    setIsPlaying(false);
    const amount = IncreasePoints(totalTimePlayed);

    // add points to firestore document
    const currUserDoc = firestore()
      .collection("users")
      .doc(auth().currentUser.email);

    await currUserDoc.update({
      points: firestore.FieldValue.increment(amount),
    });
    console.log(
      "Points Added to firestore:",
      amount,
      "for",
      auth().currentUser.email,
      "from meditation video:",
      title
    );

    // analytics log virtual currency earned
    await analytics().logEarnVirtualCurrency({
      virtual_currency_name: "points",
      value: amount,
    });
    console.log(
      "analytics: logEarnVirtualCurrency logged from YouTubePlayer.js"
    );

    //unless crocheting
    if (videoId !== "QdMwJyatGMI") {
      navigation.navigate("HRVFeedbackScreen", {
        title: title,
        pointsToEarn: amount,
      });
    }
  };

  let startTime = 0;
  return (
    <View style={styles.container}>
      {/* YouTube video component */}
      <View style={styles.videoContainer}>
        <YoutubePlayer
          height={400}
          style={styles.video}
          videoId={videoId}
          play={isPlaying}
          onChangeState={(state) => {
            if (state === "ended") {
              // get current time
              const currentTime = Date.now();
              console.log("Current Time:", currentTime);
              // calculate total time played in seconds
              const totalTimePlayed = Math.floor(
                (currentTime - startTime) / 1000
              );
              console.log("Total Time Played:", totalTimePlayed, "seconds");

              handleVideoEnd(totalTimePlayed);
            } else if (state === "playing") {
              // update startTime if startTime is not set
              if (startTime === 0) {
                startTime = Date.now();
                console.log("Start Time:", startTime);
              }
            }
          }}
        />
      </View>
      {/* Title */}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  videoContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  video: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  controlButton: {
    padding: 8,
  },
  scrubBar: {
    width: "80%",
    height: 8,
    backgroundColor: "gray",
    marginTop: 16,
  },
});
