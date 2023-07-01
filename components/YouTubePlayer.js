import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";
import { useRef, useState } from "react";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

export default function YouTubePlayer({ videoId, title }) {
  const navigation = useNavigation();
  const playerRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

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
    setIsPlaying((prev) => !prev);
  }, []);

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
              setIsPlaying(false);
              // Alert.alert("video ended!");
              navigation.navigate("PracticeRatingScreen", { title: title });
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
