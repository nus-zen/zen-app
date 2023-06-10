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
import MeditationsList from "./screens/practices/MeditationsList";
import MeditationDetailScreen from "./screens/practices/MeditationDetailScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PracticeMediaScreen from "./screens/practices/PracticeMediaScreen";
import WelcomeScreen from "./screens/profile/WelcomeScreen";

const BottomTabs = createBottomTabNavigator();
const Stack = createStackNavigator();

function BtmTabsOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={() => ({
        headerShown: false,
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


const App = () => {
  return (
    <SafeAreaProvider>
      <>
        <StatusBar style="auto" />
        <NavigationContainer
          screenOptions={{
            headerShown: false,
            headerStyle: {
              backgroundColor: GlobalColors.primary200,
            },
            headerTintColor: "white",
          }}
        >
          <Stack.Navigator>
            <Stack.Screen 
              name="WelcomeScreen" 
              component={WelcomeScreen} 
            />
            <Stack.Screen
              name="BottomTabsOverview"
              component={BtmTabsOverview}
              options={{ headerShown: false }}
            />

            <Stack.Screen 
              name="MeditationList" 
              component={MeditationsList} 
            />

            <Stack.Screen
              name="MeditationDetailScreen"
              component={MeditationDetailScreen}
            />
            <Stack.Screen
              name="PracticeMediaScreen"
              component={PracticeMediaScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    </SafeAreaProvider>
  );
};

export default App;