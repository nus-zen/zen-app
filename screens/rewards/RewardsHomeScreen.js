import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import RewardsTopTab from './RewardsTopTab';

const Stack = createStackNavigator();

export default function RewardsHomeScreen() {
  return (
    <SafeAreaProvider>
      <>
        <StatusBar style="auto" />
        <Stack.Navigator>
          <Stack.Screen
            name="RewardsTopTab"
            component={RewardsTopTab}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </>
    </SafeAreaProvider>
  );
}