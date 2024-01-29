import React, { useContext, useState } from "react"
import { Checkbox, Colors, Text, TouchableOpacity, View } from "react-native-ui-lib"
import style from "./style"
import { ButtonC, Input, container } from "../../components"
import Icon from "react-native-vector-icons/FontAwesome6"
import { AuthContext } from "../../context/auth"
import { assets } from "../../assets"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { LoginApi } from "../../api/api"

const Login = ({navigation}) => {
    const val = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View style={container.default}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Tabs')}
                style={{
                    position: 'absolute',
                    left: 21,
                    top: 40,
                }}
            >
                <Icon name="arrow-left" size={30} color='black'/>
            </TouchableOpacity>
            
            <View center>
                <Text style={[assets.fonts.judul]}>Selamat Datang!</Text>
                <Text style={[assets.fonts.default]}>Masuk dengan akun anda terlebih dahulu.</Text>
            </View>
            <View margin-40 style={{justifyContent: 'center'}}>
                <View marginV-10 style={style.formGroup}>
                    <Icon name="envelope" color={Colors.grey30} solid />
                    <Input
                        style={[assets.fonts.input, {marginLeft: 10, paddingRight: 30}]}
                        placeholder={'Email'}
                        keyboardType="email-address"
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                </View>
                <View marginV-10 marginB-15 style={style.formGroup}>
                    <Icon name="lock" color={Colors.grey30} />
                    <Input
                        style={[assets.fonts.input, {marginLeft: 10, paddingRight: 30}]}
                        placeholder={'Kata Sandi'}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        type="password"
                    />
                </View>
                <Checkbox
                    label='Ingatkan saya'
                    labelStyle={assets.fonts.default}
                    containerStyle={{}}
                />
                {/* <TouchableOpacity right marginV-5>
                    <Text>Forgot Password?</Text>
                </TouchableOpacity> */}
                <ButtonC 
                    label="Masuk"
                    backgroundColor={assets.colors.button} 
                    onPress={()=>LoginApi({ email, password}, navigation)}
                    // onPress={()=>HandleLogin()}
                />
                <View center marginT-20 style={{display: 'flex', flexDirection: 'row'}}>
                    <Text style={{fontFamily: 'Poppins-Regular'}}>Belum punya akun? </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={[assets.fonts.bold]} color="blue">Daftar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Login 