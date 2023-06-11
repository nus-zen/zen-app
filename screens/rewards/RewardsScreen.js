import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { GlobalColors } from "../../themes/GlobalColors";

const RewardsScreen = () => {
  const [coinBalance, setCoinBalance] = useState(100); // Example coin balance
  const [vouchers, setVouchers] = useState([
    { id: 1, name: "Cafeteria Voucher", coins: 50 },
    { id: 2, name: "Bookstore Voucher", coins: 80 },
    { id: 3, name: "Gym Membership Voucher", coins: 120 },
    // Add more vouchers as needed
  ]);

  const redeemVoucher = (voucher) => {
    // Logic to handle voucher redemption
    // You can deduct coins from the coin balance and perform any necessary actions
    // For example: setCoinBalance(coinBalance - voucher.coins);
    console.log(`Redeeming voucher: ${voucher.name}`);
  };

  const renderVoucher = ({ item }) => (
    <TouchableOpacity
      style={styles.voucherCard}
      onPress={() => redeemVoucher(item)}
    >
      <Text style={styles.voucherName}>{item.name}</Text>
      <Text style={styles.voucherCoins}>{item.coins} Coins</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.coinBalance}>
        DRAFT REWARDS SCREEN. REPLACE THIS SCREEN WITH YOUR CODE
      </Text>
      <Text style={styles.coinBalance}>Coin Balance: {coinBalance}</Text>
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
    padding: 16,
    marginTop: 100,
  },
  coinBalance: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  vouchersContainer: {
    flexGrow: 1,
  },
  voucherCard: {
    backgroundColor: GlobalColors.primary100,
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
});

export default RewardsScreen;
