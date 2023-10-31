import { StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../AppNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import EditScreenInfo from '../../components/EditScreenInfo';
import AppNavigator from '../AppNavigator';
import { Text, View } from '../../components/Themed';

type TabOneScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>; 

const TabOneScreen: React.FC = () => {
  const navigation = useNavigation<TabOneScreenNavigationProp>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <Button 
        title="Login" 
        onPress={() => navigation.navigate('Login')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default TabOneScreen;