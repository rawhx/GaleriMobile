import React, { useState } from "react";
import { Colors, Text, TouchableOpacity, View } from "react-native-ui-lib";
import { ButtonC, Input, ModalC, container } from "../../components";
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
    const [modal, setModal] = useState(false)
    const [errormsg, setErrorMsg] = useState('')
    const [visible, setVisible] = useState(false)

    const submitForm = async () => {
        setVisible(true)
        if (password != konfirmasi_password) {
            setModal(true)
            setErrorMsg('Kata sandi tidak sama')
            return 
        }
        
        let url = `https://picsea-1-k3867505.deta.app/register?email=${email}&username=${username}&nama_lengkap=${nama_lengkap}&alamat=${alamat}&password=${password}&konfirmasi_password=${konfirmasi_password}`
        
        const response = await axios.post(url).then((res)=>{
            setVisible(false)
            if (res.data.IsError) {
                setModal(true)
                setErrorMsg(res.data.ErrMsg)
                return 
            } else if (!res.data.IsError && res.data.IsError !== undefined){
                navigation.navigate('Login', {verifikasi: true, msg: res.data.Output})
                setEmail('')
                setAlamat('')
                setPassword('')
                setConfirmPassword('')
                setName('')
                setUsername('')
                console.log(res.data.IsError);
                return
            } else {
                setModal(true)
                setErrorMsg(res.data)
                return
            }  
        }).catch((err)=>{
            setModal(true)
            setErrorMsg(err.response.data)
            console.log('====================================');
            console.log(err.response.status, err.response.data);
            console.log('====================================');
        })
        setVisible(false)
    }

    return (
        <View style={container.default}>
            <LoaderScreen color={'white'} overlay={true} backgroundColor={'rgba(0, 0, 0, 0.2)'} containerStyle={{ display: visible ? 'block' : 'none' }} />
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
            <View center marginT-50>
                <Text style={assets.fonts.judul}>Daftar</Text>
                <Text style={assets.fonts.default}>Silahkan Buat Akun Anda disini!</Text>
            </View>
            <View margin-40>
                <View marginV-10 style={style.formGroup}>
                    <Icon name="user" color={Colors.grey30} solid />
                    <Input 
                        style={[{marginLeft: 10, paddingRight: 30}, assets.fonts.input]}
                        placeholder="Username"
                        value={username}
                        onChangeText={text => setUsername(text)}
                    />
                </View>
                <View marginV-10 style={style.formGroup}>
                    <Icon name="address-card" color={Colors.grey30} solid />
                    <Input 
                        placeholder="Nama"
                        style={[{marginLeft: 10, paddingRight: 30}, assets.fonts.input]}
                        value={nama_lengkap}
                        onChangeText={text => setName(text)}
                    />
                </View>
                <View marginV-10 style={style.formGroup}>
                    <Icon name="envelope" color={Colors.grey30} solid />
                    <Input 
                        style={[{marginLeft: 10, paddingRight: 30}, assets.fonts.input]}
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        keyboardType="email-address"
                    />
                </View>
                <View marginV-10 style={style.formGroup}>
                    <Icon name="map-location-dot" color={Colors.grey30} />
                    <Input 
                        style={[{marginLeft: 10, paddingRight: 30}, assets.fonts.input]}
                        placeholder="Alamat"
                        value={alamat}
                        onChangeText={text => setAlamat(text)}
                    />
                </View>
                <View marginV-10 style={style.formGroup}>
                    <Icon name="lock" color={Colors.grey30} />
                    <Input 
                        style={[{marginLeft: 10, paddingRight: 30}, assets.fonts.input]}
                        placeholder="Kata Sandi"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        type="password"
                    />
                </View>
                <View marginV-10 style={style.formGroup}>
                    <Icon name="lock" color={Colors.grey30} />
                    <Input 
                        style={[{marginLeft: 10, paddingRight: 30}, assets.fonts.input]}
                        placeholder="Konfirmasi Kata Sandi"
                        value={konfirmasi_password}
                        onChangeText={text => setConfirmPassword(text)}
                        type="password"
                    />
                </View>
                
                <View marginT-5>
                    <ButtonC 
                        blokir={true}
                        label="Daftar"
                        backgroundColor={assets.colors.button} 
                        onPress={() => submitForm()}
                    />
                </View>

                <View center marginT-20 style={{display: 'flex', flexDirection: 'row'}}>
                    <Text style={{fontFamily: 'Poppins-Regular'}}>Sudah punya akun? </Text>
                    <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={{fontFamily: 'Poppins-SemiBold'}} color={assets.colors.blue}>Masuk</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ModalC
                visible={modal}
                setModal={setModal}
            >
                <View style={{
                    backgroundColor: '#C51313',
                    borderRadius: 100,
                    padding: 10,
                    width: 50, // Sesuaikan ukuran sesuai kebutuhan
                    height: 50, // Sesuaikan ukuran sesuai kebutuhan
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20
                }}>
                    <Icon name="xmark" size={25} color="white" solid />
                </View>
                <Text style={[assets.fonts.bold, {fontSize: 15}]}>Gagal registrasi!</Text>
                <Text style={[{fontSize: 12, fontFamily: 'Poppins-Medium', textAlign: 'center'}]}>{errormsg}</Text>
            </ModalC>
        </View>
    )
}

export default Register