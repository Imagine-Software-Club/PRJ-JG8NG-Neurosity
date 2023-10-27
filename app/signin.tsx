import app from '../firebase';
import firebase from 'firebase/app';
import { GoogleSignin } from 'firebase/auth';
import { GoogleSigninButton } from 'react-native-firebaseui';
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth(app);

const GoogleAuthButton = () => {
  const signInWithGoogle = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      // User is signed in
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GoogleSigninButton
      style={{ width: 192, height: 48 }}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Light}
      onPress={signInWithGoogle}
    />
  );
};

export default GoogleAuthButton;
