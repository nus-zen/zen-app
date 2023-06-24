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