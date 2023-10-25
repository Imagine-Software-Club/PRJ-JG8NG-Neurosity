import {
    View, 
    Text, 
    ImageBackground,
    Button,
    StyleSheet
} from 'react-native'





const LogIn = () => {
    return (
        <View>
            <ImageBackground source={require('../../assets/images/background.png')} >
                <View>
                    <Text>Neurosity Crown</Text>
                </View>
                <View>
                    {/* <Button></Button> */}
                </View>
            </ImageBackground>
        </View>
    )
}

export default LogIn

const styles = StyleSheet.create({

})