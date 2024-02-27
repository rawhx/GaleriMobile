import React from "react";
import { Image, Text, View } from "react-native-ui-lib";
import { assets } from "../../assets";
import Icon from "react-native-vector-icons/FontAwesome6"

const DataKomentar = (props) => {
    const profile = () => {
        if (props.profile === ' ' || !props.profile) {
            return (
                <Icon color={'grey'} name="circle-user" size={45} solid />
            )
        } else {
            return (
                <Image
                source={{ uri: props.profile.startsWith('https://') ? props.profile : `data:image/png;base64,${props.profile}` }}
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
        <View marginV-10 style={{flexDirection: 'row'}}>
            {profile()}
            <View paddingL-10 paddingR-40>
                <Text style={[assets.fonts.bold, { fontSize: 15 }]}>{props.username}</Text>
                <Text style={[assets.fonts.default, {textAlign: 'justify', color: 'black'}]}>{props.isikomentar}</Text>
            </View>
        </View>
    )
}

export default DataKomentar