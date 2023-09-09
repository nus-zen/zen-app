import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import PracticeCard from "./PracticeCard";

export default function PracticeRow({ title, cardsData }) {
  return (
    <View>
      <Text style={styles.titleStyle}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator
        persistentScrollbar={true}
      >
        {cardsData.map((item, index) => (
          <PracticeCard
            key={index} // Use a unique key for each item
            uri={item.uri}
            subtitle={item.subtitle}
            title={item.title}
            onPress={item.onPress}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardStyle: {},
});
