import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width;
const CARD_HEIGHT = height; // Adjust the card height as needed
const CARDS = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
];

const StreaksScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardContainer}
      >
        {CARDS.map((card) => (
          <View key={card.id} style={styles.card}>
            <Text style={styles.cardText}>{card.text}</Text>
            {card.id === 1 && (
              <View style={styles.greyBox}>
                <Text style={styles.extraText}>Access to Activities</Text>
              </View>
            )}
            {card.id === 2 && (
              <View style={styles.greyBox}>
                <Text style={styles.extraText}>More amazing meditation types</Text>
              </View>
            )}
            {card.id === 2 && (
              <View style={styles.greyBox}>
                <Text style={styles.extraText}>More amazing meditation audio</Text>
              </View>
            )}
            {card.id === 2 && (
              <View style={styles.greyBox}>
                <Text style={styles.extraText}>Free F&amp;B vouchers</Text>
              </View>
            )}
            {card.id === 3 && (
              <View style={styles.greyBox}>
                <Text style={styles.extraText}>More amazing meditation types</Text>
              </View>
            )}
            {card.id === 3 && (
              <View style={styles.greyBox}>
                <Text style={styles.extraText}>More amazing meditation audio</Text>
              </View>
            )}
            {card.id === 3 && (
              <View style={styles.greyBox}>
                <Text style={styles.extraText}>Free F&amp;B vouchers</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    alignItems: 'center', // Center the cards horizontally
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    elevation: 5,
    padding: 20,
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  greyBox: {
    backgroundColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  extraText: {
    fontSize: 16,
  },
});

export default StreaksScreen;
