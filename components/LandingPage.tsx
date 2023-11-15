import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { View } from './Themed';

const LandingPage: React.FC = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Neurosity Crown</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Log in' as never)}>
                <Text style = {styles.buttonContent}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign up' as never)}>
                <Text style = {styles.buttonContent}>Sign up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#606C38',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 40,
        justifyContent: 'center',
        fontWeight: 'bold',
        color: '#FEFAE0',
        marginBottom: 20
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B2BEB5',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        width: 200,
        height: 50,
    },
    buttonContent: {
        fontSize: 20
    }
});

export default LandingPage