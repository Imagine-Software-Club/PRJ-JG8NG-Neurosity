import {View, Text, TextInput, Button, ActivityIndicator, KeyboardAvoidingView} from 'react-native'
import React, {useState} from 'react'
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
const login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const authen = auth;

    const signIn = async () => {
        setLoading(true)
        try {
            const response = await signInWithEmailAndPassword(authen,email, password);
            console.log(response)
        }
        catch(error) {
            console.log(error);
            alert("Sign up failed")
        }
        finally {
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true)
        try {
            const response = await createUserWithEmailAndPassword(authen, email, password);
            console.log(response)
        }
        catch(error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <View>
            <KeyboardAvoidingView behavior="padding">

                
                <TextInput value={email} placeholder="Email"
                onChangeText={(text) => setEmail(text)}></TextInput>

                <TextInput value={password} placeholder="password"
                onChangeText={(text) => setPassword(text)}></TextInput>

                {loading ? (<ActivityIndicator size='large' />
                ):( <>
                <Button title="Login" onPress={signIn}/>
                <Button title="Create account" onPress={signUp}/>
                </>
                )}

            </KeyboardAvoidingView>
        </View>
    );
};
export default login;