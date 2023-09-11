import { View, StyleSheet, Button } from "react-native";
import PracticeRow from "../../components/PracticeRow";
import MotivationalQuote from "../../components/MotivationalQuote";
import { PracticeHomeScreenData } from "../../data/PracticeHomeScreenData";
import PracticeModal from "../../components/PracticeModal";
import { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import ThumbsRating from "../../components/ThumbsRating";

export default function PracticeHome({ navigation }) {
  const HOME_PAGE_DATA = PracticeHomeScreenData(navigation);

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  const onPressLearnMore = () => {
    navigation.navigate("CrochetDetailsScreen");
  };

  const showRandomModal = () => {
    const randomNumber = Math.random(); // Generate a random number between 0 and 1
    console.log(randomNumber);

    // If the generated random number is less than 0.3 (30% chance), show the modal
    if (randomNumber < 0.3) {
      console.log("modal will be shown!");
      setBottomSheetVisible(true);
    }
  };

  // UseEffect hook to show the modal randomly when the component mounts (i.e., user enters the home screen)
  useEffect(() => {
    showRandomModal();

    // Cleanup function to clear any timers when the component unmounts
    return () => {
      // Add any cleanup logic here if necessary
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <View style={styles.rootContainer}>
      <MotivationalQuote />
      <ScrollView>
        <PracticeRow title="Practices" cardsData={HOME_PAGE_DATA.slice(0, 2)} />

        <PracticeRow title="Zen Box" cardsData={HOME_PAGE_DATA.slice(2, 5)} />

        {/* <Button
          title="Show Bottom Sheet"
          onPress={() => setBottomSheetVisible(true)}
        /> */}
      </ScrollView>
      <PracticeModal
        isVisible={bottomSheetVisible}
        onClose={closeBottomSheet}
        onPressLearnMore={onPressLearnMore}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    marginTop: 20,
  },
});
