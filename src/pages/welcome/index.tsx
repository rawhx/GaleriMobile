import React, { useContext } from 'react'
import { Text, View, Image, Button, Colors, TouchableOpacity } from 'react-native-ui-lib'
import Style from "./style";
import { useNavigation } from '@react-navigation/native';
import { ButtonC, container } from '../../components';
import { AuthContext } from '../../context/auth';
import Icon from "react-native-vector-icons/FontAwesome6"
import { assets } from '../../assets';

const Welcome = () => {
    const val = useContext(AuthContext)
    const navigation = useNavigation()

    const handleLoginPress = (screen) => {
        navigation.navigate(screen)
    }

    return (
        <View center style={container.default}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Tabs')}
                style={{
                    position: 'absolute',
                    left:21,
                    top: 40,
                }}
            >
                <Icon name="arrow-left" size={30} color="black" />
            </TouchableOpacity>
            <View>
                <View center>
                    <Image source={assets.images.pictsea} style={{
                        width: 125, 
                        resizeMode: 'contain',
                    }}/>
                </View>
                {/* <Text style={Style.textJudul}>PICTSEA</Text> */}
                <Text style={{textAlign:'center', fontFamily: 'Poppins-Regular'}}>Temukan dan unduh ide ide menarik disini!</Text>
                <Image source={assets.images.gambar} style={Style.Image}/>
                <ButtonC 
                    marginV-10 
                    paddingV-10 
                    label="Login"
                    style={Style.welcome}
                    backgroundColor={assets.colors.button} 
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
            </View>
        </View>
    )
}

export default Welcome