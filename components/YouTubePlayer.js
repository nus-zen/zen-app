import React, { useRef, useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function YouTubePlayer({ videoId, title }) {
  const navigation = useNavigation();
  const playerRef = useRef();

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
  const handleRewind = async () => {
    if (playerRef.current) {
      const currentTime = await playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime - 5);
    }
  };

  const handleForward = async () => {
    if (playerRef.current) {
      const currentTime = await playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime + 5);
    }
  };

  const handlePlayPause = useCallback(() => {
    if (!isPlaying) {
      setStartTime(Date.now() - totalTimePlayed);
    } else {
      const currentTime = Date.now() - startTime;
      setTotalTimePlayed(currentTime);
    }
    setIsPlaying((prev) => !prev);
  }, [isPlaying, startTime, totalTimePlayed]);

  return (
    <View style={styles.container}>
      {/* YouTube video component */}
      <View style={styles.videoContainer}>
        <YoutubePlayer
          height={400}
          ref={playerRef}
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

      {/* Media controls */}
      <View style={styles.controlsContainer}>
        {/* Rewind button */}
        <TouchableOpacity style={styles.controlButton} onPress={handleRewind}>
          <Ionicons name="play-back-outline" size={24} color="black" />
        </TouchableOpacity>

        {/* Play/Pause button */}
        <TouchableOpacity
          style={styles.controlButton}
          onPress={handlePlayPause}
        >
          <Ionicons name="ios-play" size={32} color="black" />
        </TouchableOpacity>

        {/* Forward button */}
        <TouchableOpacity style={styles.controlButton} onPress={handleForward}>
          <Ionicons name="play-forward-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Scrub bar */}
      <View style={styles.scrubBar} />
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
