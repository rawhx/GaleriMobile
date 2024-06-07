import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { assets } from "../../assets";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAddressCard, faArrowLeft, faEnvelope, faLocationDot, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { ButtonC } from "../../components";

const Register = ({navigation}) => {
    const [data, setData] = useState({
        username: '',
        nama: '',
        email: '',
        alamat: '',
        password: '',
        passwordConfirm: '',
    })
    const [load, setLoad] = useState(false)

    const handleInputChange = (field, value) => {
        setData(prevData => ({
            ...prevData,
            [field]: value,
        }))
    }

    return (
        <SafeAreaView style={[assets.style.containerFirst]}>
            <View style={[{ padding: 20 }]}>
                <TouchableOpacity onPress={()=>navigation.navigate('Tabs')}>
                    <FontAwesomeIcon icon={faArrowLeft} size={25} />
                </TouchableOpacity>
            </View>
            <View style={[{ justifyContent: 'center', alignItems: 'center', flex: 1, paddingHorizontal: 25 }]}>
                <Text style={[assets.style.fontBold, { fontSize: 25 }]}>Daftar</Text>
                <Text style={[assets.style.fontRegular]}>Silahkan buat akun anda disini!</Text>
                <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
                    <View style={{ backgroundColor: 'white', width: '100%', paddingHorizontal: 30, borderRadius: 50, flexDirection: 'row', alignItems: 'center', elevation: 3 }}>
                        <FontAwesomeIcon icon={faUser} size={15} color={assets.colors.fosil} style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder="Username"
                            placeholderTextColor={assets.colors.grey}
                            style={[
                                assets.style.fontRegular,
                                {
                                    width: '100%',
                                    paddingRight: 20
                                }
                            ]}
                            autoCapitalize="none"
                            value={data.username}
                            onChangeText={text => handleInputChange('username', text)}
                        />
                    </View>
                    <View style={{ marginTop: 20, backgroundColor: 'white', width: '100%', paddingHorizontal: 30, borderRadius: 50, flexDirection: 'row', alignItems: 'center', elevation: 3 }}>
                        <FontAwesomeIcon icon={faAddressCard} size={15} color={assets.colors.fosil} style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder="Nama"
                            placeholderTextColor={assets.colors.grey}
                            style={[
                                assets.style.fontRegular,
                                {
                                    width: '100%',
                                    paddingRight: 20
                                }
                            ]}
                            autoCapitalize="none"
                            value={data.nama}
                            onChangeText={text => handleInputChange('nama', text)}
                        />
                    </View>
                    <View style={{ marginTop: 20, backgroundColor: 'white', width: '100%', paddingHorizontal: 30, borderRadius: 50, flexDirection: 'row', alignItems: 'center', elevation: 3 }}>
                        <FontAwesomeIcon icon={faEnvelope} size={15} color={assets.colors.fosil} style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={assets.colors.grey}
                            style={[
                                assets.style.fontRegular,
                                {
                                    width: '100%',
                                    paddingRight: 20
                                }
                            ]}
                            autoCapitalize="none"
                            value={data.email}
                            onChangeText={text => handleInputChange('email', text)}
                            inputMode="email"
                        />
                    </View>
                    <View style={{ marginTop: 20, backgroundColor: 'white', width: '100%', paddingHorizontal: 30, borderRadius: 50, flexDirection: 'row', alignItems: 'center', elevation: 3 }}>
                        <FontAwesomeIcon icon={faLocationDot} size={15} color={assets.colors.fosil} style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder="Alamat"
                            placeholderTextColor={assets.colors.grey}
                            style={[
                                assets.style.fontRegular,
                                {
                                    width: '100%',
                                    paddingRight: 20
                                }
                            ]}
                            autoCapitalize="none"
                            value={data.alamat}
                            onChangeText={text => handleInputChange('alamat', text)}
                        />
                    </View>
                    <View style={{ marginTop: 20, backgroundColor: 'white', width: '100%', paddingHorizontal: 30, borderRadius: 50, flexDirection: 'row', alignItems: 'center', elevation: 3 }}>
                        <FontAwesomeIcon icon={faLock} size={15} color={assets.colors.fosil} style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder="Kata Sandi"
                            placeholderTextColor={assets.colors.grey}
                            style={[
                                assets.style.fontRegular,
                                {
                                    width: '100%',
                                    paddingRight: 20
                                }
                            ]}
                            value={data.password}
                            onChangeText={text => handleInputChange('password', text)}
                            secureTextEntry
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={{ marginTop: 20, backgroundColor: 'white', width: '100%', paddingHorizontal: 30, borderRadius: 50, flexDirection: 'row', alignItems: 'center', elevation: 3 }}>
                        <FontAwesomeIcon icon={faLock} size={15} color={assets.colors.fosil} style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder="Konfirmasi Kata Sandi"
                            placeholderTextColor={assets.colors.grey}
                            style={[
                                assets.style.fontRegular,
                                {
                                    width: '100%',
                                    paddingRight: 20
                                }
                            ]}
                            value={data.passwordConfirm}
                            onChangeText={text => handleInputChange('passwordConfirm', text)}
                            secureTextEntry
                            autoCapitalize="none"
                        />
                    </View>
                    <View>
                        
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <ButtonC
                            loading={load}
                            title='Daftar'
                            onPress={async () => {
                                await setLoad(true)
                                console.log(data);
                                // await setLoad(false)
                            }}
                        />
                    </View>
                    <Text style={[assets.style.fontMedium, { textAlign: 'center' }]}>Sudah punya akun? <Text style={{ color: 'blue' }} onPress={() => navigation.push('Login')}>Masuk</Text> </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Register