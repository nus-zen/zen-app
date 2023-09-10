import { FlatList, StyleSheet, Text, View } from "react-native";
import PracticeCard from "./PracticeCard";

export default function PracticeRow({ title, cardsData }) {
  return (
    <View>
      <Text style={styles.titleStyle}>{title}</Text>
      <FlatList
        data={cardsData}
        renderItem={({ item }) => (
          <PracticeCard
            uri={item.uri}
            subtitle={item.subtitle}
            title={item.title}
            onPress={item.onPress}
          />
        )}
        // horizontal
        numColumns={2}
      />
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
