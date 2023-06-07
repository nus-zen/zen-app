import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './WelcomeScreen.js';
import CreateAccountScreen from './CreateAccountScreen.js';
import LoginScreen from './LoginScreen.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          {/* <Stack.Screen name="CreateAccount" component={CreateAccountScreen} /> */}
          {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
