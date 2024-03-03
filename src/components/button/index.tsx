import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, ToastAndroid } from "react-native";
import { Button, View } from "react-native-ui-lib";

const ButtonC = props => {
    const [Token, setToken] = useState()
    useEffect(()=>{
        token()
    })

    const token = async () => {
        const jwtToken = await AsyncStorage.getItem('cache')
        setToken(jwtToken)
    }
    return (
        <View>
            <Button 
                label={props.label} 
                labelStyle={[style.label, props.labelStyle]}
                size='medium' 
                borderRadius={props.borderRadius ?? 20} 
                backgroundColor={props.backgroundColor} 
                marginV-10 
                paddingV-10 
                style={props.style ?? style.default} 
                onPress={Token? props.onPress : props.blokir ? props.onPress :  ()=>{ToastAndroid.show('Silahkan masuk terlebih dahulu!', ToastAndroid.SHORT)}}
            />
        </View>
    )
}

const style = StyleSheet.create({
    label: {
        fontFamily: 'Poppins-Bold',
    },
    default: {
        elevation: 9,
        shadowRadius: 15,
    },
})

export default ButtonC