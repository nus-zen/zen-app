import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { GlobalColors } from "../../themes/GlobalColors";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ZenBandHelpCard } from "../../components/ZenBandHelpCard";
import AromaScrollView from "../../components/AromaScrollView";

export default function ZenBandDetailScreen({ navigation }) {
  const [isHelpVisible, setIsHelpVisible] = useState(false);

  // Function to navigate to PracticeHome
  const goToBottomTabsOverview = () => {
    navigation.navigate("BottomTabsOverview");
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            setIsHelpVisible(true);
          }}
          style={{ marginRight: 15 }}
        >
          <Ionicons name="ios-help-circle" size={30} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView 
      style={styles.container}
      nestedScrollEnabled={true}
    >
      {/* ZenBand Image */}
      <Image
        source={require("../../assets/zenband/zenband.jpg")}
        style={styles.zenBandImage}
      />

      {/* Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <Text style={styles.featuresText}>
          • Stylish and Unisex design for university students {"\n"}
          {"\n"}• Stress Relief with Fidget-Friendly Design during busy
          university days {"\n"}
          {"\n"}• Quick Access to Aromatherapy to unwind during study sessions{" "}
          {"\n"}
          {"\n"}• Customizable Scents for a personalized aromatherapy experience{" "}
          {"\n"}
        </Text>
        <Image
          source={require("../../assets/zenband/band.png")}
          style={styles.featureImage}
        />
        <Image
          source={require("../../assets/zenband/extruded_view.png")}
          style={styles.featureImage}
        />
        <Image
          source={require("../../assets/zenband/components.png")}
          style={styles.featureImage}
        />
      </View>
      <View style={styles.section}>
      <Text style={styles.sectionTitle}>Type of Scents</Text>
        <AromaScrollView />
      </View>
      {/* Benefits */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Benefits</Text>
        <Text style={styles.featuresText}>
          • University Stress Buster: Find calmness and manage stress during
          your university journey {"\n"}
          {"\n"}• Improved Focus and Concentration for better study performance{" "}
          {"\n"}
          {"\n"}• Mindfulness and Relaxation with aromatic scents for a positive
          mindset {"\n"}
          {"\n"}• Fashion Meets Function: Enhance your style while supporting
          your mental well-being
        </Text>
      </View>

      {/* Usage Instructions */}
      <View style={styles.section}>
        <Image
          source={require("../../assets/zenband/mechanics.png")}
          style={styles.featureImage}
        />
      </View>

      {/* Testimonials */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Testimonials</Text>
        <Text style={styles.featuresText}>
          "The ZenBand has been a lifesaver during exam season! I felt more
          focused and calm while wearing it." - Sarah {"\n"}
          {"\n"}
          "As a college student, the ZenBand helped me manage stress and feel
          more relaxed during busy days." - Alex{"\n"}
        </Text>
        <Image
          source={require("../../assets/zenband/testimonial1.jpg")}
          style={{ width: "100%", height: 300, resizeMode: "center" }}
        />
        <TouchableOpacity
          style={styles.amazingButton}
          onPress={goToBottomTabsOverview}
        >
          <Text style={styles.amazingButtonText}>That's Amazing!</Text>
        </TouchableOpacity>
      </View>

      <ZenBandHelpCard
        isVisible={isHelpVisible}
        onClose={() => setIsHelpVisible(false)}
      />


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  zenBandImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  section: {
    padding: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 12,
    textAlign: "center",
  },
  featuresText: {
    fontSize: 16,
    paddingHorizontal: 16,
    textAlign: "left",
  },
  benefitsText: {
    fontSize: 16,
    textAlign: "left",
  },
  usageText: {
    fontSize: 16,
  },
  testimonialText: {
    fontSize: 16,
    textAlign: "left",
  },
  featureImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 16,
  },
  amazingButton: {
    backgroundColor: GlobalColors.primary300,
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 16,
    marginHorizontal: 30,
  },
  amazingButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
