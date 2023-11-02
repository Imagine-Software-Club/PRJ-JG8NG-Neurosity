import {
    View, 
    Text, 
    ImageBackground,
    Button,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome6Brands from 'react-native-vector-icons/FontAwesome'

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();


const GoogleSigin = () => {

const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

const textFont = 'Arial'
const ButtonIcon = {
    "Google": (
        <AntDesign 
            name={"google"}
            color='grey'
            size={24}
            style={{marginRight: 10}}
        />
    ),
    "GitHub": (
        <AntDesign 
            name={"github"}
            color='grey'
            size={24}
            style={{marginRight: 10}}
        />
    ), 
    "Facebook": (
        <AntDesign 
            name={"facebook-square"}
            color='grey'
            size={24}
            style={{marginRight: 10}}
        />
    ), 
    "X": (
        <FontAwesome6Brands 
            name={"x-twitter"}
            color='grey'
            size={24}
            style={{marginRight: 10}}
        />
    )
}

const SignInButton = ({ title, handler, icon }: { title: string, handler: any, icon : any}) => {
    return (
        <TouchableOpacity onPress={handler} style={styles.button}>
            {icon}
            <Text>{"Login with " + title}</Text>
        </TouchableOpacity>
    )
}
export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <View style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.title}>Neurosity Crown</Text>
            </View>
            <View style={{flex: 3}}>
                <SignInButton title="Google" handler={GoogleSigin} icon={ButtonIcon.Google}/>
                <SignInButton title="GitHub" handler={GoogleSigin} icon={ButtonIcon.GitHub}/>
                <SignInButton title="Facebook" handler={GoogleSigin} icon={ButtonIcon.Facebook} />
                <SignInButton title="X" handler={GoogleSigin} icon={ButtonIcon.X}/>
            </View>
        </View>
    )
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
    fontSize: 48,
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#FEFAE0',
    fontFamily: textFont,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#B2BEB5',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    width: 200,
    height: 50
  },
});