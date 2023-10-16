import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import analytics from "@react-native-firebase/analytics";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import moment from "moment";

export default function DailyStreaksLoginScreen({ navigation }) {
  // get user document from firestore
  const currUserDoc = firestore()
    .collection("users")
    .doc(auth().currentUser.email);

  const [streak, setStreak] = useState(0);
  const [points, setPoints] = useState(0);
  const [amount, setAmount] = useState(0);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const currentDate = new Date();
  const dayOfWeekIndex = currentDate.getDay();
  const dayOfWeekName = daysOfWeek[dayOfWeekIndex];

  useEffect(() => {
    loadStreak();
    loadPoints();
  }, []);

  const loadStreak = async () => {
    // get streak and lastCheckInDate from firestore
    const doc = await currUserDoc.get();
    const currentStreak = doc.data().streak;
    const lastCheckInDate = doc.data().lastCheckInDate;
    //console.log("lastCheckInDate", lastCheckInDate);

    const lastCheckInMoment = moment.unix(lastCheckInDate.seconds);
    //console.log("lastCheckInMoment", lastCheckInMoment);

    let newStreak = currentStreak;

    // Get the start of today and the start of the lastCheckInDate
    const startOfToday = moment().startOf("day");
    const startOfLastCheckIn = lastCheckInMoment.startOf("day");

    // Calculate the difference in days
    const daysDifference = startOfToday.diff(startOfLastCheckIn, "days");

    // console.log("startOfToday", startOfToday);
    // console.log("startOfLastCheckIn", startOfLastCheckIn);
    // console.log("daysDifference", daysDifference);

    // if lastCheckInDate is more than 1 day ago, reset streak to 1. e.g. 15 oct (lastcheckin) and 17 oct (today)
    if (daysDifference > 1) {
      newStreak = 1;
      console.log(
        "streak reset to 1 as last login was",
        daysDifference,
        "days ago. From DailyStreaksScreen.js"
      );
    }

    // if lastCheckInDate is exactly 1 day ago, increment streak by 1
    else if (daysDifference === 1) {
      newStreak = currentStreak + 1;
      console.log(
        "streak incremented by 1 from",
        currentStreak,
        "to",
        newStreak,
        "from DailyStreaksScreen.js"
      );

      // set amount to add to points
      const amountToAdd = 5 * newStreak;
      setAmount(amountToAdd);
      // add points
      addPoints(amountToAdd);

      console.log(
        "amount added to points: 5 * streak:",
        amountToAdd,
        "from DailyStreaksScreen.js"
      );
    }

    // update if streak is different from current streak
    if (newStreak !== currentStreak) {
      // update streak in firestore
      await currUserDoc.update({ streak: newStreak });
      console.log(
        "streak updated in firestore:",
        newStreak,
        "from DailyStreaksScreen.js"
      );
    }

    // update streak in state
    setStreak(newStreak);

    // update lastCheckInDate in firestore
    await currUserDoc.update({ lastCheckInDate: currentDate });
  };

  const loadPoints = async () => {
    // get points from firestore
    const points = await currUserDoc.get().then((doc) => {
      return doc.data().points;
    });
    setPoints(points);
  };

  const handleNavigateToBottomTabs = () => {
    navigation.navigate("BottomTabsOverview");
  };

  const addPoints = async (amount) => {
    const newPoints = points + amount;

    // update points in firestore
    await currUserDoc.update({ points: newPoints });
    console.log(
      "points updated in firestore:",
      newPoints,
      "from DailyStreaksScreen.js"
    );

    // update points in state
    setPoints(newPoints);

    // log analytics event
    await analytics().logEarnVirtualCurrency({
      virtual_currency_name: "points",
      value: amount,
    });

    console.log(
      "points analytics logged:",
      amount,
      "points from DailyStreaksScreen.js"
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/flame.png")}
          style={styles.TextImage}
        />
        <Text style={styles.streakHeaderText}>{` ${streak}   `}</Text>
        <Image
          source={require("../../assets/money.png")}
          style={styles.TextImage}
        />
        <Text style={styles.pointsText}>{` ${points}`}</Text>
      </View>
      <View style={styles.content}>
        <Image
          source={require("../../assets/flame.png")}
          style={styles.flameImage}
        />
        {/* <View style={styles.rectangleContainer}>
          <View style={styles.daysContainer}>
            {daysOfWeek.map((day, index) => (
              <View key={index} style={styles.dayContainer}>
                <View
                  style={[
                    styles.circle,
                    streak === 1 && dayOfWeekName === day
                      ? styles.redCircle
                      : streak === 0
                      ? styles.grayCircle
                      : null,
                  ]}
                >
                  {streak === 1 && dayOfWeekName === day ? (
                    <Image
                      source={require("../../assets/redcheckcircle.png")}
                      style={styles.checkIcon}
                    />
                  ) : null}
                </View>

                <Text style={styles.dayLabel}>{day}</Text>
              </View>
            ))}
          </View>
        </View> */}
        <View style={styles.rectangleContainer}>
          <View style={styles.daysContainer}>
            {daysOfWeek.map((day, index) => {
              let isStreakDay = false;
              // console.log("dayofweekindex", dayOfWeekIndex);
              // console.log("index", index);

              // Check if the day is part of the streak
              if (index === dayOfWeekIndex && streak > 0) {
                isStreakDay = true;
              } else if (
                index < dayOfWeekIndex &&
                streak > dayOfWeekIndex - index
              ) {
                isStreakDay = true;
              } else if (
                index > dayOfWeekIndex &&
                streak > 7 - index + dayOfWeekIndex
              ) {
                isStreakDay = true;
              }

              return (
                <View key={index} style={styles.dayContainer}>
                  <View
                    style={[
                      styles.circle,
                      isStreakDay ? styles.redCircle : styles.grayCircle,
                    ]}
                  >
                    {isStreakDay && (
                      <Image
                        source={require("../../assets/redcheckcircle.png")}
                        style={styles.checkIcon}
                      />
                    )}
                  </View>
                  <Text style={styles.dayLabel}>{day}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
      <Text style={styles.subtitle}>
        {streak > 1 && amount > 0 // if streak already added points for today, don't add again
          ? `You are on a ${streak} day streak! You've earned ${amount} points for today's check in.`
          : streak > 1
          ? `You are on a ${streak} day streak! Keep it up!`
          : `Go on a streak to earn points!`}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleNavigateToBottomTabs}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginRight: -250,
    zIndex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 200,
    alignItems: "center",
  },
  continueButton: {
    backgroundColor: "green",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 30,
    width: "80%",
    marginBottom: 60,
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  flameImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  TextImage: {
    width: 20,
    height: 20,
  },
  streakHeaderText: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
  pointsText: {
    fontSize: 18,
    color: "gold",
    fontWeight: "bold",
  },
  rectangleContainer: {
    padding: 10,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "transparent",
  },
  daysContainer: {
    flexDirection: "row",
  },
  dayContainer: {
    alignItems: "center",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    marginHorizontal: 6,
  },
  redCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "red",
    marginHorizontal: 6,
  },
  grayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "gray",
    marginHorizontal: 6,
  },
  checkIcon: {
    width: 40,
    height: 40,
  },
  dayLabel: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    marginTop: -100,
  },
});
