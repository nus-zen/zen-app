import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, } from "react-native";
import { GlobalColors } from "../../themes/GlobalColors";
import { useNavigation } from "@react-navigation/native";

const steps = [
  "Begin with a layer of white pebbles for drainage, a stylish start for your plant paradise.",
  "Create a green haven with potting soil. Your plants will love their cozy new home.",
  "Add a dash of enchantment with blue pebbles, crafting a whimsical path.",
  "Elevate your container's charm by introducing a quaint house or a rock to the mix.",
  "Take it up a notch by including a rabbit figurine in your container.",
  "Introduce a whimsical duck figurine to your garden. Your plants will love their new friend.",
  "The time has come to introduce your air plants to their new abode. Feel free to experiment with different plant varieties.",
];

const stepImages = [
  require("../../assets/terrarium/terra-step-1.jpg"),
  require("../../assets/terrarium/terra-step-2.jpg"),
  require("../../assets/terrarium/terra-step-3.jpg"),
  require("../../assets/terrarium/terra-step-4.jpg"),
  require("../../assets/terrarium/terra-step-5.jpg"),
  require("../../assets/terrarium/terra-step-6.jpg"),
  require("../../assets/terrarium/terra-step-7.jpg"),
];

const TerrariumDetailScreen = () => {
  const navigation = useNavigation(); // Initialize the navigation object

  // Function to navigate to PracticeHome
  const goToBottomTabsOverview = () => {
    navigation.navigate("BottomTabsOverview");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Terrarium Image */}
      <Image
        source={require("../../assets/terrarium/terra-final.jpg")}
        style={styles.terrariumImage}
      />

      {/* Instructions */}
      <View style={styles.instructionsContainer}>
        <Text style={styles.sectionTitle}>ZenTerrarium Making Instructions</Text>
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
          • Plastic container{"\n"}• White Pebbles {"\n"}• Blue Pebbles {"\n"}•
          Potting soil{"\n"}• Air plants{"\n"}• Decorative elements (optional)
        </Text>
      </View>

    {/* Plant Care Instructions */}
    <View style={styles.plantCareContainer}>
      <Text style={styles.sectionTitle}>Plant Care Instructions</Text>
      <Text style={styles.plantCareText}>
        • Place your terrarium in a location with indirect sunlight.{"\n"}
        • Water your air plants sparingly, about once a week, by misting them.{"\n"}
        • Keep an eye on the moisture level of the potting soil, and water if it dries out.{"\n"}
        • Prune any dead or yellowing leaves from your air plants.{"\n"}
        • Enjoy the beauty of your mini garden!
      </Text>
    </View>

      <TouchableOpacity
        style={styles.amazingButton}
        onPress={goToBottomTabsOverview}
      >
        <Text style={styles.amazingButtonText}>That's Amazing!</Text>
      </TouchableOpacity>
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
    textAlign: "center",
    marginBottom: 8,
  },
  terrariumImage: {
    width: "100%",
    height: 400,
    resizeMode: "stretch",
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
    width: 150,
    height: 150,
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
    marginTop: 16,
    textAlign: "justify",
  },
  plantCareContainer: {
    padding: 16,
  },
  plantCareText: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 16,
    textAlign: "justify",
    paddingHorizontal: 16,
  },
  amazingButton: {
    backgroundColor: GlobalColors.primary300,
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 30,
  },
  amazingButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default TerrariumDetailScreen;
