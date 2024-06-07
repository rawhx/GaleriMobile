import React, { useContext, useEffect } from "react"
import { Image, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { UserGlobalVar } from "../../context/globalVar"
import { assets } from "../../assets"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getProfileApi } from "../../api"

const SplashScreen = ({ route, navigation }) => {
    const [userglobal, setUserGlobal] = useContext(UserGlobalVar)

    const getUser = async () => {
        const user = await getProfileApi()
        if (user) {
            await setUserGlobal(user)
            navigation.reset({
                index: 0,
                routes: [{ name: 'Tabs' }],
            });
            return
        }
        navigation.reset({
            index: 0,
            routes: [{ name: 'Welcome' }],
        })
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <SafeAreaView style={[assets.style.containerFirst, {justifyContent: 'center', alignItems: 'center'}]}>
            <Image source={assets.images.pictsea} style={{
                resizeMode: 'contain',
                width: 200
            }} />
        </SafeAreaView>
    )
}

export default SplashScreen