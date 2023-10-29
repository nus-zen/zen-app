export const saveProgressImagesForTerrarium = async (images) => {
    try {
      await AsyncStorage.setItem("progressImagesForTerrarium", JSON.stringify(images));
      console.log("Progress Terrarium Images saved in AsyncStorage");
    } catch (error) {
      console.error("Error saving progress images:", error);
    }
  };
  
  export const loadProgressImagesForTerrarium = async () => {
    try {
      const storedTerrariumImages = await AsyncStorage.getItem("progressImagesForTerrarium");
      return storedTerrariumImages ? JSON.parse(storedTerrariumImages) : [];
    } catch (error) {
      console.error("Error loading progress Terrarium images:", error);
      return [];
    }
  };
  