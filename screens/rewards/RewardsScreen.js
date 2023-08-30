import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import RewardsCard from "../../components/RewardsCard";
import { REWARDS_DATA } from "../../data/RewardsData";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RewardsScreen({ navigation }) {
  const rewards = REWARDS_DATA;
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    loadStreak();
    loadPoints();
  }, []);

  const loadPoints = async () => {
    const storedPoints = await AsyncStorage.getItem("userPoints");
    setPoints(storedPoints ? parseInt(storedPoints) : 0);
    console.log(`Total points: ${storedPoints}`);
  };
  const loadStreak = async () => {
    const storedStreak = await AsyncStorage.getItem("dailyStreak");
    setStreak(storedStreak ? parseInt(storedStreak) : 0);
    console.log(`Total streak: ${storedStreak}`);
  };

  function rewardsPressHandler(rewards) {
    return () => {
      navigation.navigate("RewardsItems", rewards);
    };
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <View style={styles.centered}>
            <Image source={require("../../assets/money.png")} style={styles.TextImage} />
            <Text style={styles.pointsText}>{points}</Text>
            <Text style={styles.totalCoinsText}>Total Coins</Text>
          </View>
      </View>
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
    </View>
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
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
  pointsText: {
    fontSize: 38,
    color: "black",
    fontWeight: "bold",
  },
  totalCoinsText: {
    fontSize: 18,
    color: "black",
    marginTop: 8,
  },
  TextImage: {
    width: 40,
    height: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 18,
    height: Dimensions.get("window").height / 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
});
