import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { app } from "../firebase"
import { View, Alert, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const auth = getAuth(app)

const SignupPage: React.FC = () => {
    const [isSignedUp, setIsSignedUp] = useState(false);
    const navigation = useNavigation();
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    
    const handleSignup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
                if (userCredential.user) {
                    await updateProfile(userCredential.user, { displayName: username });
                    setIsSignedUp(true);
                    setEmail("")
                    setPassword("")
                    setUsername("")
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
        navigation.navigate('Log in' as never)
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                placeholderTextColor={'black'}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder="Username"
                placeholderTextColor={'black'}
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                placeholderTextColor={'black'}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonContent}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Landing' as never)}>
                <Text style={styles.buttonContent}>Back to landing page</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    },
    displayName: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red'
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
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

export default SignupPage