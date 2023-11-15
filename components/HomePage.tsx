import { User, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth } from '../firebase';

const HomePage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user: ", user);
      setUser(user);
    });
  },[]);
  const welcomeMessage = user ? `Welcome, ${user.email || 'User'}` : 'Welcome to Your App';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{welcomeMessage}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.subtitle}>Enjoy the app's features</Text>
        <Button title="Get Started" onPress={() => console.log('Getting Started')} />
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
});

export default HomePage;