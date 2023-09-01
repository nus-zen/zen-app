import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function YouTubePlayer({ videoId, title }) {
  const navigation = useNavigation();

  const [isPlaying, setIsPlaying] = useState(false);

  const [startTime, setStartTime] = useState(0);
  const [totalTimePlayed, setTotalTimePlayed] = useState(0);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    loadPoints();
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        const currentTime = Date.now() - startTime;
        setTotalTimePlayed(currentTime);
      }, 1000); // Update every 1 second

      return () => clearInterval(interval); // Clean up the interval when unmounting
    }
  }, [isPlaying, startTime]);

  const loadPoints = async () => {
    const storedPoints = await AsyncStorage.getItem("userPoints");
    setPoints(storedPoints ? parseInt(storedPoints) : 0);
    console.log("Total Points Stored:", storedPoints);
  };

  const IncreasePoints = (totalTimePlayed) => {
    const PointsToBeAdded = Math.floor(totalTimePlayed / 6000);
    return PointsToBeAdded;
  };

  const handleVideoEnd = async () => {
    setIsPlaying(false);
    const amount = IncreasePoints(totalTimePlayed);

    // Update points and store in AsyncStorage
    const updatedPoints = points + amount;
    setPoints(updatedPoints);
    await AsyncStorage.setItem("userPoints", updatedPoints.toString());

    console.log("Total Time Played:", totalTimePlayed);
    console.log("Amount:", amount);
    console.log("Updated Points:", updatedPoints);

    navigation.navigate("HRVFeedbackScreen", { title: title });
  };

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
              handleVideoEnd();
            } else if (state === "playing") {
              setStartTime(Date.now());
              console.log("Video Playing");
            } else if (state === "paused") {
              const currentTime = Date.now() - startTime;
              setTotalTimePlayed(totalTimePlayed + currentTime);
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
