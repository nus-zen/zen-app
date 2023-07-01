import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import RewardsCard from "../../components/RewardsCard";
import { REWARDS_DATA } from "../../data/RewardsData";

export default function RewardsScreen({ navigation }) {
  const rewards = REWARDS_DATA;

  function rewardsPressHandler(rewards) {
    return () => {
      navigation.navigate("RewardsItems", rewards);
    };
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {rewards.map((rewards, index) => (
          <View key={index} style={styles.cardContainer}>
            <RewardsCard
              title={rewards.title}
              subtitle={rewards.subtitle}
              imageSource={{ uri: rewards.imageSource }}
              onPress={rewardsPressHandler(rewards)}
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
