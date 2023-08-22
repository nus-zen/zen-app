import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MeditationsList from "./MeditationsList";
import TerrariumDetailScreen from "./TerrariumDetailScreen";

const Tab = createMaterialTopTabNavigator();

export default function MeditationTopTabScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="MeditationsList" component={MeditationsList} />
      <Tab.Screen
        name="TerrariumDetailScreen"
        component={TerrariumDetailScreen}
      />
    </Tab.Navigator>
  );
}
