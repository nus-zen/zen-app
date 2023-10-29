import React from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import analytics from "@react-native-firebase/analytics";

function removeFirstOccurrence(arr, itemToRemove) {
  const index = arr.indexOf(itemToRemove);
  if (index !== -1) {
    arr.splice(index, 1);
  }
  return arr;
}

const VoucherCard = ({ voucherName, currUserDoc, vouchers }) => {
  const handleRedeemPress = () => {
    // Display an Alert when the "Redeem" button is pressed
    Alert.alert("Redeem Voucher", `Redeem ${voucherName} voucher`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () =>
          Alert.alert(
            "Confirmation",
            "This should only be done after you have successfully shown and redeemed your voucher! Are you sure?",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "OK",
                onPress: async () => {
                  await currUserDoc.update({
                    vouchers: removeFirstOccurrence(vouchers, voucherName),
                  });
                  analytics().logEvent("redeem_voucher", {
                    voucher_name: voucherName,
                  });
                  console.log(
                    "redeem_voucher event logged from VoucherCard.js"
                  );
                },
              },
            ]
          ),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.name}>{voucherName}</Text>
      </View>
      <Button title="Redeem" onPress={handleRedeemPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    margin: 5,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    borderBottomColor: "black",
    borderWidth: 0.4,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 14,
  },
});

export default VoucherCard;
