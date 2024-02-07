import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Button, ImageBackground, TextInput, KeyboardAvoidingView, Platform, RefreshControl } from 'react-native'
import { BelumLogin, ButtonC, container } from '../../components'
import HalfCircle from './halfcircle'
import HeaderProfile from './header'
import Icon from "react-native-vector-icons/FontAwesome6"
import Iconfa5 from "react-native-vector-icons/FontAwesome5"
import { Image, LoaderScreen, Text, TouchableOpacity, View } from 'react-native-ui-lib'
import { assets } from '../../assets'
import MyFoto from './myFoto'
import BottomSheet, { BottomSheetMethods } from '../../components/bottomsheet'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { addAlbum, cariAlbum, countPostingan, getFotoProfile, getProfile, logoutApi } from '../../api/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FotoMember from './fotoMeber'
import Album from './album'

const Profile = ({navigation}) => {
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [dataProfile, setDataProfile] = useState()
    const [album, setAlbum] = useState()
    const [gambarGratis, setGambarGratis] = useState()
    const [gambarMember, setGambarMember] = useState()
    const [active, setActive] = useState('foto')
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [fotoProfile, setProfile] = useState(' ')
    const [count, setCount] = useState({})
    const [formData, setFormData] = useState({})
    const bottomSheetRef = useRef<BottomSheetMethods>(null);
    const bottomSheetRefAlbum = useRef<BottomSheetMethods>(null)
    const pressHandler = useCallback(() => {
        bottomSheetRef.current?.expand();
    }, []);
    const pressHandlerAlbum = useCallback(() => {
        bottomSheetRefAlbum.current?.expand();
    }, [])

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };
    
    const fetchData = async () => {
        const dataAlbum = await cariAlbum({select: false})
        const datagambarGratis = await getFotoProfile()
        const datagambarMember = await getFotoProfile(true)
        setAlbum(dataAlbum)
        setGambarGratis(datagambarGratis)
        setGambarMember(datagambarMember)
        const profile = await getProfile();
        setDataProfile(profile)
        // if (profile) {
            setUsername(profile.Username)
            setName(profile.NamaLengkap)
            if (profile.FotoProfil) {
                setProfile(profile.FotoProfil)
            }
            const count = await countPostingan()
            setCount({
                postingan: count.countPostingan,
                pengikut: count.countFollowers,
                member: count.countMember,
            })
        // }
        setVisible(false)
    };

    useEffect(() => {
        setVisible(true)
        fetchData();
    }, []);

    const Refresh = async () => {
        await fetchData()
        setLoading(false)
    }

    const Profile = () => {
        if (fotoProfile === ' ') {
            return (
                <View>
                    <Icon color={'grey'} name="circle-user" size={100} solid />
                </View>
            )
        } else {
            return (
                <View>
                    <Image
                    source={{ uri: `data:image/png;base64,${fotoProfile}` }}
                    style={styles.profileImage}
                    />
                </View>
            )
        }
    }

    const Header = () => {
        return (
            <View style={style.overlay}>
                <View style={[{flexDirection: 'row', justifyContent: 'space-between'}]}>
                    <View></View>
                    <Text color='white' style={[{fontSize: 16.5, fontFamily: 'Poppins-Bold'}]} >Akun Saya</Text>
                    <TouchableOpacity
                        onPress={() => pressHandler()}
                        style={{width:20, alignItems: 'flex-end'}}
                    >
                        <Icon name="ellipsis-vertical" size={20} color={"white"} />
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent: 'center'}}>
                    <View style={style.profile}>
                        {/* <Profile/> */}
                        {Profile()}
                    </View>
                    <View>
                    </View>
                </View>
            </View>
        )
    }

    const ViewActive = () => {
        let view 
        if (active == 'foto') {
            view = <MyFoto data={gambarGratis} profile={dataProfile}/>
        } else if (active == 'member') {
            view = <FotoMember data={gambarMember} profile={dataProfile}/>
        } else {
            view = <Album data={album} addAlbum={()=>pressHandlerAlbum()}/>
        }
        return view
    }

  
    return (
        <GestureHandlerRootView style={{flex: 1, backgroundColor: 'white'}}>
            <LoaderScreen color={'white'} overlay={true} backgroundColor={'rgba(0, 0, 0, 0.2)'} containerStyle={{display: visible ? 'block' : 'none'}}/>
            <SafeAreaView>
                <View style={{}}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl refreshing={loading} onRefresh={Refresh} />
                        }
                    >
                        <HalfCircle view={<Header/>} />
                        <View style={{marginTop: 55}}>
                            <View>
                                <Text style={[{textAlign: 'center', fontFamily: 'Poppins-Bold', fontSize: 20}]}>{name}</Text>
                                <Text marginT-5 style={[assets.fonts.default, {textAlign: 'center'}]}>@{username}</Text>
                                <View marginT-10 style={[{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}]}>
                                    <View style={[{paddingHorizontal: 5}]}>
                                        <Text style={{textAlign: 'center', fontFamily: 'Poppins-Bold', fontSize: 20}}>{count.postingan}</Text>
                                        <Text style={[{textAlign: 'center'}, assets.fonts.default]}>Postingan</Text>
                                    </View>
                                    <View style={style.garis}></View>
                                    <View style={{paddingHorizontal: 5}}>
                                        <Text style={{textAlign: 'center', fontFamily: 'Poppins-Bold', fontSize: 20}}>{count.pengikut}</Text>
                                        <Text style={[{textAlign: 'center'}, assets.fonts.default]}>Pengikut</Text>
                                    </View>
                                    <View style={style.garis}></View>
                                    <View style={{paddingHorizontal: 5}}>
                                        <Text style={{textAlign: 'center', fontFamily: 'Poppins-Bold', fontSize: 20}}>{count.member}</Text>
                                        <Text style={[{textAlign: 'center'}, assets.fonts.default]}>Member</Text>
                                    </View>
                                </View>
                                {/* <View marginT-5 center style={{flexDirection: 'row'}}>
                                    <View paddingH-10>
                                        <ButtonC
                                            borderRadius={5}
                                            label='Atur Harga'
                                        />
                                    </View>
                                    <View paddingH-10>
                                        <ButtonC
                                            borderRadius={5}
                                            label='Saldo'
                                            backgroundColor={assets.colors.button}
                                        />
                                    </View>
                                </View> */}
                            </View>
                            <View>
                                <View marginV-20 paddingH-25 style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                    <View style={active == 'foto' ? style.active : null}>
                                        <TouchableOpacity
                                            onPress={()=>setActive('foto')}
                                        >
                                            <Iconfa5 name="table" size={20} color={"black"} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={active == 'member' ? style.active : null}>
                                        <TouchableOpacity
                                            onPress={()=>setActive('member')}
                                        >
                                            <Iconfa5 name="crown" size={20} color={"black"} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={active == 'album' ? style.active : null}>
                                        <TouchableOpacity
                                            onPress={()=>setActive('album')}
                                        >
                                            <Icon name="images" size={20} color={"black"} solid/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View>
                                    <ViewActive/>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>

            <BottomSheet
                ref={bottomSheetRef}
                snapTo={'52%'}
                backgroundColor={'white'}
                backDropColor={'black'}
            >
                <Text style={[assets.fonts.bold, {textAlign: 'center', fontSize: 18}]}>Opsi</Text>
                <View paddingH-25>
                    <View style={assets.styleDefault.garis2}/>
                </View>
                <View marginH-30>
                    <TouchableOpacity
                    onPress={()=>navigation.navigate('EditProfile', {data: dataProfile})}>
                        <Text color='black' style={[assets.fonts.default, {fontSize: 15, marginVertical: 13}]}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text color='black' style={[assets.fonts.default, {fontSize: 15, marginVertical: 13}]}>Saldo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text color='black' style={[assets.fonts.default, {fontSize: 15, marginVertical: 13}]}>Atur Harga</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>logoutApi(navigation)}
                    >
                        <Text style={[assets.fonts.default, {fontSize: 15, marginVertical: 13, color: 'red'}]}>Keluar</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
            <BottomSheet
                ref={bottomSheetRefAlbum}
                snapTo={'58%'}
                backgroundColor={'white'}
                backDropColor={'black'}
            >
                <Text style={[assets.fonts.bold, {textAlign: 'center', fontSize: 18}]}>Buat Album</Text>
                <View paddingH-25>
                    <View style={assets.styleDefault.garis2}/>
                </View>
                <View marginH-30>
                    <View>
                        <Text style={[assets.fonts.default, {fontSize: 15}]}>Nama Album </Text>
                        <View paddingV-5 style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Icon color={'grey'} name="circle-plus" size={20} solid/>
                            <TextInput
                                value={formData.nama_album}
                                placeholder="Tambahkan judul seperti, “Hewan Bagusku”"
                                onChangeText={txt => handleInputChange('nama_album', txt)}
                                placeholderTextColor={'grey'}
                                multiline={false} 
                                numberOfLines={3}
                                style={[{ flex: 1, width: '100%', color: 'black', marginLeft: 10}, assets.fonts.input]}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={[assets.fonts.default, {fontSize: 15}]}>Deskripsi Album</Text>
                        <View paddingV-5 style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Icon color={'grey'} name="circle-plus" size={20} solid/>
                            <TextInput
                                numberOfLines={3}
                                value={formData.deskripsi_album}
                                placeholder="Tambahkan deskripsi seperti, “Gambar foto makanan ini cocok untuk tugasku”"
                                onChangeText={txt => handleInputChange('deskripsi_album', txt)}
                                placeholderTextColor={'grey'}
                                multiline={true} 
                                style={[{ flex: 1, width: '100%', color: 'black', marginLeft: 10}, assets.fonts.input]}
                            />
                        </View>
                    </View>
                    <View style={{alignItems: 'flex-end'}}>
                        <ButtonC
                            label='Simpan'
                            borderRadius={10}
                            backgroundColor={assets.colors.button}
                            style={{elevation: 0}}
                            onPress={async ()=>{
                                await addAlbum(formData)
                                setFormData({})
                            }}
                        />
                    </View>
                </View>
            </BottomSheet>
        </GestureHandlerRootView>
    )
}

const style = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        right: '5%',
        left: '5%',
        top: '53%',
    },
    profile: {
        position: 'absolute',
        top: 85,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    borderRight: {
        borderRightWidth: 1,
        borderRightColor: 'black'
    },
    garis: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        width: 30,
        transform: [{ rotate: '90deg' }]
    },
    active: {
        paddingBottom: 5,
        borderBottomWidth: 1,
        // paddingHorizontal: 5
    }
})

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileImage: {
      width: 108,
      height: 108,
      borderRadius: 60,  // Setengah dari lebar/tinggi untuk membuat lingkaran
    },
});

export default Profile