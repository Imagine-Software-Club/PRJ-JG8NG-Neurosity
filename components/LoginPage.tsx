import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); 

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
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

  const handleSignup = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      const user = auth().currentUser;
      if (user) {
        await user.updateProfile({ displayName: username });
      } 
      else {
        Alert.alert('Error', 'User not found');
      }
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

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        onChangeText={setUsername}
        value={username}
        placeholder="Username"
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
}
