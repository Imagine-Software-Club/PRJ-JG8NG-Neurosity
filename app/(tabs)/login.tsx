import {
    View, 
    Text, 
    ImageBackground,
    Button,
    StyleSheet
} from 'react-native'


const textFont = 'Arial'


export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Neurosity Crown</Text>
            </View>
            <View>
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
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    alignItems: 'center',
    fontWeight: 'bold',
    color: '#FEFAE0',
    fontFamily: textFont,
  }
});