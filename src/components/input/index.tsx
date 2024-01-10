import React from "react"
import { StyleSheet, TextInput } from "react-native"
import { View } from "react-native-ui-lib"
import { theme } from "../../assets/colors"

const Input = props => {
    return (
        <View>
            <TextInput 
                value={props.value}
                keyboardType={props.keyboardType}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                style={props.style ?? style.input}
                placeholderTextColor={props.placeholderTextColor}
                secureTextEntry={(props.type == 'password' ? true : false)}
            />
        </View>
    )
}

const style = StyleSheet.create({
    input: {
        marginVertical: 10,
        backgroundColor: theme.colors.white,
        fontSize: 15,
        height: 45,
        paddingHorizontal: 20,
        borderRadius: 20,
        elevation: 9,
        shadowRadius: 15,
    }
})

export default Input