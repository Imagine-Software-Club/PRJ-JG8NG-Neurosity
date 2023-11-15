import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text } from './Themed';
import { getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import { app } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const auth = getAuth(app);

const LoginPage: React.FC = () => {
  const navigation = useNavigation();
  const defaultPhotoPath: string = '../assets/images/default_profile_pic.png';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setDisplayName(user.displayName || 'User');
        setProfilePic(user.photoURL || defaultPhotoPath);
      } else {
        setIsLoggedIn(false);
        setProfilePic(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        if (userCredential.user) {
          setIsLoggedIn(true);
          setDisplayName(userCredential.user.displayName || 'User');
          setEmail("")
          setPassword("")
          navigation.navigate('Home' as never);

        }
      });
    }
    catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', "Please sign up first or make sure your email and password are correct");
      }
      else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    }
  };


  const handleProfilePicUpload = async (imageBlob: Blob) => {
    const storage = getStorage(app, 'gs://neurosity-crown.appspot.com');
    if (auth.currentUser) {
      const storageRef = ref(storage, 'profile_pics/' + auth.currentUser.uid);
      try {
        await uploadBytes(storageRef, imageBlob);
        const photoURL = await getDownloadURL(storageRef);
        await updateProfile(auth.currentUser, { photoURL });
        setProfilePic(photoURL);
      }
      catch (error) {
        Alert.alert('Error', 'There was an error uploading the image');
      }
    }
    else {
      Alert.alert('Error', 'No user is currently signed in');
    }
  };

  const selectImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      }
      else if (response.assets && response.assets.length > 0) {
        const selectedAsset = response.assets[0];
        //const source = { uri: selectedAsset.uri };
        uriToBlob(selectedAsset.uri!)
          .then(blob => {
            handleProfilePicUpload(blob);
          })
          .catch(error => {
            Alert.alert('Error', 'Failed to convert the image to a blob');
            console.error(error);
          });
      }
    });
  };

  const uriToBlob = (uri: string): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      fetch(uri)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.blob();
        })
        .then(blob => {
          resolve(blob);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  // if (isLoggedIn) {
  //   return (
  //     <>
  //       <Text style={styles.displayName}>Hello, {displayName}!</Text>
  //       <Image
  //         source={profilePic ? { uri: profilePic } : require(defaultPhotoPath)}
  //         style={styles.profilePic}
  //       />
  //       <TouchableOpacity onPress={selectImage}>
  //         <Text style={styles.text}>Upload Profile Picture</Text>
  //       </TouchableOpacity>
  //       <Button title="Logout" onPress={handleLogout} />
  //     </>
  //   );
  // }
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
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        placeholderTextColor={'black'}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonContent}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign up' as never)}>
        <Text style={styles.buttonContent}>Go to sign up</Text>
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
    color: 'black'
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
    color: 'black'
  },
  text: {
    color: 'black'
  }
});

export default LoginPage