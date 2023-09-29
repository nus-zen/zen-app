import { StyleSheet } from "react-native";
import { Image, Text, View } from "react-native";

const OnboardingPart = ({ imageSource, text }) => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.text}> {text} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200, // Adjust the width as needed
    height: 200, // Adjust the height as needed
    resizeMode: "contain", // Adjust the resizeMode as needed
    marginBottom: 20, // Add spacing between image and text
  },
  text: {
    fontSize: 20, // Adjust the font size as needed
    textAlign: "center", // Center the text
  },
});

export default OnboardingPart;
