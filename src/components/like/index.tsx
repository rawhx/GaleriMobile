import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-ui-lib";
import Icon from "react-native-vector-icons/FontAwesome6";
import { postLike } from "../../api/postLike";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";

const Like = (props) => {
    const [like, setLike] = useState(props.like)
    const [Token, setToken] = useState()
    useEffect(()=>{
        token()
    }, [])

    const token = async () => {
        const jwtToken = await AsyncStorage.getItem('cache')
        setToken(jwtToken)
    }
    return (
        <TouchableOpacity
            onPress={
                Token ? () => {
                    setLike(like ? false : true)
                    postLike({foto_id: props.fotoId})
                }
                : () => { ToastAndroid.show('Silahkan masuk terlebih dahulu!', ToastAndroid.SHORT)}
            }
        >
            <Icon name="heart" size={25} color={like ? "red" : "black"} solid={like} />
        </TouchableOpacity>
    )
}

export default Like