import React, { useImperativeHandle, useState } from "react";
import { Colors, View } from "react-native-ui-lib";
import { Input } from "..";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"
import { assets } from "../../assets";

const ButtonSearch = props => {
    return (
        <View marginV-10 style={props.styleView ? props.styleView : style.formGroup}>
            <Icon name="search" color={Colors.grey30} size={20} solid />
            <Input 
                style={[{marginLeft: 5, paddingRight: 30}, assets.fonts.input]}
                placeholder="Mau cari apa?"
                value={props.value}
                onChangeText={props.onChangeText}
            />
        </View>
    )
}

export default ButtonSearch

const style = StyleSheet.create({
    formGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: assets.colors.white,
        borderRadius: 10,
        elevation: 9,
        paddingLeft: 20,
        shadowRadius: 15,
        flex: 1
    },
    input: {
        backgroundColor: assets.colors.white,
        fontSize: 15,
        height: 15,
        paddingHorizontal: 20,
        borderRadius: 20,
        elevation: 9,
        shadowRadius: 15,
    },
})