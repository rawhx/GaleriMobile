import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { assets } from "../../assets";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ButtonC } from "../../components";

const Welcome = ({ navigation }) => {
    return (
        <SafeAreaView style={[assets.style.containerFirst]}>
            <View style={[{ padding: 20 }]}>
                <TouchableOpacity onPress={()=>navigation.navigate('Tabs')}>
                    <FontAwesomeIcon icon={faArrowLeft} size={25} />
                </TouchableOpacity>
            </View>
            <View style={[{ justifyContent: 'center', alignItems: 'center', flex: 1, paddingHorizontal: 25 }]}>
                <Image source={assets.images.pictsea} style={{ height: 35, resizeMode: 'contain', marginBottom: 10 }} />
                <Text style={[assets.style.fontMedium]}>Temukan dan unduh ide ide menarik disini!</Text>
                <Image source={assets.images.gambar} style={{ height: 350, aspectRatio: 1 }} />
                <View style={{width: '100%', marginBottom: 20}}>
                    <ButtonC
                        onPress={()=>navigation.navigate('Login')}
                        title='Masuk'
                    />
                </View>
                <View style={{width: '100%'}}>
                    <ButtonC
                        onPress={()=>navigation.navigate('Register')}
                        buttonColor={assets.colors.grey}
                        title='Daftar'
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Welcome