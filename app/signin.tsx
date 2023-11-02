import {View, Button} from 'react-native'

export default function GoogleSignInButton({promptAsync} : {promptAsync:() => void}) {
  return (
    <View>
      <Button title='Sign in with Google' onPress={() => promptAsync()}></Button>
    </View>
  )
}