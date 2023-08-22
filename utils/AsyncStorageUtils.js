import AsyncStorage from "@react-native-async-storage/async-storage";
import { MEDITATIONS_DATA } from "../data/MeditationsData";

// Constants
const MEDITATIONS_FAVORITES_KEY = "meditationsFavorites";

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

// // Save a rating for a specific meditation
// export const saveMeditationRating = async (meditationId, rating) => {
//   try {
//     // Retrieve existing ratings from AsyncStorage
//     const storedRatings = await AsyncStorage.getItem(
//       `meditationRatings_${meditationId}`
//     );

//     // Parse the retrieved ratings or initialize an empty array
//     const ratings = storedRatings ? JSON.parse(storedRatings) : [];

//     // Add the new rating to the array
//     ratings.push(rating);

//     // Save the updated ratings array to AsyncStorage
//     await AsyncStorage.setItem(
//       `meditationRatings_${meditationId}`,
//       JSON.stringify(ratings)
//     );
//   } catch (error) {
//     console.log("Error saving meditation rating:", error);
//   }
// };

// // Get all ratings for a specific meditation
// export const getMeditationRatings = async (meditationId) => {
//   try {
//     // Retrieve ratings from AsyncStorage
//     const storedRatings = await AsyncStorage.getItem(
//       `meditationRatings_${meditationId}`
//     );

//     // Parse the retrieved ratings or return an empty array
//     return storedRatings ? JSON.parse(storedRatings) : [];
//   } catch (error) {
//     console.log("Error getting meditation ratings:", error);
//     return [];
//   }
// };

// // Get the average rating for a specific meditation
// export const getAverageMeditationRating = async (meditationId) => {
//   try {
//     // Retrieve ratings from AsyncStorage
//     const storedRatings = await AsyncStorage.getItem(
//       `meditationRatings_${meditationId}`
//     );

//     if (storedRatings) {
//       // Parse the retrieved ratings
//       const ratings = JSON.parse(storedRatings);

//       // Calculate the average rating
//       const sum = ratings.reduce((total, rating) => total + rating, 0);
//       const averageRating = sum / ratings.length;

//       // Return the average rating
//       return averageRating;
//     } else {
//       return 0; // Return 0 if no ratings are available
//     }
//   } catch (error) {
//     console.log("Error calculating average meditation rating:", error);
//     return 0;
//   }
// };

// // Get the highest rated meditation
// export const getHighestRatedMeditation = async () => {
//   try {
//     let highestRatedMeditation = null;
//     let highestRating = 0;

//     // Iterate over the meditation data
//     for (const meditation of MEDITATIONS_DATA) {
//       // Calculate the average rating
//       const averageRating = await getAverageMeditationRating(meditation.title);

//       // Check if the current meditation has a higher rating than the previous highest rated meditation
//       if (averageRating > highestRating) {
//         highestRatedMeditation = meditation;
//         highestRating = averageRating;
//       }
//     }

//     return highestRatedMeditation;
//   } catch (error) {
//     console.log("Error getting highest rated meditation:", error);
//     return null;
//   }
// };
