// Navigation.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../components/LoginPage';
import HomePage from '../components/HomePage';
import SignupPage from '../components/SignupPage';
import LandingPage from '../components/LandingPage';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name='Landing' component={LandingPage} options={{headerShown: false}}/>
        <Stack.Screen name='Sign up' component={SignupPage} options={{headerShown: false}}/>
        <Stack.Screen name="Log in" component={LoginPage} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={HomePage} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};



