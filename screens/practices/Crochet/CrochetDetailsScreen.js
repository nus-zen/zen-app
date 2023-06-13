import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GlobalColors } from "../../../themes/GlobalColors";
import { loadCrochetProjects } from "../../../utils/AsyncStorageUtils";
import CrochetProjectCard from "../../../components/CrochetProjectCard";

const CrochetDetailsScreen = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadCrochetProjects(setProjects);
  }, []);
  const navigation = useNavigation();

  const handleAddProject = () => {
    navigation.navigate("AddCrochetProjectScreen");
  };

  const handleProjectPress = (project) => {
    navigation.navigate("CrochetProjectDetailScreen", { project });
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Crocheting</Text>
        <Text style={styles.description}>
          Crocheting is a versatile craft that uses a hook and yarn to create
          various items such as blankets, scarves, and hats. It provides a
          creative outlet and can be a relaxing and meditative activity.
        </Text>
      </View>

      <View style={styles.middleSection}>
        <Text style={styles.sectionTitle}>How to Crochet</Text>
        <Text style={styles.instructions}>
          1. Hold the crochet hook in your dominant hand.
        </Text>
        <Text style={styles.instructions}>
          2. Make a slipknot and place it on the hook.
        </Text>
        <Text style={styles.instructions}>
          3. Insert the hook into the designated stitch or space.
        </Text>
        <Text style={styles.instructions}>
          4. Yarn over and pull through the stitch or space, creating a loop on
          the hook.
        </Text>
        <Text style={styles.instructions}>
          5. Yarn over again and pull through both loops on the hook.
        </Text>
        {/* Add more instructions as needed */}
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.sectionTitle}>Projects</Text>

        <TouchableOpacity
          style={styles.addProjectButton}
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>Add Project</Text>
          <MaterialCommunityIcons name="plus" size={24} color="white" />
        </TouchableOpacity>

        <CrochetProjectCard
          projects={projects}
          handleProjectPress={handleProjectPress}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  topSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  middleSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  instructions: {
    marginBottom: 6,
  },
  bottomSection: {
    marginBottom: 20,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  progressImagesContainer: {
    flexDirection: "row",
  },
  progressImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    resizeMode: "cover",
  },
  bottomSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addProjectButton: {
    flexDirection: "row",
    backgroundColor: "#F39200",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  projectCard: {
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  projectImage: {
    width: "100%",
    height: 150,
    marginBottom: 8,
    resizeMode: "cover",
    borderRadius: 8,
  },
  placeholderImage: {
    width: "100%",
    height: 150,
    marginBottom: 8,
    backgroundColor: "lightgray",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CrochetDetailsScreen;
