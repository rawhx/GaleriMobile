import React, { useCallback, useEffect, useRef } from "react";
import { Image, Text, View } from "react-native-ui-lib";
import { assets } from "../../assets";
import { container } from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({navigation}) => {

    useEffect(()=>{
        setTimeout(()=>{
            HandleItem()
        }, 2500)
    })

    const HandleItem = async () => {
        const dataToken = await AsyncStorage.getItem('cache')
        console.log('====================================');
        console.log(dataToken);
        console.log('====================================');
        if (!dataToken) {
            navigation.replace("Welcome")
        } else {
            navigation.replace("Tabs")
        }
    }

    return (
        <View style={[container.default]}>
            <View center>
                <Image source={assets.images.pictsea} style={{
                    resizeMode: 'contain',
                    width: 200
                }} />
            </View>
        </View>
    )
}

export default SplashScreen