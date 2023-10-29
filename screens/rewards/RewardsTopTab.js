import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import RewardsScreen from "./RewardsScreen";
import LeagueHomepageScreen from "./LeagueHomepageScreen";
import VouchersScreen from "./VouchersScreen";

const TopTabs = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <TopTabs.Navigator
      screenOptions={{
        swipeEnabled: false,
        tabBarActiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "green",
          height: 80,
        },
        tabBarLabelStyle: {
          marginTop: 40, // Adjust the marginTop value as needed
        },
      }}
    >
      <TopTabs.Screen
        name="RewardsScreen"
        component={RewardsScreen}
        options={{
          title: "Rewards",
          tabBarLabel: "Rewards",
        }}
      />
      <TopTabs.Screen
        name="VouchersScreen"
        component={VouchersScreen}
        options={{
          title: "Vouchers",
          tabBarLabel: "Vouchers",
        }}
      />
      <TopTabs.Screen
        name="LeagueHomepageScreen"
        component={LeagueHomepageScreen}
        options={{
          title: "League",
          tabBarLabel: "League",
        }}
      />
    </TopTabs.Navigator>
  );
}
