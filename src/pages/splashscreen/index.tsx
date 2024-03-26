import React, { useCallback, useContext, useEffect, useRef } from "react";
import { Image, Text, View } from "react-native-ui-lib";
import { assets } from "../../assets";
import { container } from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserToken } from "../../context/GlobalState";
import { useIsFocused } from "@react-navigation/native";

const SplashScreen = ({ navigation }) => {
    const isFocused = useIsFocused()

    const [Token, setToken] = useContext(UserToken)
    useEffect(() => {
        if (isFocused) {
            console.log('Screen is in focus splash');
            setTimeout(() => {
                HandleItem()
            }, 2500)
        } else {
            console.log('Screen is not in focus splash');
            // tambahkan kode untuk membersihkan efek samping saat layar tidak difokuskan
        }
    }, [isFocused])

    const HandleItem = async () => {
        const dataToken = await AsyncStorage.getItem('cache')
        // await AsyncStorage.removeItem('cache')
        console.log('====================================');
        console.log(dataToken);
        console.log('====================================');
        setToken(dataToken)
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