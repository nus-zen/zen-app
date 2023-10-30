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

import Ionicons from "react-native-vector-icons/Ionicons";

const RewardsItems = ({ checkoutHandler, category, goBack }) => {
  const [vouchers, setVouchers] = useState([
    {
      id: 1,
      name: "$2 KOI Voucher (WIP. Do not redeem!)",
      coins: 200,
      count: 0,
      imguri:
        "https://www.capitaland.com/content/dam/capitaland-sites/singapore/shop/malls/plaza-singapura/tenants/koi.png.transform/cap-midres/image.png",
    },
    {
      id: 2,
      name: "$1 Techno Edge Drinks Voucher (WIP. Do not redeem!)",
      coins: 100,
      count: 0,
      imguri:
        "https://nus.edu.sg/alumnet//images/librariesprovider2/issue-125/canteen-2",
    },
    {
      id: 3,
      name: "$1 Techno Edge Food Voucher (WIP. Do not redeem!)",
      coins: 100,
      count: 0,
      imguri:
        "https://nus.edu.sg/alumnet//images/librariesprovider2/issue-125/canteen-2",
    },
    {
      id: 4,
      name: "$2 Starbucks Voucher (WIP. Do not redeem!)",
      coins: 200,
      count: 0,
      imguri:
        "https://enjoyorangecounty.com/wp-content/uploads/2022/11/starbucks-secret-menu-items.jpg",
    },
    {
      id: 5,
      name: "$2 LiHo Voucher (WIP. Do not redeem!)",
      coins: 200,
      count: 0,
      imguri:
        "https://www.shicheng.news/images/image/1701/17014637.webp?1658318444",
    },
    {
      id: 101,
      name: "Sakura Pink Yarn (10g)",
      coins: 100,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1w_IpAlwPJF_ITeKRi1K2qHCr0ALFOmyr",
    },
    {
      id: 102,
      name: "Purple Yarn (10g)",
      coins: 100,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1fqEMwZ_cACV3q3BTiAKaO7xPr-YEJIVw",
    },
    {
      id: 103,
      name: "Autumn Brown Yarn (10g)",
      coins: 100,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1PKymjsK-PVIprSgJRDDiCf4-4DIOYDPC",
    },
    {
      id: 104,
      name: "Autumn Red Yarn (10g)",
      coins: 100,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1DZ2c2639mDtQwCrFwjl6QVFCunaIywDx",
    },
    {
      id: 105,
      name: "Autumn Yellow Yarn (10g)",
      coins: 100,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1JzkRtV0bXpMcQGxT_iwUr1Ll52ZQqJNA",
    },

    {
      id: 110,
      name: "Basic Black Trunk (may not be available)",
      coins: 100,
      count: 0,
      imguri:
        "https://icons.veryicon.com/png/o/application/applet-1/product-17.png",
    },
    {
      id: 111,
      name: "Basic Beige Trunk (may not be available)",
      coins: 100,
      count: 0,
      imguri:
        "https://icons.veryicon.com/png/o/application/applet-1/product-17.png",
    },
    {
      id: 112,
      name: "Basic Brown Trunk (may not be available)",
      coins: 100,
      count: 0,
      imguri:
        "https://icons.veryicon.com/png/o/application/applet-1/product-17.png",
    },
    {
      id: 201,
      name: "Sanrio Figurines - Pompompurin",
      coins: 200,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1pprU8l3-Txxeg1UW_TM8ccf2ACyopJTd",
    },
    {
      id: 202,
      name: "Sanrio Figurines - Hello Kitty",
      coins: 200,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1x1MXG6DQK3X3q5SKvlxGBQ2Zot7arFts",
    },
    {
      id: 203,
      name: "Sanrio Figurines - Kuromi",
      coins: 200,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1Dy4iY92PcGpeFr36k8dzAzsLeacdpX0N",
    },
    {
      id: 204,
      name: "Sanrio Figurines - Cinnamoroll",
      coins: 200,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1Q9ewAFWSP__Iwvxvsk-zTJeJeu7zQm0d",
    },
    {
      id: 205,
      name: "Sanrio Figurines - Pochacco 1",
      coins: 200,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1-p9hLX7KrC2wwH4bJKeWOxYrLaNizqg8",
    },
    {
      id: 206,
      name: "Sanrio Figurines - Pochacco 2",
      coins: 200,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1-_bTm2hV4lamOeMxNdtfCyq9SMhQnVyt",
    },
    {
      id: 207,
      name: "Maneki Neko - Brown cat S",
      coins: 200,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=10oTCN-i8IZOtz8evwL01VazxlaN9Y8jD",
    },
    {
      id: 208,
      name: "Maneki Neko - Tuxedo cat S",
      coins: 200,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1dqn3Es4NVvaq-GR5vAt4lVRXQpIvHp5R",
    },
    {
      id: 209,
      name: "Maneki Neko - Black cat M",
      coins: 250,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1F6L8YDm1Hoam6UlYZE8NQHBnh3_3uAXS",
    },
    {
      id: 210,
      name: "Maneki Neko - White cat M",
      coins: 250,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1HBbJBBpBXdUXUnQrejBKrAY6vd2eBDv0",
    },
    {
      id: 211,
      name: "Maneki Neko – Orange cat L",
      coins: 300,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1ojO72gyDhlThEATnZAQT-kPskPOy-44w",
    },
    {
      id: 212,
      name: "Maneki Neko - Tuxedo cat L",
      coins: 300,
      count: 0,
      imguri:
        "https://icons.veryicon.com/png/o/application/applet-1/product-17.png",
    },
    {
      id: 213,
      name: "Christmas - Santa",
      coins: 200,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1s1yoE7pXATFmsBrCs00ofGHVeX5YI8vG",
    },
    {
      id: 214,
      name: "Christmas – Reindeer",
      coins: 200,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1-yOoxrY8_a_YThQ7NnO_EIJuqOSg1X2-",
    },
    {
      id: 215,
      name: "Christmas – Snowman",
      coins: 200,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1g1A0wOvJ42U4op8kPJb0cnMqscgsR9q0",
    },
    {
      id: 216,
      name: "Christmas - House",
      coins: 200,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1SEtEkcaW3JGPZlCxWyefHbYpb7rNVyQd",
    },
    {
      id: 217,
      name: "Halloween – Pumpkin duck",
      coins: 200,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1A0gi12DQRUkzcu8LeVBGtYD8Nw2TKlaR",
    },
    {
      id: 218,
      name: "Halloween – Duck",
      coins: 200,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1-LHyc6wAOVPxDdwrVIwWVKovyQwPYEI0",
    },
    {
      id: 219,
      name: "Halloween – Ghost",
      coins: 200,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1q79pTCKMYfSyf_fgytnMxcMcKDTP8EKA",
    },
    {
      id: 220,
      name: "Halloween – Pumpkin with hat",
      coins: 200,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1sWQfuqaP7tS6TUcIFyfF82Ark446Q1Y6",
    },
    {
      id: 221,
      name: "Studio Ghibli – No Face",
      coins: 200,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1ecpnrrnQTJ5u2e6MZxdZmFxQBSD836Ij",
    },
    {
      id: 222,
      name: "Studio Ghibli – Totoro with heart",
      coins: 200,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1BTdBtQLZqLPkpZLZdVMlejnSOpDDU2p5",
    },
    {
      id: 223,
      name: "Studio Ghibli – Totoro with umbrella",
      coins: 250,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1vnWah9D1OTOokYpDP0FQYLw_aO-fDs61",
    },
    {
      id: 224,
      name: "Studio Ghibli – Signage",
      coins: 150,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1xN9yF7kkP8-Pk24iUnVdD4ysDdH7JPS7",
    },
    {
      id: 225,
      name: "Basic Rabbit",
      coins: 100,
      count: 0,
      imguri:
        "https://icons.veryicon.com/png/o/application/applet-1/product-17.png",
    },
    {
      id: 226,
      name: "White sand",
      coins: 100,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1L3MarZq-isiwcUs8RzbIgyIvcS-A2aIT",
    },
    {
      id: 227,
      name: "Green sand",
      coins: 100,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1MhuaTw30utMXCpKQuooZmkO_HRPtPdd6",
    },
    {
      id: 228,
      name: "Pink sand",
      coins: 100,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1o2Xkw3QXHDpFSaA4Ets23ZwuMyMmpORz",
    },
    {
      id: 229,
      name: "Purple sand",
      coins: 100,
      count: 0,
      imguri:
        "https://icons.veryicon.com/png/o/application/applet-1/product-17.png",
    },
    {
      id: 230,
      name: "Basic blue sand",
      coins: 100,
      count: 0,
      imguri:
        "https://drive.google.com/uc?export=view&id=1swXQi-A-5IjrY2UCIBOYBgC8Fq_-ElK4",
    },
    {
      id: 301,
      name: "Jasmine (may not be available)",
      coins: 50,
      count: 0,
      imguri:
        "https://icons.veryicon.com/png/o/application/applet-1/product-17.png",
    },
    {
      id: 302,
      name: "Ylang Ylang (may not be available)",
      coins: 50,
      count: 0,
      imguri:
        "https://icons.veryicon.com/png/o/application/applet-1/product-17.png",
    },
    {
      id: 303,
      name: "Eucalyptus (may not be available)",
      coins: 50,
      count: 0,
      imguri:
        "https://icons.veryicon.com/png/o/application/applet-1/product-17.png",
    },
    {
      id: 304,
      name: "Sandalwood (may not be available)",
      coins: 50,
      count: 0,
      imguri:
        "https://icons.veryicon.com/png/o/application/applet-1/product-17.png",
    },
    {
      id: 305,
      name: "Lavender (may not be available)",
      coins: 50,
      count: 0,
      imguri:
        "https://icons.veryicon.com/png/o/application/applet-1/product-17.png",
    },
    {
      id: 306,
      name: "Clary Sage (may not be available)",
      coins: 50,
      count: 0,
      imguri:
        "https://icons.veryicon.com/png/o/application/applet-1/product-17.png",
    },
    {
      id: 307,
      name: "Leather band (may not be available)",
      coins: 300,
      count: 0,
      imguri:
        "https://icons.veryicon.com/png/o/application/applet-1/product-17.png",
    },
    {
      id: 308,
      name: "Crochet band (may not be available)",
      coins: 300,
      count: 0,
      imguri:
        "https://icons.veryicon.com/png/o/application/applet-1/product-17.png",
    },
    {
      id: 309,
      name: "Milanese band (may not be available)",
      coins: 300,
      count: 0,
      imguri:
        "https://icons.veryicon.com/png/o/application/applet-1/product-17.png",
    },
  ]);

  // Filter vouchers based on category if chosen
  useEffect(() => {
    const getCategoryIDRange = (categoryName) => {
      switch (categoryName) {
        case "Vouchers":
          return [1, 100];
        case "ZenTree":
          return [101, 200];
        case "ZenTerrarium":
          return [201, 300];
        case "ZenBand":
          return [301, 400];
        default:
          return [];
      }
    };

    // Filter vouchers based on category if chosen
    const [startID, endID] = getCategoryIDRange(category.name);

    setVouchers((prevVouchers) =>
      prevVouchers.filter(
        (voucher) => voucher.id >= startID && voucher.id <= endID
      )
    );
  }, [category]);

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
      <TouchableOpacity onPress={goBack}>
        <Ionicons name="arrow-back" size={40} color="black" />
      </TouchableOpacity>
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
