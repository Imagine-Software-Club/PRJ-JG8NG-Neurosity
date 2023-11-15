// Navigation.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../components/LoginPage';
import HomePage from '../components/HomePage';
import Login from '../app/(tabs)/login';
import EditScreenInfo from '../components/EditScreenInfo';

const Stack = createStackNavigator();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer independent={false}>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="Home" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;


