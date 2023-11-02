// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderIFd: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_IFD,
//   appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export default app;
import firebase, { initializeApp, getApp } from "firebase/app";
import 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
let app : firebase.FirebaseApp
try {
  app = getApp()
} catch(error) {
  const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY, 
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID, 
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderIFd: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_IFD,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
  };
  app = initializeApp(firebaseConfig)

}
// Initialize Firebase


// const provider = new GoogleAuthProvider();

export default app
// export {auth, provider};