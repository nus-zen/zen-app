import { StyleSheet, TouchableOpacity } from "react-native";
import { Image, Text, View } from "react-native";

const OnboardingPart = ({ imageSource, text, isLast, navigation }) => {
  const handleButtonPress = () => {
    navigation.navigate("WelcomeScreen");
  };

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.text}> {text} </Text>

      {isLast && (
        <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
          <Text style={styles.buttonText}>Start Zenning</Text>
        </TouchableOpacity>
      )}
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
    padding: 20,
  },
  button: {
    backgroundColor: "green",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default OnboardingPart;
