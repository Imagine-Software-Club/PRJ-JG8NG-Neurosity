import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation()

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setDisplayName('');
      navigation.navigate('Landing' as never)

    }
    catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      }
      else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user: ", user);
      setUser(user);
    });
  }, []);
  const welcomeMessage = user ? `Welcome, ${user.displayName || 'User'}` : 'Welcome to Your App';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{welcomeMessage}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.subtitle}>Enjoy the app's features</Text>

        <TouchableOpacity style={styles.button} onPress={() => console.log('Getting Started')}>
          <Text style={styles.buttonContent}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonContent}>Log out</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  content: {
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B2BEB5',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    height: 50,
  },
  buttonContent: {
    fontSize: 18,
  }
});

export default HomePage;