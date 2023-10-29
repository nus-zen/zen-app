import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import VoucherCard from "./VoucherCard";

const VouchersScreen = () => {
  const [vouchers, setVouchers] = useState([]);

  const currUserDoc = firestore()
    .collection("users")
    .doc(auth().currentUser.email);

  // set up firestore listener to update vouchers redeemed in real time
  useEffect(() => {
    const unsubscribe = currUserDoc.onSnapshot((doc) => {
      setVouchers(doc.data().vouchers);
    });
    return () => unsubscribe();
  }, []);

  function convertVoucherStringsToObjects(voucherNames) {
    return voucherNames.map((name, index) => ({
      id: index + 1, // Unique ID, starting from 1
      name: name,
    }));
  }

  const formattedVouchers = convertVoucherStringsToObjects(vouchers);
  //console.log(formattedVouchers);

  const renderVoucher = ({ item }) => (
    <VoucherCard
      voucherName={item.name}
      currUserDoc={currUserDoc}
      vouchers={vouchers}
    />
  );

  //console.log("vouchers", vouchers);
  return (
    <View>
      <FlatList
        data={formattedVouchers}
        renderItem={renderVoucher}
        keyExtractor={(item) => item.id.toString()} // Use index as the key
      />
    </View>
  );
};

export default VouchersScreen;

const styles = StyleSheet.create({});
