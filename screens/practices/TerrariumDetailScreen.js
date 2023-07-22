import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

const steps = [
  "Choose a glass container for your terrarium.",
  "Add a layer of pebbles to the bottom of the container for drainage.",
  "Add a layer of activated charcoal to keep the terrarium fresh.",
  "Add a layer of potting soil to create a growing environment for plants.",
  "Carefully arrange your selected plants inside the terrarium.",
  "Add decorative elements such as small figurines or rocks (optional).",
];

const stepImages = [
  require("../../assets/terrarium/terra-step-1.jpg"),
  require("../../assets/terrarium/terra-step-2.jpg"),
  require("../../assets/terrarium/terra-step-3.jpg"),
  require("../../assets/terrarium/terra-step-4.jpg"),
  require("../../assets/terrarium/terra-step-5.jpg"),
  require("../../assets/terrarium/terra-step-6.jpg"),
];

const TerrariumDetailScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Terrarium Image */}
      <Image
        source={require("../../assets/terrarium/terra-final.jpg")}
        style={styles.terrariumImage}
      />

      {/* Instructions */}
      <View style={styles.instructionsContainer}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Image source={stepImages[index]} style={styles.stepImage} />
            <Text style={styles.stepText}>{`${index + 1}. ${step}`}</Text>
          </View>
        ))}
      </View>

      {/* Materials List */}
      <View style={styles.materialsContainer}>
        <Text style={styles.sectionTitle}>Materials List</Text>

        <Image
          source={require("../../assets/terrarium/terra-materials.jpg")}
          style={styles.materialsImage}
        />
        <Text style={styles.materialsText}>
          Glass container{"\n"}Pebbles {"\n"}Activated charcoal{"\n"}Potting
          soil{"\n"}Terrarium plants{"\n"}Decorative elements (optional)
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  terrariumImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  instructionsContainer: {
    padding: 16,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  stepImage: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    marginRight: 8,
  },
  stepText: {
    flex: 1,
    fontSize: 16,
  },
  materialsContainer: {
    alignItems: "center",
    paddingVertical: 16,
  },
  materialsImage: {
    width: "80%",
    height: 300,
    resizeMode: "contain",
  },
  materialsText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default TerrariumDetailScreen;
