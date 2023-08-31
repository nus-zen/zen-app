import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RewardsItems = () => {

  const [STpoints, setSTPoints] = useState(0);

  useEffect(() => {
    loadPoints();
  }, []);

  const loadPoints = async () => {
    const storedSTPoints = await AsyncStorage.getItem("userPoints");
    setSTPoints(storedSTPoints ? parseInt(storedSTPoints) : 0);
    console.log(`Total points: ${storedSTPoints}`);
  };

  const deductPoints = async (coins) => {
    if (STpoints >= coins) {
      const remainingPoints = STpoints - coins;
      setSTPoints(remainingPoints);
      console.log(`Deducted ${coins} Coins. Remaining: ${remainingPoints}`);
      await AsyncStorage.setItem("userPoints", remainingPoints.toString()); // Store updated points
    } else {
      console.log("Not enough coins!");
    }
  };

  const [vouchers, setVouchers] = useState([
    { id: 1, name: "$2 KOI Voucher", coins: 50 },
    { id: 2, name: "$3 Awfully Chocolate Voucher", coins: 70 },
    { id: 3, name: "$3 TWG Tea Voucher", coins: 70 },
    { id: 4, name: "$4 Crave Voucher", coins: 80 },
    { id: 5, name: "$4 Cat & The Fiddle Voucher", coins: 80 },
    { id: 6, name: "$6 Birds of Paradise Voucher", coins: 90 },
    // Add more vouchers as needed
  ]);

  const renderVoucher = ({ item }) => (
    <TouchableOpacity style={styles.voucherCard} onPress={() => deductPoints(item.coins)}>
      <Text style={styles.voucherName}>{item.name}</Text>
      <Text style={styles.voucherCoins}>{item.coins} Coins</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.pointsContainer}>
          <View style={styles.centered}>
            <Image source={require("../../assets/money.png")} style={styles.TextImage} />
            <Text style={styles.pointsText}>{STpoints}</Text>
            <Text style={styles.totalCoinsText}>Total Coins</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={vouchers}
        renderItem={renderVoucher}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.vouchersContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 8,
  },
  vouchersContainer: {
    flexGrow: 1,
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
  voucherCard: {
    backgroundColor: "grey",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  voucherName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  voucherCoins: {
    fontSize: 14,
    color: "#888888",
  },
  TextImage: {
    width: 40,
    height: 40,
  },
  pointsText: {
    fontSize: 38,
    color: "black",
    fontWeight: "bold",
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

export default RewardsItems;
