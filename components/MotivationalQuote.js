import { Text, StyleSheet } from "react-native";

const MotivationalQuote = () => {
  const quotes = [
    "Education is the key to unlock the golden door of freedom.",
    "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
    "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
    "Your education is a dress rehearsal for a life that is yours to lead.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Strive for progress, not perfection.",
    "Believe you can and you're halfway there.",
    "Challenges are what make life interesting and overcoming them is what makes life meaningful.",
    "The expert in anything was once a beginner.",
    "You are capable of more than you know.",
  ];

  // Select a random quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return <Text style={styles.quoteText}>{randomQuote}</Text>;
};

export default MotivationalQuote;
const styles = StyleSheet.create({
  quoteText: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 18,
    backgroundColor: "#D3D3DF",
    padding: 5,
    borderRadius: 1
  },
});
