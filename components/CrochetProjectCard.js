import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { TouchableOpacity, Text, Image, View } from "react-native";

export default function CrochetProjectCard({ projects, handleProjectPress }) {
  return (
    <>
      {projects.map((project, index) => (
        <TouchableOpacity
          key={index}
          style={styles.projectCard}
          onPress={() => handleProjectPress(project)}
        >
          <Text style={styles.projectTitle}>{project.title}</Text>
          {project.image ? (
            <Image
              source={{ uri: project.image }}
              style={styles.projectImage}
            />
          ) : (
            <View style={styles.placeholderImage}>
              <MaterialCommunityIcons
                name="image-outline"
                size={48}
                color="gray"
              />
            </View>
          )}
        </TouchableOpacity>
      ))}
    </>
  );
}
const styles = StyleSheet.create({
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
