import React, { useState } from "react";
import { Colors, Text, TouchableOpacity, View } from "react-native-ui-lib";
import { ButtonC, Input, container } from "../../components";
import style from "./style";
import Icon from "react-native-vector-icons/FontAwesome6"
import { assets } from "../../assets";
import { Alert } from "react-native";
import axios from "axios";

const Register = ({navigation}) => {
    const [username, setUsername] = useState('')
    const [nama_lengkap, setName] = useState('')
    const [email, setEmail] = useState('')
    const [alamat, setAlamat] = useState('')
    const [password, setPassword] = useState('')
    const [konfirmasi_password, setConfirmPassword] = useState('')

    const submitForm = async () => {
        if (password != konfirmasi_password) {
            return Alert.alert('', 'Kata sandi tidak sama')
        }
        
        let url = `https://picsea-1-k3867505.deta.app/register?email=${email}&username=${username}&nama_lengkap=${nama_lengkap}&alamat=${alamat}&password=${password}&konfirmasi_password=${konfirmasi_password}`
        try {
            const response = await axios.post(url);
            navigation.navigate('Login')
        } catch (error) {
            console.error(error.response.data);
        }

    }

    return (
        <View style={container.default}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Tabs')}
                style={{
                    position: 'absolute',
                    left:21,
                    top: 40,
                }}
            >
                <Icon name="chevron-left" size={30} />
            </TouchableOpacity>
            <View center marginT-50>
                <Text text50>Daftar</Text>
                <Text>Silahkan Buat Akun Anda disini!</Text>
            </View>
            <View margin-40>
                <View marginV-10 style={style.formGroup}>
                    <Icon name="user" color={Colors.grey30} solid />
                    <Input 
                        style={{marginLeft: 10, paddingRight: 30}}
                        placeholder="Username"
                        value={username}
                        onChangeText={text => setUsername(text)}
                    />
                </View>
                <View marginV-10 style={style.formGroup}>
                    <Icon name="address-card" color={Colors.grey30} solid />
                    <Input 
                        placeholder="Name"
                        style={{marginLeft: 10, paddingRight: 30}}
                        value={nama_lengkap}
                        onChangeText={text => setName(text)}
                    />
                </View>
                <View marginV-10 style={style.formGroup}>
                    <Icon name="envelope" color={Colors.grey30} solid />
                    <Input 
                        style={{marginLeft: 10, paddingRight: 30}}
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        keyboardType="email-address"
                    />
                </View>
                <View marginV-10 style={style.formGroup}>
                    <Icon name="map-location-dot" color={Colors.grey30} />
                    <Input 
                        style={{marginLeft: 10, paddingRight: 30}}
                        placeholder="Address"
                        value={alamat}
                        onChangeText={text => setAlamat(text)}
                    />
                </View>
                <View marginV-10 style={style.formGroup}>
                    <Icon name="lock" color={Colors.grey30} />
                    <Input 
                        style={{marginLeft: 10, paddingRight: 30}}
                        placeholder="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        type="password"
                    />
                </View>
                <View marginV-10 style={style.formGroup}>
                    <Icon name="lock" color={Colors.grey30} />
                    <Input 
                        style={{marginLeft: 10, paddingRight: 30,}}
                        placeholder="Confirm Password"
                        value={konfirmasi_password}
                        onChangeText={text => setConfirmPassword(text)}
                        type="password"
                    />
                </View>
                
                <View marginT-5>
                    <ButtonC 
                        label="Daftar"
                        backgroundColor={assets.colors.button} 
                        onPress={() => submitForm()}
                    />
                </View>

                <View center marginT-20 style={{display: 'flex', flexDirection: 'row'}}>
                    <Text>Sudah punya akun? </Text>
                    <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={{fontWeight: 'bold'}} color={assets.colors.blue}>Masuk</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Register