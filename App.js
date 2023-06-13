import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { GlobalColors } from "./themes/GlobalColors";
import { createStackNavigator } from "@react-navigation/stack";
import MeditationsList from "./screens/practices/MeditationsList";
import MeditationDetailScreen from "./screens/practices/MeditationDetailScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PracticeMediaScreen from "./screens/practices/PracticeMediaScreen";
import WelcomeScreen from "./screens/profile/WelcomeScreen";
import BtmTabsOverview from "./screens/BtmTabsOverview";
import PracticeRatingScreen from "./screens/practices/PracticeRatingScreen";
import MoodCheckInScreen from "./screens/profile/MoodCheckInScreen";
import JournalScreen from "./screens/journal/JournalScreen";
import CrochetDetailsScreen from "./screens/practices/CrochetDetailsScreen";
import ProfileScreen from "./screens/profile/ProfileScreen";
import AccountsScreen from "./screens/profile/AccountsScreen";
import PracticeHome from "./screens/practices/PracticeHome";
const Stack = createStackNavigator();

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
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MoodCheckInScreen"
              component={MoodCheckInScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BottomTabsOverview"
              component={BtmTabsOverview}
              options={{ headerShown: false }}
            />
              <Stack.Screen
              name="PracticeHome"
              component={PracticeHome}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MeditationList"
              component={MeditationsList}
              options={{ headerTitle: "Zen Library" }}
            />
            <Stack.Screen name="JournalScreen" component={JournalScreen} />

            <Stack.Screen
              name="MeditationDetailScreen"
              component={MeditationDetailScreen}
              options={{ headerTitle: "Meditation Session Details" }}
            />
            <Stack.Screen
              name="PracticeMediaScreen"
              component={PracticeMediaScreen}
              options={{ headerTitle: "", headerTransparent: true }}
            />
            <Stack.Screen 
              name="ProfileScreen" 
              component={ProfileScreen} 
            />
            <Stack.Screen 
              name="AccountsScreen" 
              component={AccountsScreen} 
            />
            <Stack.Screen
              name="PracticeRatingScreen"
              component={PracticeRatingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CrochetDetailsScreen"
              component={CrochetDetailsScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    </SafeAreaProvider>
  );
};

export default App;
