import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import PracticeHome from "./screens/practices/PracticeHome";
import ProfileScreen from "./screens/profile/ProfileScreen";
import RewardsScreen from "./screens/rewards/RewardsScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { GlobalColors } from "./themes/GlobalColors";
import { createStackNavigator } from "@react-navigation/stack";

const BottomTabs = createBottomTabNavigator();
const Stack = createStackNavigator();

function BtmTabsOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: GlobalColors.primary200,
        },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: "white" },
        tabBarActiveTintColor: GlobalColors.primary300,
      })}
    >
      <BottomTabs.Screen
        name="PracticeHome"
        component={PracticeHome}
        options={{
          title: "Home Screen",
          tabBarLabel: "Practices",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="RewardsScreen"
        component={RewardsScreen}
        options={{
          title: "Rewards",
          tabBarLabel: "Rewards",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="gift-outline" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Profile Page",
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer
        screenOptions={{
          headerStyle: {
            backgroundColor: GlobalColors.primary200,
          },
          headerTintColor: "white",
        }}
      >
        <Stack.Navigator>
          <Stack.Screen
            name="BottomTabsOverview"
            component={BtmTabsOverview}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
