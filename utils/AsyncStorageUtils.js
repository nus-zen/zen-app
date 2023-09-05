import AsyncStorage from "@react-native-async-storage/async-storage";

// Constants
const MEDITATIONS_FAVORITES_KEY = "meditationsFavorites";
const SHOW_FAV_ONLY_KEY = "showFavOnly";

// Function to get the favorites object from AsyncStorage
export const getMeditationsFavorites = async () => {
  try {
    const favorites = await AsyncStorage.getItem(MEDITATIONS_FAVORITES_KEY);
    //console.log("got list of fav");
    return favorites ? JSON.parse(favorites) : {};
  } catch (error) {
    console.error("Error getting meditation favorites:", error);
    return {};
  }
};

// Function to retrieve the favorite status for a specific meditation by title
export const retrieveFavStatus = async (title) => {
  const favorites = await getMeditationsFavorites();
  //console.log("retrieved fav status: ", favorites[title]);
  return favorites[title] || false;
};

// Function to set the favorite status for a specific meditation by title
export const setFavStatusAsync = async (title, isFavorite) => {
  try {
    const favorites = await getMeditationsFavorites();
    favorites[title] = isFavorite;
    await AsyncStorage.setItem(
      MEDITATIONS_FAVORITES_KEY,
      JSON.stringify(favorites)
    );
    console.log("saved");
  } catch (error) {
    console.error("Error setting meditation favorite status:", error);
  }
};

// Function to get the value of showFavOnly from AsyncStorage
export const getShowFavOnly = async () => {
  try {
    const value = await AsyncStorage.getItem(SHOW_FAV_ONLY_KEY);
    return value !== null ? JSON.parse(value) : false; // Default to false if value is not found
  } catch (error) {
    console.error("Error getting showFavOnly:", error);
    return false; // Default to false in case of an error
  }
};

// Function to set the value of showFavOnly in AsyncStorage
export const saveShowFavOnly = async (value) => {
  try {
    await AsyncStorage.setItem(SHOW_FAV_ONLY_KEY, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting showFavOnly:", error);
  }
};

// Function to load progress images from AsyncStorage
export const loadProgressImages = async () => {
  try {
    const storedImages = await AsyncStorage.getItem("progressImages");
    return storedImages ? JSON.parse(storedImages) : [];
  } catch (error) {
    console.error("Error loading progress images:", error);
    return [];
  }
};

// Function to save progress images' URIs to AsyncStorage
export const saveProgressImages = async (images) => {
  try {
    await AsyncStorage.setItem("progressImages", JSON.stringify(images));
    console.log("Progress Images saved:", images);
  } catch (error) {
    console.error("Error saving progress images:", error);
  }
};
