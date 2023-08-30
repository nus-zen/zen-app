import React from "react";
import { Image, View, Text, StyleSheet, Pressable } from "react-native";

export default function PracticeCard({ uri, subtitle, title, onPress }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) =>
          pressed ? [styles.card, styles.pressedCard] : styles.card
        }
        onPress={onPress}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: uri }} style={styles.image} />
        </View>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.title}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 200,
    marginBottom: 10,
    marginRight: 10,
  },
  card: {
    elevation: 5,
    backgroundColor: "white",
    shadowRadius: 10,
    borderRadius: 10,
    overflow: "hidden",
    flex: 1,
  },
  pressedCard: {
    opacity: 0.75,
  },
  image: {
    width: 200,
    height: 150,
    resizeMode: "cover",
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 3,
    fontWeight: "300",
    fontSize: 16,
    paddingHorizontal: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    paddingHorizontal: 8,
    paddingBottom: 10,
  },
  imageContainer: {
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
});
