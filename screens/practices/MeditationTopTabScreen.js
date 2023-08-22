import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MeditationsList from "./MeditationsList";

const Tab = createMaterialTopTabNavigator();

export default function MeditationTopTabScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="MeditationsList" component={MeditationsList} />
      <Tab.Screen
        name="MeditationsListFavOnly"
        component={MeditationsList}
        initialParams={{ showFavOnly: true }}
      />
    </Tab.Navigator>
  );
}
