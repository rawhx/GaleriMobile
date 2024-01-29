import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Image, Text, View } from "react-native-ui-lib"
import { assets } from "../../assets"
import { ButtonC, container } from ".."
import { useNavigation } from "@react-navigation/native"

const BelumLogin = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={[container.defaultTab, {justifyContent: 'center'}]}>
            <View center>
                <Image source={assets.images.logindulu} style={{
                        width: 200,
                        height: 200,  
                }} />
                <Text style={[assets.fonts.judul, {fontSize: 20}]}>Ups anda belum login!</Text>    
                <Text marginV-10 style={[assets.fonts.default, {textAlign: 'center', paddingHorizontal: 80}]}>Silahkan login terlebih dahulu untuk mengakses lebih fitur kami</Text>  
                <ButtonC 
                    marginV-10 
                    paddingV-10 
                    label="Masuk"
                    borderRadius={10}
                    backgroundColor={assets.colors.button} 
                    onPress={()=>navigation.push("Welcome")}
                />  
            </View>
        </SafeAreaView>
    )
}

export default BelumLogin

