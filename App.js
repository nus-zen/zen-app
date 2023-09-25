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
import LoginScreen from "./screens/profile/LoginScreen";
import HRVFeedbackScreen from "./screens/practices/HRVFeedbackScreen";
import DailyStreaksScreen from "./screens/practices/DailyStreaksScreen";
import AccountsScreenProfile from "./screens/profile/AccountsScreenProfile";
import PracticeHome from "./screens/practices/PracticeHome";
import CreateAccountScreen from "./screens/profile/CreateAccountScreen";
import ProfileScreen from "./screens/profile/ProfileScreen";
import RewardsItems from "./screens/rewards/RewardsItems";
import TerrariumDetailScreen from "./screens/practices/TerrariumDetailScreen";
import ZenBandDetailScreen from "./screens/practices/ZenBandDetailScreen";
import MeditationTopTabScreen from "./screens/practices/MeditationTopTabScreen";
import LeagueHomepageScreen from "./screens/rewards/LeagueHomepageScreen";

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
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateAccountScreen"
              component={CreateAccountScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MoodCheckInScreen"
              component={MoodCheckInScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DailyStreaksScreen"
              component={DailyStreaksScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BottomTabsOverview"
              component={BtmTabsOverview}
              options={{ headerShown: false, title: "Home" }}
            />

            <Stack.Screen
              name="PracticeHome"
              component={PracticeHome}
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen
              name="MeditationTopTabScreen"
              component={MeditationTopTabScreen}
            /> */}
            <Stack.Screen
              name="MeditationsList"
              component={MeditationsList}
              options={{ headerTitle: "Zen Library" }}
            />

            <Stack.Screen
              name="JournalScreen"
              component={JournalScreen}
              options={{ headerTitle: "Journal" }}
            />

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
              name="HRVFeedbackScreen"
              component={HRVFeedbackScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProfileScreen"
              component={ProfileScreen}
              options={{ headerTitle: "", headerTransparent: true }}
            />

            <Stack.Screen
              name="AccountsScreenProfile"
              component={AccountsScreenProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PracticeRatingScreen"
              component={PracticeRatingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CrochetDetailsScreen"
              component={CrochetDetailsScreen}
              options={{ headerTitle: "ZenTree"}}
            />
            <Stack.Screen
              name="RewardsItems"
              component={RewardsItems}
              options={{ headerTitle: "My Cart" }}
            />
            <Stack.Screen
              name="TerrariumDetailScreen"
              component={TerrariumDetailScreen}
              options={{ headerTitle: "ZenTerrarium" }}
            />
            <Stack.Screen
              name="ZenBandDetailScreen"
              component={ZenBandDetailScreen}
              options={{ headerTitle: "ZenBand"}}
            />
            <Stack.Screen
              name="LeagueHomepage"
              component={LeagueHomepageScreen}
              options={{ headerTitle: "" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    </SafeAreaProvider>
  );
};

export default App;
