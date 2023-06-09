import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";
import { useRef, useState } from "react";

export default function YouTubePlayer({ videoId, title }) {
  const YouTubeRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleRewind = () => {
    if (YouTubeRef.current) {
      const currentTime = YouTubeRef.current.getCurrentTime();
      YouTubeRef.current.seekTo(currentTime - 5);
    }
  };

  const handlePlayPause = () => {
    if (YouTubeRef.current) {
      if (isPlaying) {
        YouTubeRef.current.pauseVideo();
      } else {
        YouTubeRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleForward = () => {
    if (YouTubeRef.current) {
      const currentTime = YouTubeRef.current.getCurrentTime();
      YouTubeRef.current.seekTo(currentTime + 5);
    }
  };
  return (
    <View style={styles.container}>
      {/* YouTube video component */}
      <View style={styles.videoContainer}>
        <YoutubePlayer
          height={400}
          ref={YouTubeRef}
          style={styles.video}
          videoId={videoId}
          play={isPlaying}
          onChangeState={(event) => {
            if (event.state === "ended") {
              setIsPlaying(false);
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
          <Ionicons name="ios-rewind" size={24} color="black" />
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
          <Ionicons name="ios-fastforward" size={24} color="black" />
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
