import React, { useState} from 'react';
import { TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Text, View } from './Themed';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import app from '../firebase';

const auth = getAuth(app);

type FormType = 'login' | 'signup' | null;

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [formType, setFormType] = useState<FormType>(null);
  const [displayName, setDisplayName] = useState('');

  const handleLogin = async () => {
    console.log("Login attempt");
    try {
      await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        if (userCredential.user) {
          setDisplayName(userCredential.user.displayName || 'User');
        }
      });
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
      await createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
        if (userCredential.user) {
          await updateProfile(userCredential.user, { displayName: username });
          setDisplayName(userCredential.user.displayName || 'User');
        } 
        else {
          Alert.alert('Signup Error', 'Unable to find user after signup');
        }
      });
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

  const renderForm = () => {
    switch (formType) {
      case 'login':
        return (
          <>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
          </>
        );
      case 'signup':
        return (
          <>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              value={username}
              placeholder="Username"
            />
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              secureTextEntry
            />
            <Button title="Signup" onPress={handleSignup} />
          </>
        );
      default:
        return (
          <>
            <Button title="Login" onPress={() => setFormType('login')} />
            <Button title="Signup" onPress={() => setFormType('signup')} />
          </>
        );
    }
  };

  return (
    <View>
      {renderForm()}
      {displayName !== '' && (
        <Text style={styles.displayName}>Hello, {displayName}!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    color:'white'
  },
  displayName: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color:'white'
  },
});

export default LoginPage;
