import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { container } from '../../components'
import HalfCircle from './halfcircle'
import HeaderProfile from './header'

const Profile = () => {
    return (
        <View style={container.defaultTab}>
            <HalfCircle />
            <Text style={style.text}>Halaman Profile</Text>
        </View>
    )
}

const style = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25
    }
})

export default Profile