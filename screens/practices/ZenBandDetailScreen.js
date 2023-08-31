import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet,} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ZenBandDetailScreen = ({ navigation }) => {
  const handleTabButtonPress = () => {
    navigation.navigate("BottomTabsOverview");
  };

  return (
    <ScrollView style={styles.container}>
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
          {"\n"}• Customizable Scents for a personalized aromatherapy experience
        </Text>
        <Image
          source={require("../../assets//zenband/stylish-design.jpg")}
          style={styles.featureImage}
        />
        <Image
          source={require("../../assets//zenband/components.jpg")}
          style={styles.featureImage}
        />
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
        <Text style={styles.sectionTitle}>Usage Instructions</Text>
        <Text style={styles.featuresText}>
          • Adjustable size for a comfortable fit {"\n"}
          {"\n"}• Fidget-friendly twist cap for stress relief {"\n"}
          {"\n"}• Twist the cap to open the smell hole for aromatherapy
        </Text>
        <Image
          source={require("../../assets//zenband/mechanics.jpg")}
          style={styles.featureImage}
        />
        <Image
          source={require("../../assets//zenband/fidget-design.jpg")}
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
          more relaxed during busy days." - Alex
        </Text>
        <Image
          source={require("../../assets//zenband/testimonial1.jpg")}
          style={{ width: "100%", height: 200, resizeMode: "repeat" }}
        />
      </View>

      {/* Call-to-Action */}
      <TouchableOpacity 
        style={styles.ctaButton}
        onPress={handleTabButtonPress}>
        <Text style={styles.ctaButtonText}>
          Use the ZenBand in Your Zen Box!
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

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
  },
  featuresText: {
    fontSize: 16,
    paddingHorizontal: 16,
  },
  benefitsText: {
    fontSize: 16,
  },
  usageText: {
    fontSize: 16,
  },
  testimonialText: {
    fontSize: 16,
  },
  ctaButton: {
    backgroundColor: "#42b983",
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  ctaButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  featureImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 16,
  },
});

export default ZenBandDetailScreen;
