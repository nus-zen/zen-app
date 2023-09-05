import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView, Image, ImageBackground, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HeartRateVariabilityChart from '../../components/HeartRateVariabilityChart';

export default function HRVFeedbackScreen({ route }) {
  const [beforeBPM, setBeforeBPM] = useState(null);
  const [afterBPM, setAfterBPM] = useState(null);
  const { title } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    // Simulate fetching HRV data from an API or device
    // For this example, generating random values between 50 and 100
    const randomBeforeBPM = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
    const randomAfterBPM = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
    setBeforeBPM(randomBeforeBPM);
    setAfterBPM(randomAfterBPM);
  }, []);

  const chartWidth = Dimensions.get('window').width;
  const chartHeight = 200;

  return (
    <>
      <View style={styles.headerContainer}>
        <ImageBackground
          source={require("../../assets/HRVFeedbackBackground.png")}
          style={styles.headerImage}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Progress</Text>
          </View>
        </ImageBackground>
      </View>

      <SafeAreaView style={styles.container}>
        <View style={styles.bpmHeaderContainer}>
          <Text style={styles.bpmHeaderText}>Heart Rate</Text>
        </View>

        <View style={styles.bpmComponentsContainer}>
          {/* Before BPM Card */}
          <View style={[styles.hrCard, { backgroundColor: "#F4F4F4" }]}>
            <Text style={[styles.hrComponentText, { color: "#58930D" }]}>BEFORE</Text>
            <Text style={[styles.bpmValue, { color: "black" }]}>
              {beforeBPM !== null ? `${beforeBPM}` : "Loading..."}
            </Text>
            <Text style={[styles.hr2ComponentText, { color: "#58930D" }]}>bpm</Text>
          </View>

          {/* Add spacing between cards */}
          <View style={styles.cardSpacing} />

          {/* After HRV Card */}
          <View style={[styles.hrCard, { backgroundColor: "#F4F4F4" }]}>
            <Text style={[styles.hrComponentText, { color: "#58930D" }]}>AFTER</Text>
            <Text style={[styles.bpmValue, { color: "black" }]}>
              {afterBPM !== null ? `${afterBPM}` : "Loading..."}
            </Text>
            <Text style={[styles.hr2ComponentText, { color: "#58930D" }]}>bpm</Text>
          </View>
        </View>

        {/* Include the HeartRateVariabilityChart component */}
        <HeartRateVariabilityChart chartWidth={chartWidth} chartHeight={chartHeight} />

        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={() => navigation.navigate("PracticeRatingScreen", { title: title })}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  headerContainer: {
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: 150,
    resizeMode: "stretch",
  },
  titleContainer: {
    zIndex: 1,
    alignItems: "center",
    marginTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white",
  },
  bpmHeaderContainer: {
    alignItems: "flex-start",
  },
  bpmHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bpmComponentsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  hrCard: {
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    width: 180,
  },
  cardSpacing: {
    width: 20,
  },
  hrComponentText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  hr2ComponentText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bpmValue: {
    fontSize: 45,
    fontWeight: "bold",
    marginTop: 8,
  },
  buttonContainer: {
    marginTop: 20,
    width: Dimensions.get('window').width - 50,
    backgroundColor: "green", // Change this to the desired green color
    borderRadius: 20,
  },
});
