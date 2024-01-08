import React from 'react'
import { Text, View, Image, Button, Colors } from 'react-native-ui-lib'
import Style from "./style";
import { gambar } from '../../assets/images';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
    const navigation = useNavigation()

    const handleLoginPress = (screen) => {
        navigation.navigate(screen)
    }


    return (
        <View center style={Style.container}>
            <Text style={Style.textJudul}>Welcome To MyApp</Text>
            <Text style={{textAlign:'center'}}>bla bla bla bla bla</Text>
            <Image source={gambar} style={Style.Image}/>
            <Button label={'Login'} size='medium' borderRadius={5} backgroundColor={Colors.blue30} marginV-10 paddingV-10 style={Style.Button}  onPress={() => handleLoginPress('Login')}/>
            <Button label={'Register'} size='medium' borderRadius={5} backgroundColor={Colors.grey40} marginV-10 paddingV-10 style={Style.Button} onPress={() => handleLoginPress('Tabs')}/>
        </View>
    )
}

export default Welcome