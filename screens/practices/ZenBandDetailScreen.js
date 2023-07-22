import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const ZenBandDetailScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* ZenBand Image */}
      <Image
        source={require("../../assets/zenband-over-ledge.jpg")}
        style={styles.zenBandImage}
      />

      {/* Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <Text style={styles.featuresText}>
          &#8226; Minimalist look for unisex wearing {"\n"}
          &#8226; Fashionable and stylish design {"\n"}
          &#8226; Fidget-friendly band to play with {"\n"}
          &#8226; Quick access to aromatherapy with a twist cap {"\n"}
          &#8226; Easy reloading of scents
        </Text>
      </View>

      {/* Benefits */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Benefits</Text>
        <Text style={styles.benefitsText}>
          &#8226; Quick access to aromatherapy through a fashionable band {"\n"}
          &#8226; Scientific-based benefits of aromatherapy include: {"\n"}
          &nbsp;&nbsp; - Stress relief {"\n"}
          &nbsp;&nbsp; - Improved mood
        </Text>
      </View>

      {/* Usage Instructions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Usage Instructions</Text>
        <Text style={styles.usageText}>
          &#8226; Adjustable size for a comfortable fit {"\n"}
          &#8226; Fidget-friendly twist cap for stress relief {"\n"}
          &#8226; Twist the cap to open the smell hole for aromatherapy
        </Text>
      </View>

      {/* Testimonials */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Testimonials</Text>
        <Text style={styles.testimonialText}>
          "The ZenBand has been a lifesaver during exam season! I felt more
          focused and calm while wearing it." - Sarah {"\n"}
          {"\n"}
          "As a college student, the ZenBand helped me manage stress and feel
          more relaxed during busy days." - Alex
        </Text>
      </View>

      {/* Call-to-Action */}
      <TouchableOpacity style={styles.ctaButton}>
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
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  featuresText: {
    fontSize: 16,
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
});

export default ZenBandDetailScreen;
