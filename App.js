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
        headerStyle: { backgroundColor: GlobalColors.primary200 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalColors.primary200 },
        tabBarActiveTintColor: GlobalColors.accent,
      })}
    >
      <BottomTabs.Screen
        name="Practice Home"
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
        name="Rewards Screen"
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
        name="Profile Screen"
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


const App = () => {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer
        screenOptions={{
          headerStyle: { backgroundColor: GlobalColors.primary200 },
          headerTintColor: "white",
        }}
      >
        <Stack.Navigator>
          <Stack.Screen
            name="Bottom Tabs Overview"
            component={BtmTabsOverview}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;