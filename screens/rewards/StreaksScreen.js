import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width;
const CARD_HEIGHT = height; // Adjust the card height as needed

const CARDS = [
  { id: 1, image: require('../../assets/shield-streaks/green_shield.png')},
  { id: 2, image: require('../../assets/shield-streaks/red_shield.png')},
  { id: 3, image: require('../../assets/shield-streaks/y_shield.png')},
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
            <Image source={card.image} style={styles.cardImage} />
            <Text style={styles.cardText}>{card.text}</Text>
            {card.id === 1 && (
              <View style={styles.greyBox}>
                <Text style={styles.extraText}>Access to Activities</Text>
              </View>
            )}
            {card.id === 2 && (
              <View>
                <View style={styles.greyBox}>
                  <Text style={styles.extraText}>More amazing meditation types</Text>
                </View>
                <View style={styles.greyBox}>
                  <Text style={styles.extraText}>More amazing meditation audio</Text>
                </View>
                <View style={styles.greyBox}>
                  <Text style={styles.extraText}>Free F&B vouchers</Text>
                </View>
              </View>
            )}
            {card.id === 3 && (
              <View>
                <View style={styles.greyBox}>
                  <Text style={styles.extraText}>More amazing meditation types</Text>
                </View>
                <View style={styles.greyBox}>
                  <Text style={styles.extraText}>More amazing meditation audio</Text>
                </View>
                <View style={styles.greyBox}>
                  <Text style={styles.extraText}>Free F&B vouchers</Text>
                </View>
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
  cardImage: {
    width: 100, // Adjust the image width as needed
    height: 100, // Adjust the image height as needed
    marginBottom: 10,
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
