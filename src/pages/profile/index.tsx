import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Button, ImageBackground, TextInput, KeyboardAvoidingView, Platform, RefreshControl } from 'react-native'
import { BelumLogin, ButtonC, Input, ModalC, container, formatCurrency } from '../../components'
import HalfCircle from './halfcircle'
import HeaderProfile from './header'
import Icon from "react-native-vector-icons/FontAwesome6"
import Iconfa5 from "react-native-vector-icons/FontAwesome5"
import Ionicons from "react-native-vector-icons/Ionicons"
import { Image, LoaderScreen, Text, TouchableOpacity, View } from 'react-native-ui-lib'
import { assets } from '../../assets'
import MyFoto from './myFoto'
import BottomSheet, { BottomSheetMethods } from '../../components/bottomsheet'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { addAlbum, cariAlbum, countPostingan, getFotoProfile, getProfile, logoutApi, updateProfile } from '../../api/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FotoMember from './fotoMeber'
import Album from './album'
import EditProfile from '../editprofile'

const Profile = ({route, navigation}) => {
    const [penarikan, setTipePenarikan] = useState('')
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [dataProfile, setDataProfile] = useState()
    const [album, setAlbum] = useState()
    const [gambarGratis, setGambarGratis] = useState()
    const [gambarMember, setGambarMember] = useState()
    const [active, setActive] = useState('foto')
    const [username, setUsername] = useState('username')
    const [name, setName] = useState('name')
    const [fotoProfile, setProfile] = useState(' ')
    const [hargaMember, setHargaMember] = useState(0)
    const [count, setCount] = useState({
        postingan: 0,
        pengikut: 0,
        member: 0,
    })
    const [formData, setFormData] = useState({})
    const [modal, setModal] = useState(false)
    const [modalnotif, setModalNotif] = useState(false)
    const [pesan, setPesan] = useState('')
    const [pendapatan, setPendapatan] = useState(0)
    const [modalHarga, setModalHarga] = useState(false)
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
        const profile = await getProfile()
        console.log(profile.id);
        setHargaMember(parseFloat(profile.HargaMember))
        setDataProfile(profile)
        setUsername(profile.Username)
        setName(profile.NamaLengkap)
        setPendapatan(profile.Pendapatan)
        if (profile.FotoProfil) {
            setProfile(profile.FotoProfil)
        }
        setCount({
            postingan: profile.jmlhFoto,
            pengikut: profile.jmlhFollowers,
            member: profile.jmlhMembership
        })
        const datagambarGratis = await getFotoProfile()
        const dataAlbum = await cariAlbum({select: false})
        const datagambarMember = await getFotoProfile(true)
        setAlbum(dataAlbum)
        setGambarGratis(datagambarGratis)
        setGambarMember(datagambarMember)
        // if (profile) {
        // }
        setVisible(false)
    };

    useEffect(() => {
        setVisible(true)
        fetchData();
    }, [route.params?.id]);

    const Refresh = async () => {
        await fetchData()
        setLoading(false)
    }

    const Profile = () => {
        if (fotoProfile === ' ') {
            return (
                <View marginT-15>
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
                                            <Ionicons name="grid" size={20} color={"black"} />
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
                snapTo={'60%'}
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
                    <TouchableOpacity
                        onPress={()=>{
                            setModal(true)
                            bottomSheetRef.current?.close()
                        }}
                    >
                        <Text color='black' style={[assets.fonts.default, {fontSize: 15, marginVertical: 13}]}>Saldo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{
                            setModalHarga(true)
                            bottomSheetRef.current?.close()
                        }}
                    >
                        <Text color='black' style={[assets.fonts.default, {fontSize: 15, marginVertical: 13}]}>Atur Harga</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text color='black' style={[assets.fonts.default, {fontSize: 15, marginVertical: 13}]}>Riwayat Transaksi</Text>
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
                                bottomSheetRefAlbum.current?.close();
                                setFormData({})
                            }}
                        />
                    </View>
                </View>
            </BottomSheet>

            <ModalC
                visible={modal}
                setModal={setModal}
                styleContainer={{
                    alignItems: '',
                }}
            >
                <>
                    <Text marginB-20 style={[assets.fonts.bold, {fontSize: 15, textAlign: 'center'}]}>Cek Saldomu Sekarang</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBlockColor: 'grey'}}>
                        <Text color={'black'} marginB-10 style={[{fontSize: 13, fontFamily: 'Poppins-SemiBold'}]}>Total Saldo</Text>
                        <Text color={'black'} marginB-10 style={[{fontSize: 13, fontFamily: 'Poppins-SemiBold'}]}>Rp {pendapatan.toLocaleString()}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                        <Text color={'black'} marginB-10 style={[{fontSize: 10, fontFamily: 'Poppins-Medium'}]}>Batas penarikan uang</Text>
                        <Text color={'black'} marginB-10 style={[{fontSize: 10, fontFamily: 'Poppins-Medium'}]}>Rp 100,000</Text>
                    </View>
                    <View>
                        <Text marginT-10 style={[assets.fonts.bold]}>Metode Penarikan</Text>
                        <View marginT-15 style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', borderBottomWidth: 1, borderBlockColor: 'grey'}}>
                            <TouchableOpacity 
                            onPress={()=>setTipePenarikan('gopay')}
                            style={{
                                paddingVertical: 10, 
                                paddingHorizontal: 5,
                                width: 80, 
                                height: 50, 
                                borderWidth: penarikan == 'gopay' ? 0 : 1, 
                                marginRight: 25,
                                marginBottom: 15,
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: penarikan == 'gopay' ? '#F0F6FC' : 'white'
                            }}>
                                <Image source={assets.images.gopay} />
                            </TouchableOpacity>
                            <TouchableOpacity 
                            onPress={()=>setTipePenarikan('shopeepay')}
                            style={{
                                paddingVertical: 10, 
                                paddingHorizontal: 5,
                                width: 80, 
                                height: 50, 
                                borderWidth:  penarikan == 'shopeepay' ? 0 : 1, 
                                marginRight: 25,
                                marginBottom: 15,
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: penarikan == 'shopeepay' ? '#F0F6FC' : 'white'
                            }}>
                                <Image source={assets.images.shope} />
                            </TouchableOpacity>
                            <TouchableOpacity 
                            onPress={()=>setTipePenarikan('ovo')}
                            style={{
                                paddingVertical: 10, 
                                paddingHorizontal: 5,
                                width: 80, 
                                height: 50, 
                                borderWidth: penarikan == 'ovo' ? 0 : 1, 
                                marginRight: 25,
                                marginBottom: 15,
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: penarikan == 'ovo' ? '#F0F6FC' : 'white'
                            }}>
                                <Image source={assets.images.ovo} />
                            </TouchableOpacity>
                            <TouchableOpacity 
                            onPress={()=>setTipePenarikan('dana')}
                            style={{
                                paddingVertical: 10, 
                                paddingHorizontal: 5,
                                width: 80, 
                                height: 50, 
                                borderWidth: penarikan == 'dana' ? 0 : 1, 
                                marginRight: 25,
                                marginBottom: 15,
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: penarikan == 'dana' ? '#F0F6FC' : 'white'
                            }}>
                                <Image source={assets.images.dana} />
                            </TouchableOpacity>
                        </View>
                        <Text color={'black'} marginV-10 style={[{fontSize: 10, fontFamily: 'Poppins-Medium'}]}>Pastikan kamu sudah mengisi no handphone pada halaman edit profile!</Text>
                    </View>
                     <ButtonC
                        label='Tarik Saldo'
                        borderRadius={10}
                        backgroundColor={assets.colors.button}
                        style={{elevation: 0}}
                        onPress={async ()=>{
                            await setTipePenarikan('')
                        }}
                    />
                </>
            </ModalC>

            <ModalC
                visible={modalHarga}
                setModal={setModalHarga}
                styleContainer={{
                    alignItems: '',
                }}
            >
                <>
                    <Text marginB-5 style={[assets.fonts.bold, {fontSize: 15, textAlign: 'center'}]}>Atur Harga Berlangganan</Text>
                    <Text marginB-20 style={[assets.fonts.bold, {textAlign: 'center'}]}>@{username}</Text>
                    <Text marginB-10 style={[{fontSize: 13, fontFamily: 'Poppins-Medium'}]}>Atur Harga</Text>
                    <Input
                        keyboardType={'numeric'}
                        value={'Rp '+ hargaMember.toLocaleString()}
                        style={[assets.fonts.default, {
                            backgroundColor: '#F5F5F5',
                            borderRadius: 10,
                            paddingHorizontal: 15,
                            marginBottom: 10
                        }]}
                        onChangeText={txt=>{
                            const cleanedValue = txt.replace(/[^0-9.]/g, '')
                            const floatValue = parseFloat(cleanedValue);
                            if (!isNaN(floatValue) && floatValue > 0) {
                                setHargaMember(floatValue)
                            } else {
                                setHargaMember(0)
                            }
                        }}
                    />
                     <ButtonC
                        label='Atur Harga'
                        borderRadius={10}
                        backgroundColor={assets.colors.button}
                        style={{elevation: 0}}
                        onPress={async ()=>{
                            await updateProfile({
                                harga_member: hargaMember 
                            }).then(async (res)=>{
                                if (res) {
                                    await setPesan('Harga member  berhasil disimpan')
                                    await setModalNotif(true)
                                    setModalHarga(false)
                                    setTimeout(()=>{
                                        setModalNotif(false)
                                    }, 3000)
                                } else {
                                    await setPesan('Harga member tidak tersimpan')
                                    await setModalNotif(true)
                                    setTimeout(()=>{
                                        setModalNotif(false)
                                    }, 3000)
                                }
                            })
                        }}
                    />
                </>
            </ModalC>

            <ModalC
                style={{
                    justifyContent: ''
                }}
                overlayBackgroundColor='transparent'
                visible={modalnotif}
                setModal={setModalNotif}
                styleContainer={{
                    minHeight: 0,
                    minWidth: 0,
                    padding: 5,
                    bordeRadius: 2,
                    marginTop: 10
                }}
            >
                <>
                    <Text marginB-5 style={[assets.fonts.bold, {fontSize: 13, textAlign: 'center'}]}>{pesan}</Text>
                </>
            </ModalC>
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