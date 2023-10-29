import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import PracticeRow from "../../components/PracticeRow";
import MotivationalQuote from "../../components/MotivationalQuote";
import { PracticeHomeScreenData } from "../../data/PracticeHomeScreenData";
import PracticeModal from "../../components/PracticeModal";
import { useState, useEffect } from "react";
import Tooltip from "react-native-walkthrough-tooltip";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PracticeHome({ navigation }) {
  const HOME_PAGE_DATA = PracticeHomeScreenData(navigation);

  // const checkFirstVisit = async () => {
  //   try {
  //     const hasVisited = await AsyncStorage.getItem("hasVisitedPracticeHome");
  //     console.log("hasVisited:", hasVisited);
  //     if (!hasVisited) {
  //       console.log("Tooltips for PracticeHome.js will be shown for first time user.");
  //       showToolTips();
  //       await AsyncStorage.setItem("hasVisitedPracticeHome", "true");
  //     }
  //   } catch (error) {
  //     console.error("Error checking First Visit:", error);
  //   }
  // };

  const [practiceTooltipVisible, setPracticeTooltipVisible] = useState(false);
  const [zenBoxTooltipVisible, setZenBoxTooltipVisible] = useState(false);
  const [quoteToolTipVisible, setQuoteToolTipVisible] = useState(false);

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [helpToolTipVisible, sethelpToolTipVisible] = useState(false);

  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  const showToolTips = () => {
    setPracticeTooltipVisible(true);

    // clear AsyncStorage for all other tooltips
    AsyncStorage.removeItem("hasVisitedJournal");
    AsyncStorage.removeItem("hasVisitedCrochet");
    AsyncStorage.removeItem("hasVisitedMeditationDetail");
    AsyncStorage.removeItem("hasVisitedMeditationsList");
    AsyncStorage.removeItem("hasVisitedRewards");
  };

  const onPressLearnMore = () => {
    navigation.navigate("CrochetDetailsScreen");
  };

  const showRandomModal = () => {
    const randomNumber = Math.random(); // Generate a random number between 0 and 1
    console.log("value of RNG for modal:", randomNumber);

    // If the generated random number is less than 0.3 (30% chance), show the modal
    if (randomNumber < 0.3) {
      console.log("modal will be shown!");
      setBottomSheetVisible(true);
    }
  };

  // UseEffect hook to show the modal randomly when the component mounts (i.e., user enters the home screen)
  useEffect(() => {
    //checkFirstVisit();
    showRandomModal();

    // Cleanup function to clear any timers when the component unmounts
    return () => {
      // Add any cleanup logic here if necessary
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <View style={styles.rootContainer}>
      <Tooltip
        isVisible={quoteToolTipVisible}
        content={
          <Text>
            This is where you see motivational quotes to give you a boost!
          </Text>
        }
        showChildInTooltip={false}
        placement="bottom"
        onClose={() => {
          setQuoteToolTipVisible(false);
          sethelpToolTipVisible(true);
        }}
      >
        <MotivationalQuote />
      </Tooltip>

      <ScrollView>
        <Tooltip
          isVisible={practiceTooltipVisible}
          content={
            <Text>
              This is where you can access practices to help you get to a zen
              state.
            </Text>
          }
          placement="bottom"
          onClose={() => {
            setPracticeTooltipVisible(false);
            setZenBoxTooltipVisible(true);
          }}
          allowChildInteraction={false}
        >
          <PracticeRow
            title="Practices"
            cardsData={HOME_PAGE_DATA.slice(0, 2)}
          />
        </Tooltip>

        <Tooltip
          isVisible={zenBoxTooltipVisible}
          content={
            <Text>
              This is where you can learn more about what comes in the Zen Box!
            </Text>
          }
          placement="top"
          allowChildInteraction={false}
          onClose={() => {
            setZenBoxTooltipVisible(false);
            setQuoteToolTipVisible(true);
          }}
        >
          <PracticeRow title="Zen Box" cardsData={HOME_PAGE_DATA.slice(2, 5)} />
        </Tooltip>

        {/* <Button
          title="Show Bottom Sheet"
          onPress={() => setBottomSheetVisible(true)}
        /> */}
      </ScrollView>

      <Tooltip
        isVisible={helpToolTipVisible}
        content={
          <Text>
            Click the help button and restart the app, if you want to see all
            the tooltips again.
          </Text>
        }
        placement="left"
        onClose={() => {
          sethelpToolTipVisible(false);
        }}
        allowChildInteraction={false}
      >
        <TouchableOpacity style={styles.helpButton} onPress={showToolTips}>
          <Text>Help</Text>
        </TouchableOpacity>
      </Tooltip>

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
  helpButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
  },
});
