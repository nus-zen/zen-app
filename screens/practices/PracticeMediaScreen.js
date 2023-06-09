import React from "react";
import { StyleSheet, View, Text } from "react-native";
import YouTubePlayer from "../../components/YouTubePlayer";

export default function PracticeMediaScreen() {
  return (
    <View style={styles.container}>
      <YouTubePlayer videoId="ZEYuSRHgmCg" title="Meditation Session" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
