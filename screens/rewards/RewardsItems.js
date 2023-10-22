import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RewardsItems({ route }) {
// export default function RewardsItems ({ route }) => {
  const { selectedCard } = route.params || {};
  const [STpoints, setSTPoints] = useState(0);
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    console.log(`Selected card index: ${selectedCard}`);
    if (selectedCard !== undefined) {
      loadPoints();
      updateVouchers(selectedCard);
    }
  }, [selectedCard]);

  const updateVouchers = (selectedCard) => {
    switch (selectedCard) {
      case 0:
        setVouchers([
          { id: 1, name: "$2 KOI Voucher", coins: 50, count: 0 },
          { id: 2, name: "$3 Awfully Chocolate Voucher", coins: 70, count: 0 },
          { id: 3, name: "$3 TWG Tea Voucher", coins: 70, count: 0 },
          { id: 4, name: "$4 Crave Voucher", coins: 60, count: 0 },
          { id: 5, name: "$4 Cat & The Fiddle Voucher", coins: 80, count: 0 },
          { id: 6, name: "$6 Birds of Paradise Voucher", coins: 90, count: 0 },
        ]);
        break;
      case 1:
        setVouchers([
          { id: 7, name: "$1 Drinks Voucher", coins: 70, count: 0 },
          { id: 8, name: "$1 Food Voucher", coins: 40, count: 0 },
          { id: 9, name: "$2 Starbucks Voucher", coins: 70, count: 0 },
          { id: 10, name: "$2 LiHo Voucher", coins: 70, count: 0 },
          { id: 11, name: "$2 Spinelli Voucher", coins: 70, count: 0 },
        ]);
        break;
      case 2:
        setVouchers([
          { id: 12, name: "Forest Green Yarn", coins: 80, count: 0 },
          { id: 13, name: "Olive Green Yarn", coins: 60, count: 0 },
          { id: 14, name: "Grass Green Yarn", coins: 80, count: 0 },
          { id: 15, name: "Yellow Green Yarn", coins: 90, count: 0 },
          { id: 16, name: "Crochet Hook", coins: 80, count: 0 },
          { id: 17, name: "Tape", coins: 30, count: 0 },
        ]);
        break;
      case 3:
        setVouchers([
          { id: 18, name: "Soil (50g)", coins: 30, count: 0 },
          { id: 19, name: "Air Plant", coins: 40, count: 0 },
          { id: 20, name: "Pebbles (50g)", coins: 50, count: 0 },
          { id: 21, name: "Blue Sand (50g)", coins: 50, count: 0 },
          { id: 22, name: "Plastic Enclosure", coins: 70, count: 0 },
          { id: 23, name: "Mini House", coins: 70, count: 0 },
          { id: 24, name: "Mini Duck", coins: 70, count: 0 },
          { id: 25, name: "Mini Rabbit", coins: 70, count: 0 },
        ]);
        break;
      default:
        setVouchers([]);
        break;
    }
  };

  const loadPoints = async () => {
    const storedSTPoints = await AsyncStorage.getItem("userPoints");
    setSTPoints(storedSTPoints ? parseInt(storedSTPoints) : 0);
    console.log(`Total points: ${storedSTPoints}`);
  };

  const deductPoints = async (coins, index) => {
    if (STpoints >= coins) {
      const updatedVouchers = [...vouchers];
      updatedVouchers[index].count += 1;
      setVouchers(updatedVouchers);
      const remainingPoints = STpoints - coins;
      setSTPoints(remainingPoints);
      await AsyncStorage.setItem("userPoints", remainingPoints.toString());
      console.log(`Deducted ${coins} Coins. Remaining: ${remainingPoints}`);
    } else {
      console.log("Not enough coins!");
    }
  };

  const incrementQuantity = (index) => {
    const updatedVouchers = [...vouchers];
    updatedVouchers[index].count += 1;
    setVouchers(updatedVouchers);
  };

  const decrementQuantity = (index) => {
    const updatedVouchers = [...vouchers];
    if (updatedVouchers[index].count > 0) {
      updatedVouchers[index].count -= 1;
      setVouchers(updatedVouchers);
    }
  };

  const renderVoucher = ({ item, index }) => (
    <View style={styles.voucherCard}>
      <Image
        source={require("../../assets/diet.png")}
        style={styles.voucherImage}
      />
      <View style={styles.voucherInfo}>
        <Text style={styles.voucherName}>{item.name}</Text>
        <Text style={styles.voucherCoins}>{item.coins} Coins</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => decrementQuantity(index)}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.count}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => incrementQuantity(index)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const totalCost = vouchers.reduce((acc, item) => acc + item.coins * item.count, 0);

  const handlePurchase = async () => {
    if (totalCost > STpoints || STpoints === 0) {
      console.log("Not enough coins for checkout!");
    } else {
      const remainingPoints = STpoints - totalCost;
      setSTPoints(remainingPoints);
      await AsyncStorage.setItem("userPoints", remainingPoints.toString());

      const updatedVouchers = vouchers.map((item) => ({ ...item, count: 0 }));
      setVouchers(updatedVouchers);

      console.log("Checkout successful!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.pointsContainer}>
          <View style={styles.centered}>
            <Image source={require("../../assets/money.png")} style={styles.textImage} />
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
      <View style={styles.checkoutContainer}>
        <Text style={styles.totalCostText}>Total Cost: {totalCost} Coins</Text>
        <TouchableOpacity title="Checkout" onPress={handlePurchase} style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#dddddd",
  },
  voucherImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    resizeMode: "cover",
  },
  voucherInfo: {
    flex: 1,
  },
  voucherName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  voucherCoins: {
    fontSize: 16,
    color: "#888888",
  },
  textImage: {
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
  },
  checkoutContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
  },
  totalCostText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "green",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  quantity: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "green",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
