import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import UploadImage from "../../components/UploadImage";
import MoodCalendar from "../../components/MoodCalendar";
import AccountsScreen from "../../screens/profile/AccountsScreenProfile";
import StatisticsComponent from "../../components/ProfileScreenBestActivitiesStats";
import ScrollableContent from "../../components/ActivitiesCompletedScrollableContent";
import ActivityLog from "../../components/ActivityLog";
import { getAuth, signOut } from "firebase/auth";
// import NotificationsButton from "../../components/NotificationsButton"; implement when firebase is activated
//import ReminderButton from "../../components/ReminderButton"; implement when firebase is activated

export default function ProfileScreen({ navigation }) {
  function navigateToAccounts() {
    navigation.navigate("AccountsScreenProfile");
  }

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigation.navigate("WelcomeScreen");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.uploadContainer}>
          <View style={styles.uploadButtonContainer}>
            <UploadImage />
          </View>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={navigateToAccounts}
          >
            <Image
              source={require("../../assets/Settings.png")}
              style={styles.settingsIcon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
        <Text style={{ marginVertical: 20, fontSize: 16 }}>GOAT</Text>
        <StatisticsComponent />
        <ScrollableContent />
        <ActivityLog />
        <MoodCalendar />
        {/* <NotificationsButton /> */}
        {/* <ReminderButton /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 40,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
    paddingHorizontal: 20,
  },
  uploadButtonContainer: {
    flex: 1,
    alignItems: "center",
  },
  settingsContainer: {
    marginLeft: "auto",
  },
  settingsIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
