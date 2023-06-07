import { View, Text, StyleSheet, ScrollView } from "react-native";
import PracticeCard from "../../components/PracticeCard";

export default function PracticeHome({ navigation, route }) {
  return (
    <View style={styles.rootContainer}>
      <ScrollView>
        <Text style={styles.quoteText}>
          "Believe in yourself and all that you are, Know that there is
          something inside you that is greater than any obstacle."
        </Text>
        <Text> Title </Text>
        <PracticeCard
          uri="https://media.istockphoto.com/id/1140322066/vector/man-meditating-in-nature-and-leaves-concept-illustration-for-yoga-meditation-relax.jpg?s=612x612&w=0&k=20&c=p8mdgXLR1O-ROYVjGWdPe56gTGr2srICaC9cdbe4-tM="
          subtitle="Choose from a list of meditations."
          title="Meditation"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  quoteText: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 18,
  },
});
