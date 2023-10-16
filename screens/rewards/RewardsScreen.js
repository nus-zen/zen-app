import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import RewardsCard from "../../components/RewardsCard";
import { REWARDS_DATA } from "../../data/RewardsData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import analytics from "@react-native-firebase/analytics";

export default function RewardsScreen({ navigation }) {
  const rewards = REWARDS_DATA;
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);

  // retrieve points and streak from firestore
  const currUserDoc = firestore()
    .collection("users")
    .doc(auth().currentUser.email);

  // set up firestore listener to update points and streak in real time
  useEffect(() => {
    const unsubscribe = currUserDoc.onSnapshot((doc) => {
      loadPoints(doc.data().points);
      loadStreak(doc.data().streak);
    });
    return () => unsubscribe();
  }, []);

  const loadPoints = async (points) => {
    setPoints(points);
    console.log(`points loaded: ${points} from RewardsScreen.js`);
  };

  const loadStreak = async (streak) => {
    setStreak(streak);
    console.log(`streak loaded: ${streak} from RewardsScreen.js`);
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
          <Image
            source={require("../../assets/money.png")}
            style={styles.TextImage}
          />
          <Text style={styles.pointsText}>{points}</Text>

          <Text style={styles.totalCoinsText}>Total Coins</Text>
          <Text style={styles.pointsText}>{streak}</Text>
          <Text style={styles.totalCoinsText}> Days Streak</Text>
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
