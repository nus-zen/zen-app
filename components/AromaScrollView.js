import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";

export default function AromaScrollView() {

  const aromas = [
    {
      name: "Jasmine",
      subtitle: "Antidepressant & Sedative",
      description: "Studies show that Jasmine can improve mood and brain activity, and could be useful for relieving depression and improving mood. Jasmine can also soothe anxiety by bringing down the elevated state of mind and improve symptoms such as insomnia, palpitations and irritability.",
      image: require("../assets/scents/jasmine.png"),
    },
    {
      name: "Lavender",
      subtitle: "Antidepressant & Sedative",
      description: "Studies show that Lavender can be used to alleviate symptoms for people suffering from insomnia and anxiety. It aids with better sleep and lower scores of depression and stress. View the link below for more information on the benefits of Lavender.",
      image: require("../assets/scents/lavender.png"),
    },
    {
      name: "Eucalyptus",
      subtitle: "Relaxation & Breathing",
      description: "Eucalytpus is widely believed to decrease symptoms of stress. A study showed that it lowered blood pressure for patients, suggesting that it promotes relaxation. It can also help clear respiratory tracts for easier breathing.",
      image: require("../assets/scents/eucalyptus.png"),
    },
    {
      name: "Sandalwood",
      subtitle: "Managing Mental Health",
      description: "Sandalwood has been used widely in traditional Indian and Chinese medicine. It can help to manage mental disorders and other ailments such as the common cold and liver problems.",
      image: require("../assets/scents/sandalwood.png"),
    },
    {
      name: "Ylang Ylang",
      subtitle: "Mood Booster & Antidepressant",
      description: "Studies show that Ylang Ylang reduced anxiety and boosted self-esteem when inhaled. It can also reduce blood pressure, which suggests that it has a sedative effect. View the link below to learn more about Ylang Ylang’s benefits!",
      image: require("../assets/scents/ylangx2.png"),
    },
    {
      name: "Clary Sage",
      subtitle: "Stress Reduction & Antidepressant",
      description: "Aromatherapy with Clary Sage uses the power of scent to calm the mind and reduce feelings of anxiety. It can elicit feelings of relaxation. A study showed that Clary Sage oil can reduce cortisol, a stress hormone, acting like an antidepressant.",
      image: require("../assets/scents/clarysage.png"),
    },
  ];


  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {aromas.map((aroma, index) => (
        <View key={index} style={styles.card}>
          <Image source={aroma.image} style={styles.image} />
          <Text style={styles.title}>{aroma.name}</Text>
          <Text style={styles.subtitle}>{aroma.subtitle}</Text>
          <Text style={styles.description}>{aroma.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  card: {
    width: 200,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    textAlign: "justify",
  },
});
