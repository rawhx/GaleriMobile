import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native-ui-lib";
import { assets } from "../../assets";
import Icon from "react-native-vector-icons/FontAwesome6"
import { getProfile } from "../../api/getProfileApi";

const ViewAddKomentar = (props) => {
    const [getData, setGetData] = useState({})

    const getDetailRoute = async () => {
        const user = await getProfile()
        if (user) {
            setGetData({
                profile: user.FotoProfil,
                username: user.Username
            })
        }
    } 

    useEffect(() => {
        getDetailRoute();
    }, []);

    const profile = () => {
        if (getData.profile === ' ' || !getData.profile) {
            return (
                <Icon color={'grey'} name="circle-user" size={45} solid />
            )
        } else {
            return (
                <Image
                source={{ uri: `data:image/png;base64,${getData.profile}` }}
                style={{
                    width: 45,
                    height: 45,
                    borderRadius: 60,
                }}
                />
            )
        }
    }

    return (
        <View marginV-10 style={{flexDirection: 'row'}} key={props.key}>
            {profile()}
            <View paddingL-10 paddingR-40>
                <Text style={[assets.fonts.bold, { fontSize: 15 }]}>{getData.username}</Text>
                <Text style={[assets.fonts.default, {textAlign: 'justify'}]}>{props.isikomentar}</Text>
            </View>
        </View>
    )
}

export default ViewAddKomentar