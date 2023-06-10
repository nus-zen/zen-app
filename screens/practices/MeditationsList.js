import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import MeditationCard from "../../components/MeditationCard";
import { MEDITATIONS_DATA } from "../../data/MeditationsData";

export default function MeditationsList({ navigation }) {
  const meditations = MEDITATIONS_DATA;

  function meditationPressHandler(meditation) {
    return () => {
      navigation.navigate("MeditationDetailScreen", meditation);
    };
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {meditations.map((meditation, index) => (
          <View key={index} style={styles.cardContainer}>
            <MeditationCard
              title={meditation.title}
              subtitle={meditation.subtitle}
              imageSource={{ uri: meditation.imageSource }}
              onPress={meditationPressHandler(meditation)}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 8,
  },
  scrollContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingTop: 16,
  },
  cardContainer: {
    width: Dimensions.get("window").width / 2 - 24,
    marginBottom: 16,
    alignItems: "center",
  },
});
