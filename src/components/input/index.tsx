import React from "react"
import { StyleSheet, TextInput } from "react-native"
import { View } from "react-native-ui-lib"
import { assets } from "../../assets"

const Input = props => {
    return (
        <View>
            <TextInput 
                onKeyPress={props.onKeyPress}
                onFocus={()=>{}}
                value={props.value}
                keyboardType={props.keyboardType}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                style={[props.style ?? style.input, {color: 'grey'}]}
                placeholderTextColor={'grey'}
                multiline={props.multiline? props.multiline : false}
                secureTextEntry={(props.type == 'password' ? true : false)}
                editable={props.editable !== undefined ? props.editable : true}
            />
        </View>
    )
}

const style = StyleSheet.create({
    input: {
        marginVertical: 10,
        backgroundColor: assets.colors.white,
        fontSize: 15,
        height: 50,
        paddingHorizontal: 20,
        borderRadius: 20,
        elevation: 9,
        shadowRadius: 15,
    }
})

export default Input