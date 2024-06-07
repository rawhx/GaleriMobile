import React, { useEffect, useState } from "react"
import { Colors, Image, TouchableOpacity, View } from "react-native-ui-lib"
import Icon from "react-native-vector-icons/FontAwesome6"
import { StyleSheet, TextInput, ToastAndroid } from "react-native"
import { assets } from "../../assets"
import { getProfile } from "../../api/api"
import AsyncStorage from "@react-native-async-storage/async-storage"

const style = StyleSheet.create({
    formGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: assets.colors.white,
        borderRadius: 10,
        paddingLeft: 20,
        shadowRadius: 15,
    },
    inputGroup: {
        flex: 1,  // Menyesuaikan lebar secara dinamis
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: 'dark',
        borderRadius: 25,
        paddingHorizontal: 20,
        marginLeft: 10
    },
});

const InputKomentar = (props) => {
    const [getProfilee, setProfile] = useState(' ')
    const [Token, setToken] = useState()
   
    const token = async () => {
        const jwtToken = await AsyncStorage.getItem('cache')
        setToken(jwtToken)
    }
    
    const getDetail = async () => {
        const user = await getProfile()
        if (user) {
            setProfile(user.FotoProfil)
        }
    } 

    useEffect(() => {
        token()
        getDetail();
    }, []);

    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {getProfilee !== ' '  ? (
                    <View>
                        <Image
                        source={{ uri: getProfilee.startsWith('https://') ? getProfilee : `data:image/png;base64,${getProfilee}` }}
                        style={{
                            width: 45,
                            height: 45,
                            borderRadius: 60,
                            backgroundColor: 'rgba(240, 240, 240, 1)',
                        }}
                        />
                    </View>
                ) : (<Icon name="circle-user" color="grey" size={45} solid />)}
                <View style={style.inputGroup}>
                    <TextInput
                        value={props.value}
                        keyboardType={props.keyboardType}
                        placeholder="Tambahkan Komentar"
                        onChangeText={props.onChangeText}
                        placeholderTextColor={'grey'}
                        multiline={true} 
                        // autoFocus={true}
                        style={[{ flex: 1, width: '100%', color: 'black' }, assets.fonts.input]}
                    />
                    <TouchableOpacity
                        onPress={Token ? props.onPress : ()=>{ ToastAndroid.show('Silahkan masuk terlebih dahulu!', ToastAndroid.SHORT)}}
                    >
                        <Icon name="paper-plane" color={Colors.grey30} size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default InputKomentar