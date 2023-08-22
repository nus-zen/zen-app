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
import { useEffect, useState } from "react";
import { retrieveFavStatus } from "../../utils/AsyncStorageUtils";
import { FlatList } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";

export default function MeditationsList({ navigation, route }) {
  const [meditations, setMeditations] = useState(MEDITATIONS_DATA);
  const showFavOnly = route.params?.showFavOnly || false;
  console.log("route.params: ", route.params?.showFavOnly);

  function meditationPressHandler(meditation) {
    return () => {
      navigation.navigate("MeditationDetailScreen", meditation);
    };
  }

  useEffect(() => {
    if (showFavOnly) {
      // Filter meditations to show only fav
      const filteredMeditations = meditations.filter((m) => {
        const isFav = retrieveFavStatus(m.title);
        return isFav;
      });

      setMeditations(filteredMeditations);
    }
  }, [meditations, showFavOnly]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={meditations}
        renderItem={({ item: med }) => (
          <View style={styles.cardContainer}>
            <MeditationCard
              title={med.title}
              subtitle={med.subtitle}
              imageSource={{ uri: med.imageSource }}
              onPress={meditationPressHandler(med)}
            />
          </View>
        )}
        keyExtractor={(med) => med.videoId}
      />
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
