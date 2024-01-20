import React from "react"
import { StyleSheet } from "react-native"
import { Text, View } from "react-native-ui-lib"

const HeaderProfile = () => {
    return (
        <View style={style.container}>
            <Text color="white">back</Text>
            <Text color="white">nama</Text>
            <Text color="white">edit</Text>
        </View>
    )
}

export default HeaderProfile

const style = StyleSheet.create({
    container: {
        backgroundColor : 'yellow',
        flexDirection: 'row',
        justifyContent: 'space-between',    
        alignItems: 'center'
    }
})