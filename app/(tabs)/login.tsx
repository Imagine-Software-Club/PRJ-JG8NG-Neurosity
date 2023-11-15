import LoginPage from "../../components/LoginPage";
import { View } from "../../components/Themed";
import { 
    ImageBackground,
    StyleSheet
} from 'react-native'

import { image } from "../../components/LoginPage";

export default function Login() {
    return (
        <ImageBackground source={image} resizeMode="stretch" style={styles.image}>
            <LoginPage/>             
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: 'green',
      backgroundImage: image
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      color:'red'
    },
    displayName: {
      marginTop: 20,
      fontSize: 18,
      fontWeight: 'bold',
      color:'red'
    },
    profilePic: {
      width: 100, 
      height: 100, 
      borderRadius: 50, 
    },
    image: {
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
    }
  });