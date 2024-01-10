import React from 'react'
import { Text, View, Image, Button, Colors } from 'react-native-ui-lib'
import Style from "./style";
import { gambar } from '../../assets/images';
import { useNavigation } from '@react-navigation/native';
import { ButtonC, container } from '../../components';

const Welcome = () => {
    const navigation = useNavigation()

    const handleLoginPress = (screen) => {
        navigation.navigate(screen)
    }

    return (
        <View center style={container.default}>
            <Text style={Style.textJudul}>Welcome To MyApp</Text>
            <Text style={{textAlign:'center'}}>bla bla bla bla bla</Text>
            <Image source={gambar} style={Style.Image}/>
            <ButtonC 
                marginV-10 
                paddingV-10 
                label="Login"
                style={Style.welcome}
                backgroundColor={Colors.blue30} 
                onPress={() => handleLoginPress('Login')}
            />
            <ButtonC 
                marginV-10 
                paddingV-10 
                label="Register"
                style={Style.welcome}
                backgroundColor={Colors.grey40}
                onPress={() => handleLoginPress('Register')}
            />
            {/* <Button 
                label={'Login'} 
                size='medium' 
                borderRadius={20} 
                backgroundColor={Colors.blue30} 
                marginV-10 
                paddingV-10 
                style={Style.welcome}  
                onPress={() => handleLoginPress('Login')}
            />
            <Button 
                label={'Register'} 
                size='medium' 
                borderRadius={20} 
                backgroundColor={Colors.grey40} 
                marginV-10 
                paddingV-10 
                style={Style.welcome} 
                onPress={() => handleLoginPress('Register')}
            /> */}
        </View>
    )
}

export default Welcome