import React from "react";
import { StyleSheet, View, Text } from "react-native";
// import YouTubePlayer from "../../components/YouTubePlayer";

export default function PracticeMediaScreen({ route }) {
  const { videoId, title } = route.params;
  return (
    <View style={styles.container}>
      {/* <YouTubePlayer videoId={videoId} title={title} /> */}
      <Text>Temporary NO YOUTUBE PLAYER </Text>
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
