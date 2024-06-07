import React, { useContext, useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { assets } from "../../assets";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { ButtonC } from "../../components";
import { Checkbox } from "react-native-paper";
import { getProfileApi, loginApi } from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserGlobalVar } from "../../context/globalVar";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [load, setLoad] = useState(false)
    const [checked, setChecked] = useState(true)
    const [userglobal, setUserGlobal] = useContext(UserGlobalVar);

    return (
        <SafeAreaView style={[assets.style.containerFirst]}>
            <View style={[{ padding: 20 }]}>
                <TouchableOpacity onPress={()=>navigation.navigate('Tabs')}>
                    <FontAwesomeIcon icon={faArrowLeft} size={25} />
                </TouchableOpacity>
            </View>
            <View style={[{ justifyContent: 'center', alignItems: 'center', flex: 1, paddingHorizontal: 25 }]}>
                <Text style={[assets.style.fontBold, { fontSize: 25 }]}>Selamat Datang!</Text>
                <Text style={[assets.style.fontRegular]}>Masuk dengan akun anda terlebih dahulu.</Text>
                <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
                    <View style={{ backgroundColor: 'white', width: '100%', paddingHorizontal: 30, borderRadius: 50, flexDirection: 'row', alignItems: 'center', elevation: 3 }}>
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
                            value={email}
                            autoCapitalize="none"
                            onChangeText={text => setEmail(text)}
                            inputMode="email"
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
                            value={password}
                            autoCapitalize="none"
                            onChangeText={text => setPassword(text)}
                            secureTextEntry
                        />
                    </View>
                    <View>
                        
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <ButtonC
                            loading={load}
                            title='Masuk'
                            onPress={load ? null : async () => {
                                await setLoad(true)
                                loginApi({
                                    email: email,
                                    password: password
                                }).then(async (res) => {
                                    if (!res.IsError) {
                                        await AsyncStorage.setItem('Token', res.Data)
                                        const user = await getProfileApi()
                                        if (user) {
                                            await setUserGlobal(user)
                                        }
                                        navigation.reset({
                                            index: 0,
                                            routes: [{ name: 'Tabs' }],
                                        });
                                        return
                                    }
                                    await setLoad(false)
                                })
                            }}
                        />
                    </View>
                    <Text style={[assets.style.fontMedium, { textAlign: 'center' }]}>Belum punya akun? <Text style={{ color: 'blue' }} onPress={() => navigation.push('Register')}>Daftar</Text> </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login