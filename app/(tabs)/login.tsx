import GoogleSignInButton from "../signin";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google"
import {GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithCredential} from 'firebase/auth';
import app from "D:/Minh/PRJ-JG8NG-Neurosity/firebase";
import * as React from 'react'


const auth = getAuth(app)

WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    // iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    // androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    redirectUri: process.env.EXPO_PUBLIC_GOOGLE_AUTHORIZED_REDIRECT_URI
  })

  React.useEffect(() => {
    if (response?.type === 'success') {
      const {id_token} = response.params
      const credential = GoogleAuthProvider.credential(id_token)
      signInWithCredential(auth, credential)
    }
  },[response])

  // React.useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, async(user) => {
  //     if (user) {
  //       console.log(JSON.stringify(user,null,2))
  //     } else {
  //       console.log("Failed")
  //     }
  //   })

  //   return () => unsub()
  // },[])

  return <GoogleSignInButton promptAsync={promptAsync}/>
}