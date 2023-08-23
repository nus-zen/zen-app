import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import MeditationCard from "../../components/MeditationCard";
import { MEDITATIONS_DATA } from "../../data/MeditationsData";
import {
  getMeditationsFavorites,
  retrieveFavStatus,
} from "../../utils/AsyncStorageUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MeditationsList({ navigation }) {
  const [showFavOnly, setShowFavOnly] = useState(false);
  const [meditations, setMeditations] = useState(MEDITATIONS_DATA);

  useEffect(() => {
    updateMeditations(showFavOnly);
  }, [showFavOnly]);

  async function updateMeditations(favOnly) {
    try {
      const storageKeys = await AsyncStorage.getAllKeys();
      const favorites = await getMeditationsFavorites(); // Retrieve all favorites

      const filteredMeditations = MEDITATIONS_DATA.filter((m) => {
        // Check if the meditation's title is in the favorites
        const isFav = favorites[m.title] || false;

        // If showFavOnly is true, only include if it's a favorite
        return favOnly ? isFav : true;
      });

      setMeditations(filteredMeditations);
    } catch (error) {
      console.error("Error while updating meditations:", error);
    }
  }

  function meditationPressHandler(meditation) {
    return () => {
      navigation.navigate("MeditationDetailScreen", meditation);
    };
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            // Toggle the showFavOnly state when the button is pressed
            setShowFavOnly(!showFavOnly);
            console.log("showfavonly: ", !showFavOnly);
          }}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1,
              marginRight: 10,
            },
          ]}
        >
          <Ionicons
            name={showFavOnly ? "star" : "star-outline"}
            size={24}
            color={showFavOnly ? "red" : "black"}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, showFavOnly]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={meditations}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
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
  columnWrapper: {
    justifyContent: "space-between", // Space between columns
  },
});
