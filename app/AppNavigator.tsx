import { createStackNavigator } from '@react-navigation/stack';
import TabOneScreen from './(tabs)/index'; 
import LoginPage from '../components/LoginPage';
import ProfilePage from '../components/ProfilePage'; 

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name = "Home" component={TabOneScreen} />
      <Stack.Screen name = "Login" component={LoginPage} />
      <Stack.Screen name = "Profile" component={ProfilePage} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
