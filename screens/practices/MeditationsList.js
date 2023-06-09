import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import MeditationCard from "../../components/MeditationCard";

export default function MeditationsList({ navigation }) {
  const meditations = [
    {
      title: "Exam Success - Visualization",
      subtitle: "Duration: 10 minutes",
      imageSource: "https://cdn-icons-png.flaticon.com/512/2755/2755437.png",
      description:
        "This visualization meditation helps university students calm their minds and reduce exam-related stress. It focuses on enhancing focus, concentration, and confidence for better exam performance.",
      duration: "10 minutes",
      rationale:
        "By practicing this visualization meditation, university students can cultivate a positive mindset, reduce anxiety, and improve their overall well-being during the exam period.",
    },
    {
      title: "Relationship Harmony - Loving-Kindness",
      subtitle: "Duration: 15 minutes",
      imageSource:
        "https://static.wixstatic.com/media/4aa710_c3fb6fa3be6e492bbfc293414b8b0890~mv2.jpg/v1/fill/w_640,h_452,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/4aa710_c3fb6fa3be6e492bbfc293414b8b0890~mv2.jpg",
      description:
        "The Loving-Kindness meditation for relationship harmony focuses on fostering compassion, understanding, and empathy in relationships. It helps university students navigate relationship challenges, improve communication, and promote emotional well-being.",
      duration: "15 minutes",
      rationale:
        "As university students, maintaining healthy relationships is essential for overall happiness and success. This Loving-Kindness meditation supports students in cultivating harmonious and fulfilling connections.",
    },
    {
      title: "Stress Relief - Body Scan",
      subtitle: "Duration: 20 minutes",
      imageSource:
        "https://creakyjoints.org/wp-content/uploads/2019/01/0119_Meditation-1024x683.jpg",
      description:
        "The Body Scan meditation for stress relief is designed to help university students manage the pressures and demands of academic life. It provides techniques to relax the mind, release tension, and restore inner calm.",
      duration: "20 minutes",
      rationale:
        "University students often experience high levels of stress. This Body Scan meditation offers effective strategies to reduce stress, enhance resilience, and promote mental well-being.",
    },
    {
      title: "Focus Enhancement - Mindfulness",
      subtitle: "Duration: 12 minutes",
      imageSource:
        "https://i0.wp.com/www.additudemag.com/wp-content/uploads/2022/04/Calming-Triggered-Emotions-Saunders_1920x1080.jpg",
      description:
        "The Mindfulness meditation for focus enhancement helps university students improve their concentration and attention. It involves being fully present in the moment and cultivating awareness of thoughts and sensations.",
      duration: "12 minutes",
      rationale:
        "Maintaining focus is crucial for academic success. This Mindfulness meditation assists university students in developing a clear and focused mind, enhancing productivity and learning.",
    },
    {
      title: "Emotional Balance - Breath Awareness",
      subtitle: "Duration: 15 minutes",
      imageSource:
        "https://img.freepik.com/free-vector/breathing-exercise-concept-illustration_114360-8920.jpg?w=2000",
      description:
        "The Breath Awareness meditation for emotional balance helps university students regulate their emotions and cultivate inner peace. It involves observing the breath and developing a calm and balanced state of mind.",
      duration: "15 minutes",
      rationale:
        "University life can be emotionally challenging. This Breath Awareness meditation provides tools to manage emotions, reduce reactivity, and promote emotional well-being.",
    },
    {
      title: "Self-Compassion - Loving-Kindness",
      subtitle: "Duration: 10 minutes",
      imageSource:
        "https://adaa.org/sites/default/files/2021-09/iStock-1212570526%20self%20compassion%20purchased_2.jpg",
      description:
        "The Loving-Kindness meditation for self-compassion encourages university students to extend compassion and kindness to themselves. It helps cultivate self-acceptance, self-care, and resilience.",
      duration: "10 minutes",
      rationale:
        "University students often face high expectations and self-criticism. This Loving-Kindness meditation supports students in developing self-compassion, fostering a positive relationship with themselves.",
    },
  ];

  function meditationPressHandler(meditation) {
    return () => {
      navigation.navigate("MeditationDetailScreen", meditation);
    };
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {meditations.map((meditation, index) => (
          <View key={index} style={styles.cardContainer}>
            <MeditationCard
              title={meditation.title}
              subtitle={meditation.subtitle}
              imageSource={{ uri: meditation.imageSource }}
              onPress={meditationPressHandler(meditation)}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 8,
  },
  scrollContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingTop: 16,
  },
  cardContainer: {
    width: Dimensions.get("window").width / 2 - 24,
    marginBottom: 16,
    alignItems: "center",
  },
});
