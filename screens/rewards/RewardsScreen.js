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
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import analytics from "@react-native-firebase/analytics";
import RewardsItems from "./RewardsItems";

export default function RewardsScreen({ navigation }) {
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

  async function checkoutHandler(vouchers, totalcost) {
    // if user does not have enough points, show error message
    if (points < totalcost) {
      Alert.alert("Not enough points to checkout.");
      return;
    }

    // retrieve voucher array from firestore
    const user = await currUserDoc.get();
    const currUserVouchers = user.data().vouchers;

    // if user has enough points, deduct points from user
    await currUserDoc.update({ points: points - totalcost });

    // get list of vouchers to be checked out
    const vouchersToCheckout = [];
    for (const voucher of vouchers) {
      if (voucher.count > 0) {
        for (let i = 0; i < voucher.count; i++) {
          vouchersToCheckout.push(voucher.name);
          currUserVouchers.push(voucher.name);
        }

        // analytics for virtual currency spent
        analytics().logSpendVirtualCurrency({
          item_name: voucher.name,
          virtual_currency_name: "points",
          value: voucher.coins,
        });
      }
    }
    console.log("analytics: spendVirtualCurrency logged from RewardsScreen");

    // add vouchers to user's firebase document
    await currUserDoc
      .update({
        vouchers: currUserVouchers,
      })
      .then(() => {
        console.log(
          "vouchers added to firestore:",
          vouchersToCheckout,
          "for",
          auth().currentUser.email
        );
      })
      .catch((error) => {
        console.log(error);
      });

    //analytics for checkout
    analytics().logEvent("checkoutEvent", {
      user: auth().currentUser.email,
      vouchers: vouchersToCheckout,
      pointsSpent: totalcost,
    });

    console.log("analytics: checkoutEvent logged from RewardsScreen.js");
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

      <RewardsItems checkoutHandler={checkoutHandler} />
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
