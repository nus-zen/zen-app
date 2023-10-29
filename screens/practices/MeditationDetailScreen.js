import React, { useState } from "react";
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
import Tooltip from "react-native-walkthrough-tooltip";
import { useEffect } from "react";

export default function MeditationDetailScreen({ navigation, route }) {
  const { title, imageSource, description, duration, rationale, videoId } =
    route.params;

  const [showToolTips, setShowToolTips] = useState(true);

  const checkFirstVisit = async () => {
    try {
      const hasVisited = await AsyncStorage.getItem(
        "hasVisitedMeditationDetail"
      );
      if (!hasVisited) {
        console.log(
          "Tooltips for MeditationDetailScreen.js will be shown for first time user."
        );
        setShowToolTips(true);
        await AsyncStorage.setItem("hasVisitedMeditationDetail", "true");
      }
    } catch (error) {
      console.error("Error checking First Visit:", error);
    }
  };

  // check if user has visited this screen before for tooltips
  useEffect(() => {
    checkFirstVisit();
  }, []);

  const startMeditation = () => {
    // log meditationStartEvent with userid, meditation title, time, date, and day
    const userid = auth().currentUser.email;
    const time = moment().format("h:mm:ss a");
    const date = moment().format("MMMM Do YYYY");
    const day = moment().format("dddd");
    analytics().logEvent("meditationStartEvent", {
      user_id_meditation: userid,
      meditation_title: title,
      meditation_time: time,
      meditation_date: date,
      meditation_day: day,
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
      <Tooltip
        isVisible={showToolTips}
        content={
          <Text>
            Earn points by watching and doing the meditation practice! You earn
            3 points per minute watched.
          </Text>
        }
        onClose={() => setShowToolTips(false)}
        allowChildInteraction={false}
      >
        <Button
          title="Start Meditation"
          onPress={startMeditation}
          color={GlobalColors.primary300}
        />
      </Tooltip>
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
