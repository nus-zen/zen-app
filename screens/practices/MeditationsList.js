import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import MeditationCard from "../../components/MeditationCard";
import { MEDITATIONS_DATA } from "../../data/MeditationsData";
import {
  getMeditationsFavorites,
  getShowFavOnly,
  saveShowFavOnly,
} from "../../utils/AsyncStorageUtils";
import analytics from "@react-native-firebase/analytics";
import Tooltip from "react-native-walkthrough-tooltip";
import { Text } from "react-native";

export default function MeditationsList({ navigation }) {
  const [showFavOnly, setShowFavOnly] = useState(false);
  const [meditations, setMeditations] = useState(MEDITATIONS_DATA);

  const [listToolTipVisible, setListToolTipVisible] = useState(false);

  const checkFirstVisit = async () => {
    try {
      const hasVisited = await AsyncStorage.getItem(
        "hasVisitedMeditationsList"
      );
      console.log("tooltips: has visited meditations list?", hasVisited);
      if (!hasVisited) {
        console.log(
          "Tooltips for MeditationsList.js will be shown for first time user."
        );
        setListToolTipVisible(true);
        await AsyncStorage.setItem("hasVisitedMeditationsList", "true");
      }
    } catch (error) {
      console.error("Error checking First Visit:", error);
    }
  };

  useEffect(() => {
    // Retrieve showFavOnly value from AsyncStorage when the component mounts
    const getShowFavOnlyStored = async () => {
      const stored = await getShowFavOnly();
      setShowFavOnly(stored);
    };

    getShowFavOnlyStored();
    checkFirstVisit();
  }, []);

  useEffect(() => {
    // Update AsyncStorage when showFavOnly changes
    saveShowFavOnly(showFavOnly);
  }, [showFavOnly]);

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
    return async () => {
      // log selected meditation using Firebase Analytics
      await analytics().logSelectItem({
        content_type: "meditation",
        item_list_name: meditation.title,
        item_list_id: meditation.title,
      });
      console.log("user clicked on meditation:", meditation.title);
      console.log("analytics: select item logged from MeditationsList.js");

      navigation.navigate("MeditationDetailScreen", meditation);
    };
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            marginRight: 20,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          {/* <Text style={{ marginRight: 20 }}>Show Favourites</Text> */}
          <TouchableOpacity
            onPress={() => {
              // Toggle the showFavOnly state when the button is pressed
              setShowFavOnly(!showFavOnly);
              console.log("showfavonly: ", !showFavOnly);
            }}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          >
            <Ionicons
              name={showFavOnly ? "star" : "star-outline"}
              size={24}
              color={showFavOnly ? "red" : "black"}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, showFavOnly]);

  return (
    <SafeAreaView style={styles.container}>
      <Tooltip
        isVisible={listToolTipVisible}
        content={
          <Text>
            Here is where you get to choose from a list of meditation practices
            tailored to University students like yourself!
          </Text>
        }
        onClose={() => {
          setListToolTipVisible(false);
        }}
        allowChildInteraction={false}
      >
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
      </Tooltip>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 8,
    margin: 10,
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
