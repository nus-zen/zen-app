import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import PracticeRow from "../../components/PracticeRow";
import MotivationalQuote from "../../components/MotivationalQuote";
import { PracticeHomeScreenData } from "../../data/PracticeHomeScreenData";
import PracticeModal from "../../components/PracticeModal";
import { useState } from "react";

export default function PracticeHome({ navigation }) {
  const HOME_PAGE_DATA = PracticeHomeScreenData(navigation);

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  const onPressLearnMore = () => {
    navigation.navigate("CrochetDetailsScreen");
  };

  return (
    <View style={styles.rootContainer}>
      <MotivationalQuote />
      <ScrollView>
        <PracticeRow
          title="Meditation"
          cardsData={HOME_PAGE_DATA.slice(0, 1)}
        />
        <PracticeRow
          title="Journaling"
          cardsData={HOME_PAGE_DATA.slice(1, 2)}
        />
        <PracticeRow title="Zen Box" cardsData={HOME_PAGE_DATA.slice(2, 5)} />

        <Button
          title="Show Bottom Sheet"
          onPress={() => setBottomSheetVisible(true)}
        />
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
