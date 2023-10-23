import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from "react-native";

const RewardsItems = ({ checkoutHandler }) => {
  const [vouchers, setVouchers] = useState([
    {
      id: 1,
      name: "$2 KOI Voucher",
      coins: 200,
      count: 0,
      imguri:
        "https://www.capitaland.com/content/dam/capitaland-sites/singapore/shop/malls/plaza-singapura/tenants/koi.png.transform/cap-midres/image.png",
    },
    {
      id: 7,
      name: "$1 Techno Edge Drinks Voucher",
      coins: 100,
      count: 0,
      imguri:
        "https://nus.edu.sg/alumnet//images/librariesprovider2/issue-125/canteen-2",
    },
    {
      id: 8,
      name: "$1 Techno Edge Food Voucher",
      coins: 100,
      count: 0,
      imguri:
        "https://nus.edu.sg/alumnet//images/librariesprovider2/issue-125/canteen-2",
    },
    {
      id: 9,
      name: "$2 Starbucks Voucher",
      coins: 200,
      count: 0,
      imguri:
        "https://enjoyorangecounty.com/wp-content/uploads/2022/11/starbucks-secret-menu-items.jpg",
    },
    {
      id: 10,
      name: "$2 LiHo Voucher",
      coins: 200,
      count: 0,
      imguri:
        "https://www.shicheng.news/images/image/1701/17014637.webp?1658318444",
    },
    {
      id: 12,
      name: "Forest Green Yarn",
      coins: 50,
      count: 0,
      imguri:
        "https://www.jimmybeanswool.com/secure-html/productImages/5000/8707Large_75af.jpg",
    },
    {
      id: 13,
      name: "Olive Green Yarn",
      coins: 50,
      count: 0,
      imguri: "https://m.media-amazon.com/images/I/41JKtieRMYL._AC_.jpg",
    },
    {
      id: 14,
      name: "Grass Green Yarn",
      coins: 50,
      count: 0,
      imguri:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0B83Qrk0J-AyI3J55soQIO9M9FloutzAW6w&usqp=CAU",
    },
    {
      id: 15,
      name: "Yellow Green Yarn",
      coins: 50,
      count: 0,
      imguri:
        "https://www.jimmybeanswool.com/secure-html/productImages/45000/49429Large_4060.jpg",
    },
    {
      id: 16,
      name: "Crochet Hook",
      coins: 40,
      count: 0,
      imguri:
        "https://www.craftatelier.sg/cdn/shop/products/waves-single-ended-silver-crochet3.00mm_1445x.jpg?v=1676175173",
    },
    {
      id: 18,
      name: "Soil (50g)",
      coins: 30,
      count: 0,
      imguri:
        "https://down-sg.img.susercontent.com/file/f6bb43390afffff76658c6555fc54a02",
    },
    {
      id: 19,
      name: "Air Plant",
      coins: 40,
      count: 0,
      imguri:
        "https://i.etsystatic.com/10523765/r/il/9d8191/2026529534/il_570xN.2026529534_hk2t.jpg",
    },
    {
      id: 20,
      name: "Pebbles (50g)",
      coins: 50,
      count: 0,
      imguri:
        "https://media.karousell.com/media/photos/products/2018/05/31/white_pebbles_50g_1527775440_cfe14b65.jpg",
    },
    {
      id: 21,
      name: "Blue Sand (50g)",
      coins: 50,
      count: 0,
      imguri:
        "https://m.media-amazon.com/images/I/71-4qv25y1L._AC_UF894,1000_QL80_.jpg",
    },
    {
      id: 24,
      name: "Mini Duck for ZenTerrarium",
      coins: 70,
      count: 0,
      imguri:
        "https://media.karousell.com/media/photos/products/2023/7/2/duck_1688263759_a446c9fa_progressive.jpg",
    },
    {
      id: 25,
      name: "Mini Rabbit for ZenTerrarium",
      coins: 70,
      count: 0,
      imguri:
        "https://media.karousell.com/media/photos/products/2020/5/7/rabbit_1588813484_f298fc35_progressive.jpg",
    },
  ]);

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

  const totalCost = vouchers.reduce(
    (acc, item) => acc + item.coins * item.count,
    0
  );

  const renderVoucher = ({ item, index }) => (
    <View style={styles.voucherCard}>
      {/* <Image
        source={require("../../assets/diet.png")}
        style={styles.voucherImage}
      /> */}
      <Image source={{ uri: item.imguri }} style={styles.voucherImage} />
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

  return (
    <View style={styles.container}>
      <FlatList
        data={vouchers}
        renderItem={renderVoucher}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.vouchersContainer}
      />
      <View style={styles.checkoutContainer}>
        <Text style={styles.totalCostText}>Total Cost: {totalCost} Coins</Text>
        <TouchableOpacity
          title="Checkout"
          onPress={() => checkoutHandler(vouchers, totalCost)}
          style={styles.checkoutButton}
        >
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
    elevation: 5,
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

export default RewardsItems;
