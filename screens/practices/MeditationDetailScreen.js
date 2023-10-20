import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { GlobalColors } from "../../themes/GlobalColors";
import analytics from "@react-native-firebase/analytics";
import auth from "@react-native-firebase/auth";
import moment from "moment";

export default function MeditationDetailScreen({ navigation, route }) {
  const { title, imageSource, description, duration, rationale, videoId } =
    route.params;

  const startMeditation = () => {
    // log meditationStartEvent with userid, meditation title, time, date, and day
    const userid = auth().currentUser.email;
    const time = moment().format("h:mm:ss a");
    const date = moment().format("MMMM Do YYYY");
    const day = moment().format("dddd");
    analytics().logEvent("meditationStartEvent", {
      id: userid,
      title: title,
      time: time,
      date: date,
      day: day,
    });
    console.log("user:", userid, "started", title, "at", time);
    console.log(
      "analytics: meditationStartEvent logged from MeditationDetailScreen.js"
    );

    // Start the meditation logic
    navigation.navigate("PracticeMediaScreen", {
      videoId: videoId,
      title: title,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image source={{ uri: imageSource }} style={styles.image} />
      <Button
        title="Start Meditation"
        onPress={startMeditation}
        color={GlobalColors.primary300}
      />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.sectionText}>{description}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Duration</Text>
        <Text style={styles.sectionText}>{duration}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rationale</Text>
        <Text style={styles.sectionText}>{rationale}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 16,
    resizeMode: "cover",
    borderRadius: 8,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    color: "#555555",
  },
});
