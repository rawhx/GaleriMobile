import React, { useContext, useEffect, useState } from "react"
import { Checkbox, Colors, LoaderScreen, Text, TouchableOpacity, View } from "react-native-ui-lib"
import style from "./style"
import { ButtonC, Input, ModalC, container } from "../../components"
import Icon from "react-native-vector-icons/FontAwesome6"
import { assets } from "../../assets"
import { LoginApi } from "../../api/api"
import { UserToken } from "../../context/GlobalState";

const Login = ({route, navigation}) => {
    const [Token, setToken] = useContext(UserToken)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [modal, setModal] = useState(false)
    const [verifikasi, setVerifikasi] = useState(false)
    const [errormsg, setErrorMsg] = useState('')
    const [visible, setVisible] = useState(false)

    const fetchData = async () => {
        await setVerifikasi(route.params?.verifikasi)
        await setModal(route.params?.verifikasi)
        navigation.setParams({})
    }
    useEffect(()=>{
        fetchData()
    }, [route.params?.verifikasi])

    return (
        <View style={container.default}>
            <LoaderScreen color={'white'} overlay={true} backgroundColor={'rgba(0, 0, 0, 0.2)'} containerStyle={{ display: visible ? 'block' : 'none' }} />
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
                        onChangeText={text => {
                            setEmail(text)
                            setVerifikasi(false)
                        }}
                    />
                </View>
                <View marginV-10 marginB-15 style={style.formGroup}>
                    <Icon name="lock" color={Colors.grey30} />
                    <Input
                        style={[assets.fonts.input, {marginLeft: 10, paddingRight: 30}]}
                        placeholder={'Kata Sandi'}
                        value={password}
                        onChangeText={text => {
                            setPassword(text)
                            setVerifikasi(false)
                        }}
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
                    blokir={true}
                    label="Masuk"
                    backgroundColor={assets.colors.button} 
                    onPress={()=>{
                        setVisible(true)
                        LoginApi({ email, password}, navigation).then((res)=>{
                            setVisible(false)
                            if (res.ErrNum === 404) {
                                setModal(true)
                                setErrorMsg(res.ErrMsg)
                            } else if (res.IsError) {
                                setModal(true)
                                setErrorMsg(res.ErrMsg)
                            } else if (!res.IsError) { 
                                setToken(res.Data)
                                navigation.replace("Tabs")
                            }
                        }).catch((err)=>{
                            setModal(true)
                            setErrorMsg(err.response.data)
                        })}
                    }
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
            <ModalC
                visible={modal}
                setModal={setModal}
            >
                {
                   verifikasi ? (
                        <>
                            <View style={{
                                backgroundColor: 'green',
                                borderRadius: 100,
                                padding: 10,
                                width: 50, // Sesuaikan ukuran sesuai kebutuhan
                                height: 50, // Sesuaikan ukuran sesuai kebutuhan
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 20
                            }}>
                                <Icon name="check" size={25} color="white" solid />
                            </View>
                            <Text style={[assets.fonts.bold, {fontSize: 15, textAlign: 'center'}]}>Berhasil melakukan registrasi akun!</Text>
                            <Text style={[{fontSize: 13, fontFamily: 'Poppins-Medium'}]}>{route.params?.msg}</Text>
                        </>
                    ) : (
                        <>
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
                            <Text style={[assets.fonts.bold, {fontSize: 15}]}>Gagal masuk ke aplikasi!</Text>
                            <Text style={[{fontSize: 13, fontFamily: 'Poppins-Medium', textAlign: 'center'}]}>{errormsg}</Text>
                        </>
                    )
                }
            </ModalC>
        </View>
    )
}

export default Login 