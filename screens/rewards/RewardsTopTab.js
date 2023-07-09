import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import RewardsScreen from './RewardsScreen';
import StreaksScreen from './StreaksScreen';

const TopTabs = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <TopTabs.Navigator
      screenOptions={{
        
        tabBarActiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: 'green',
          height: 80,
        },
        tabBarLabelStyle: {
          marginTop: 40, // Adjust the marginTop value as needed
        },
      }}
    >
      <TopTabs.Screen
        name="Home"
        component={RewardsScreen}
        options={{
          title: 'Rewards',
          tabBarLabel: 'Rewards',
        }}
      />
      <TopTabs.Screen
        name="Settings"
        component={StreaksScreen}
        options={{
          title: 'Streaks',
          tabBarLabel: 'Streaks',
        }}
      />
    </TopTabs.Navigator>
  );
}
