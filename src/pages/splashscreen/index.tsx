import React, { useCallback, useContext, useEffect, useRef } from "react";
import { Image, Text, View } from "react-native-ui-lib";
import { assets } from "../../assets";
import { container } from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserToken } from "../../context/GlobalState";

const SplashScreen = ({navigation}) => {
    const [Token, setToken] = useContext(UserToken)
    useEffect(()=>{
        setTimeout(()=>{
            HandleItem()
        }, 2500)
    })

    const HandleItem = async () => {
        const dataToken = await AsyncStorage.getItem('cache')
        // await AsyncStorage.removeItem('cache')
        console.log('====================================');
        console.log(dataToken);
        console.log('====================================');
        setToken(dataToken)
        if (!dataToken) {
            navigation.navigate("Welcome")
        } else {
            navigation.navigate("Tabs")
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