import {
    View, 
    Text, 
    ImageBackground,
    Button,
    StyleSheet,
    Pressable
} from 'react-native'

import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'


const textFont = 'Arial'


export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Neurosity Crown</Text>
            </View>
            <View>
                <Button style={styles.button} title="Login With Email"></Button>
                <Button style={styles.button} title="Twitter"></Button>
                <Button style={styles.button} title="GitHub"></Button>
                <Button style={styles.button} title="X"></Button>
                <Button style={styles.button} title="Google"></Button>
                <Button style={styles.button} title="Facebook"></Button>
                {/* <Button></Button> */}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#606C38',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 0,
    fontSize: 48, // Subject to change
    alignItems: 'center',
    fontWeight: 'bold',
    color: '#FEFAE0',
    fontFamily: textFont,
  }
});