import { Image, SafeAreaView, Text } from "react-native"
import { assets } from "../../assets"
import ButtonC from "../button"

const NotSignIn = ({navigation}) => {
    return (
        <SafeAreaView style={[assets.style.container, { justifyContent: 'center', alignItems: 'center', paddingHorizontal: 25 }]}>
            <Image source={assets.images.logindulu} style={{
                width: 200,
                height: 200,  
            }} />
            <Text style={[assets.style.fontBold, {fontSize: 20}]}>Ups anda belum login!</Text>    
            <Text style={[assets.style.fontMedium, {textAlign: 'center'}]}>Silahkan login terlebih dahulu untuk mengakses lebih fitur kami</Text>    
            <ButtonC 
                style={{ width: '50%', height: 'auto', marginTop: 20 }}
                title='Masuk'
                onPress={()=>navigation.navigate('Login')}
            />
        </SafeAreaView>
    )
}

export default NotSignIn