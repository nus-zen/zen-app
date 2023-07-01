import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { getHighestRatedMeditation } from "../utils/AsyncStorageUtils";
import MeditationCard from "./MeditationCard";
import { useNavigation } from "@react-navigation/native";

const FavMeditation = () => {
  const [highestRatedMeditation, setHighestRatedMeditation] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchHighestRatedMeditation();
  }, []);

  const fetchHighestRatedMeditation = async () => {
    const favMed = await getHighestRatedMeditation();
    // console.log(`highestRatedMeditation is ${favMed.title}`);
    setHighestRatedMeditation(favMed);
  };

  if (!highestRatedMeditation) {
    // console.log("highestRatedMeditation is null");
    return null; // Handle loading or no highest rated meditation case
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.favoriteText}>Your favorite meditation is:</Text>
      </View>
      <View style={styles.rightContainer}>
        <MeditationCard
          title={highestRatedMeditation.title}
          subtitle={highestRatedMeditation.subtitle}
          imageSource={{ uri: highestRatedMeditation.imageSource }}
          onPress={() => {
            navigation.navigate(
              "MeditationDetailScreen",
              highestRatedMeditation
            );
          }}
          isSpecialStyle={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 32,
  },
  leftContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  favoriteText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default FavMeditation;
