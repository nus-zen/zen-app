import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadCrochetProjects = async (setProjects) => {
  try {
    const storedProjects = await AsyncStorage.getItem("CrochetProjects");
    const projects = storedProjects ? JSON.parse(storedProjects) : [];

    // Set the loaded projects in the component's state or a context
    setProjects(projects); // Assuming you have a state variable or context for projects
  } catch (error) {
    console.log("Error loading crochet projects:", error);
  }
};
