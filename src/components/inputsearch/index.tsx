import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { assets } from "../../assets";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const InputSearch = (props) => {
    return (
        <View style={{ backgroundColor: 'white', flex: 1, paddingHorizontal: 20, borderRadius: 10, flexDirection: 'row', alignItems: 'center', elevation: 5 }}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size={15} color={assets.colors.fosil} style={{ marginRight: 10 }} />
            <TextInput
                onChangeText={props.onChangeText}
                value={props.value}
                inputMode="search"
                placeholder="Mau cari apa?"
                placeholderTextColor={assets.colors.grey}
                style={[
                    assets.style.fontRegular,
                    {
                        width: '100%',
                        paddingRight: 20
                    }
                ]}
            />
        </View>
    )
}

export default InputSearch