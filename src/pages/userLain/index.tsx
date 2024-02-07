import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Button, ImageBackground } from 'react-native'
import { BelumLogin, ButtonC, container } from '../../components'
import HalfCircle from './halfcircle'
import HeaderProfile from './header'
import Icon from "react-native-vector-icons/FontAwesome6"
import Iconfa5 from "react-native-vector-icons/FontAwesome5"
import { Image, Text, TouchableOpacity, View } from 'react-native-ui-lib'
import { assets } from '../../assets'
import MyFoto from './myFoto'
import BottomSheet, { BottomSheetMethods } from '../../components/bottomsheet'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { countPostingan, getProfile, logoutApi } from '../../api/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FotoMember from './fotoMeber'

const ProfileLain = ({route, navigation}) => {
    const [active, setActive] = useState('foto')
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [fotoProfile, setProfile] = useState(' ')
    const [count, setCount] = useState({})
    const bottomSheetRef = useRef<BottomSheetMethods>(null);
    
    const fetchData = async () => {
        const jwtToken = await AsyncStorage.getItem('cache')
        const profile = await getProfile();
        setUsername(profile.Username)
        setName(profile.NamaLengkap)
        if (profile.FotoProfil) {
            setProfile(profile.FotoProfil)
        }
        const countpostingan = await countPostingan()
        setCount({
            postingan: countpostingan,
            pengikut: countpostingan,
        })
    };

    useEffect(() => {
        console.log(route.params.username);
        
        fetchData();
    }, []);

    const pressHandler = useCallback(() => {
        bottomSheetRef.current?.expand();
    }, []);

    const Profile = () => {
        if (route.params.fotoProfile === ' ') {
            return (
                <View>
                    <Icon color={'grey'} name="circle-user" size={100} solid />
                </View>
            )
        } else {
            return (
                <View>
                    <Image
                    source={{ uri: `data:image/png;base64,${route.params.fotoProfile}` }}
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
                    <View>
                        <TouchableOpacity
                            onPress={()=>navigation.goBack()}
                        >
                            <Icon name="arrow-left" size={20} color={"white"} />
                        </TouchableOpacity>
                    </View>
                    <Text color='white' style={[{fontSize: 16.5, fontFamily: 'Poppins-Bold'}]} >{route.params.username}</Text>
                    <TouchableOpacity
                        onPress={() => pressHandler()}
                    >
                        <Icon name="user-slash" size={20} color={"white"} />
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent: 'center'}}>
                    <View style={style.profile}>
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
            view = <MyFoto />
        } else if (active == 'member') {
            view = <FotoMember />
        } else if (active == 'album') {

        }
        return view
    }
    
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <SafeAreaView style={container.defaultTab}>
                <ScrollView>
                    <HalfCircle view={<Header/>} />
                    <View style={{marginTop: -150}}>
                        <View>
                            <Text style={[{textAlign: 'center', fontFamily: 'Poppins-Bold', fontSize: 20}]}>Siti Jubaedah</Text>
                            <View marginT-10 style={[{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}]}>
                                <View style={[{paddingHorizontal: 5}]}>
                                    <Text style={{textAlign: 'center', fontFamily: 'Poppins-Bold', fontSize: 20}}>255</Text>
                                    <Text style={[{textAlign: 'center'}, assets.fonts.default]}>Postingan</Text>
                                </View>
                                <View style={style.garis}></View>
                                <View style={{paddingHorizontal: 5}}>
                                    <Text style={{textAlign: 'center', fontFamily: 'Poppins-Bold', fontSize: 20}}>255</Text>
                                    <Text style={[{textAlign: 'center'}, assets.fonts.default]}>Pengikut</Text>
                                </View>
                                <View style={style.garis}></View>
                                <View style={{paddingHorizontal: 5}}>
                                    <Text style={{textAlign: 'center', fontFamily: 'Poppins-Bold', fontSize: 20}}>255</Text>
                                    <Text style={[{textAlign: 'center'}, assets.fonts.default]}>Member</Text>
                                </View>
                            </View>
                            <View center marginV-5>
                                <ButtonC
                                    style={{width: 100}}
                                    label="Ikuti"
                                    borderRadius={10}
                                    backgroundColor={assets.colors.button}
                                />
                            </View>
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
                            </View>
                            <View>
                                <ViewActive/>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <BottomSheet
                    ref={bottomSheetRef}
                    snapTo={'55%'}
                    backgroundColor={'white'}
                    backDropColor={'black'}
                >
                    <Text color="black" style={[assets.fonts.bold, {textAlign: 'center', fontSize: 18}]}>Laporkan User</Text>
                    <View paddingH-25>
                        <View style={assets.styleDefault.garis2}/>
                    </View>
                    <View marginH-30>
                        <Text style={[assets.fonts.bold, {fontSize: 15}]}>Alasan : </Text>
                        <View style={{alignItems: 'flex-end'}}>
                            <ButtonC
                                label='Laporkan User'
                                borderRadius={10}
                                backgroundColor={assets.colors.button}
                                style={{elevation: 0}}
                            />
                        </View>
                    </View>
                </BottomSheet>
            </SafeAreaView>
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
        right: 20,
        left: 20,
        top: 225,
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
      borderRadius: 60,  
    },
});

export default ProfileLain