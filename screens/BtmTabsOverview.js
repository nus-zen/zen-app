import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PracticeHome from "../screens/practices/PracticeHome";
import ProfileScreen from "../screens/profile/ProfileScreen";
import RewardsScreen from "../screens/rewards/RewardsScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { GlobalColors } from "../themes/GlobalColors";

const BottomTabs = createBottomTabNavigator();

export default function BtmTabsOverview() {
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
