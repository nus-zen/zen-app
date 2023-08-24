import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Inter-Bold": require("../../assets/fonts/inter-font/Inter-Bold.ttf"),
      });

      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //return emailPattern.test(email);
    return true;
  };

  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email");
      return;
    }
    console.log("Email:", email);
    console.log("Password:", password);
  
    const checkMoodCheckIn = async () => {
      const lastShownTimestamp = await AsyncStorage.getItem("lastShownTimestamp");
      console.log("Last Shown Timestamp:", lastShownTimestamp);
  
      if (!lastShownTimestamp) {
        // First time, show MoodCheckInScreen
        console.log("First time user. Showing MoodCheckInScreen.");
        navigation.navigate("MoodCheckInScreen");
        AsyncStorage.setItem("lastShownTimestamp", new Date().getTime().toString());
      } else {
        // Check if it has been more than 24 hours since the last shown time
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - parseInt(lastShownTimestamp, 10);
        const millisecondsInADay = 24 * 60 * 60 * 1000;
  
        if (timeDifference >= millisecondsInADay) {
          console.log("More than 24 hours. Showing MoodCheckInScreen.");
          navigation.navigate("MoodCheckInScreen");
          AsyncStorage.setItem("lastShownTimestamp", currentTime.toString());
        } else {
          // Less than 24 hours, show BottomTabsOverview
          console.log("Less than 24 hours. Showing BottomTabsOverview.");
          navigation.navigate("BottomTabsOverview");
        }
      }
    };
  
    await checkMoodCheckIn(); // Use await here to properly wait for the async function to complete.
  };

  const handleSignUp = () => {
    navigation.navigate("CreateAccountScreen");
  };

  const handleGoogleLogin = () => {
    Linking.openURL("https://accounts.google.com");
  };

  const handleFacebookLogin = () => {
    Linking.openURL("https://www.facebook.com");
  };

  const handleTwitterLogin = () => {
    Linking.openURL("https://www.twitter.com");
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Image
          source={require("../../assets/LoginScreenBackground.jpg")}
          style={styles.headerImage}
        />
      </View>

      <SafeAreaView style={styles.container}>
        {fontLoaded && (
          <View style={styles.content}>
            <Text style={styles.title}>LOGIN</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="example@gmail.com"
                onChangeText={(text) => setEmail(text)}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="white"
              />
              {emailError ? (
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry
                placeholderTextColor="white"
              />
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.orContainer}>
              <Text style={styles.orText}>Or Continue With</Text>
              <View style={styles.socialButtonsContainer}>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={handleGoogleLogin}
                >
                  <Image
                    source={require("../../assets/social_media/google.png")}
                    style={styles.socialButtonImage}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={handleFacebookLogin}
                >
                  <Image
                    source={require("../../assets/social_media/facebook.png")}
                    style={styles.socialButtonImage}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={handleTwitterLogin}
                >
                  <Image
                    source={require("../../assets/social_media/twitter.png")}
                    style={styles.socialButtonImage}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.signUpText}>
                Don't have an account? Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "flex-end",
  },
  headerImage: {
    width: "100%",
    height: 200,
    resizeMode: "stretch",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 40,
    marginTop: 40,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    marginBottom: 16,
    textAlign: "center",
    color: "black",
    fontFamily: "Inter-Bold",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  input: {
    height: 50,
    borderColor: "#589310",
    borderWidth: 1,
    paddingHorizontal: 60,
    borderRadius: 50,
    backgroundColor: "#589310",
    color: "white",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 4,
  },
  loginButton: {
    backgroundColor: "#589310",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: "flex-end",
    marginTop: 16,
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  orContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  orText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  signUpText: {
    marginTop: 16,
    fontSize: 14,
    textAlign: "center",
    color: "#589310",
    textDecorationLine: "underline",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  socialButton: {
    marginHorizontal: 8,
  },
  socialButtonImage: {
    width: 40,
    height: 40,
  },
});
