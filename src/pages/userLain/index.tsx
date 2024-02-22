import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Button, ImageBackground, TextInput, RefreshControl } from 'react-native'
import { BelumLogin, ButtonC, ModalC, container } from '../../components'
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
import { countPostingan, getFollowApi, getFotoProfile, getImgAkun, reportUser, userCari } from '../../api/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FotoMember from './fotoMeber'

const ProfileLain = ({route, navigation}) => {
    const [active, setActive] = useState('foto')
    const [visible, setVisible] = useState(false)
    const [follow, setFollow] = useState(route.params.follow)
    const [name, setName] = useState('')
    const [gambargratis, setGambarGratis] = useState('')
    const [gambarmember, setGambarMember] = useState('')
    const [heighReport, setHeightBottomReport] = useState('59%')
    const [profile, setProfile] = useState('')
    const [reportUserPesan, setReportUserPesan] = useState('')
    const [modal, setModal] = useState(false)
    const [pesan, setPesan] = useState('')
    const [loading, setLoading] = useState(false)
    // const [fotoProfile, setProfile] = useState(' ')
    const [count, setCount] = useState({
        postingan: 0,
        pengikut: 0,
        member: 0
    })
    const bottomSheetRef = useRef<BottomSheetMethods>(null);

    const fetchData = async () => {
        const profile = await userCari({id: route.params.userId});
        console.log('====================================');
        console.log(profile.Membership);
        console.log('====================================');
        setProfile(profile)
        setName(profile.NamaLengkap)
        setCount({
            postingan: profile.jmlhFoto,
            pengikut: profile.jmlhFollowers,
            member: profile.jmlhMembership
        }) 
        const datagambarGratis = await getImgAkun(false, route.params.userId)
        const datagambarMember = await getImgAkun(true, route.params.userId)
        setGambarGratis(datagambarGratis)
        setGambarMember(datagambarMember)
        setVisible(false)
    };

    const dataFollow = async () => {
        setFollow(follow === 'Diikuti' ? 'Ikuti' : 'Diikuti')
        await getFollowApi({
            userId: route.params.userId
        })
        fetchData()
    }

    const Refresh = async () => {
        await setLoading(true)
        await fetchData()
        setLoading(false)
    }

    useEffect(() => {
        setVisible(true)
        fetchData();
    }, []);

    const pressHandler = useCallback(() => {
        bottomSheetRef.current?.expand();
    }, []);

    const Profile = () => {
        if (route.params.fotoProfile === ' ') {
            return (
                <View marginT-15>
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
                            onPress={()=>{
                                navigation.setParams({ follow: follow === 'Diikuti' ? true : false });
                                navigation.goBack()
                            }}
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
            view = <MyFoto route={route.params.tabSearch} follow={follow} data={gambargratis} profile={profile} />
        } else if (active == 'member') {
            view = <FotoMember profile={profile} data={gambarmember} follow={follow}/>
        } else if (active == 'album') {

        }
        return view
    }
    
    return (
        <GestureHandlerRootView style={[{flex: 1, backgroundColor: 'white'}]}>
            <LoaderScreen color={'white'} overlay={true} backgroundColor={'rgba(0, 0, 0, 0.2)'} containerStyle={{display: visible ? 'block' : 'none'}}/>
            <SafeAreaView>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={Refresh} />
                    }
                >
                    <HalfCircle view={<Header/>} />
                    <View style={{marginTop: 55}}>
                        <View>
                            <Text style={[{textAlign: 'center', fontFamily: 'Poppins-SemiBold', fontSize: 20}]}>
                                {name.length > 15 ? name.slice(0, 15) + '...' : name}
                            </Text>
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
                            <View center marginV-5>
                                <ButtonC
                                    onPress={()=>dataFollow()}
                                    style={{width: 100, borderWidth: follow === 'Diikuti' ? 1 : 0}}
                                    label={follow}
                                    borderRadius={10}
                                    labelStyle={{color: follow !== 'Diikuti' ? 'white' : 'black'}}
                                    backgroundColor={follow !== 'Diikuti' ? assets.colors.button : 'white'}
                                />
                            </View>
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
                            </View>
                            <View>
                                <ViewActive/>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <BottomSheet
                    ref={bottomSheetRef}
                    snapTo={heighReport}
                    backgroundColor={'white'}
                    backDropColor={'black'}
                >
                    <Text color="black" style={[assets.fonts.bold, {textAlign: 'center', fontSize: 18}]}>Laporkan User</Text>
                    <View paddingH-25>
                        <View style={assets.styleDefault.garis2}/>
                    </View>
                    <View marginH-30>
                        <Text style={[assets.fonts.bold, {fontSize: 15}]}>Alasan : </Text>
                        <View paddingV-5 style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Icon color={'grey'} name="circle-plus" size={20} solid/>
                            <TextInput
                                value={reportUserPesan}
                                placeholder="tambahkan alasan mengapa anda ingin melaporkan user ini"
                                onChangeText={(txt) => setReportUserPesan(txt)}
                                placeholderTextColor={'grey'}
                                multiline={true} 
                                numberOfLines={4}
                                style={[{ flex: 1, width: '100%', color: 'black', marginLeft: 10}, assets.fonts.input]}
                                onFocus={()=>setHeightBottomReport('75%')}
                                onBlur={()=>setHeightBottomReport("55%")}
                            />
                        </View>
                        <View style={{alignItems: 'flex-end'}}>
                            <ButtonC
                                label='Laporkan User'
                                borderRadius={10}
                                backgroundColor={assets.colors.button}
                                style={{elevation: 0}}
                                onPress={async ()=>{
                                    await reportUser({
                                        user_id: route.params.userId,
                                        alasan: reportUserPesan
                                    }).then(async (res)=>{
                                        await setReportUserPesan('')
                                        await setModal(true)
                                        setPesan('Berhasil report user')
                                        setTimeout(()=>{
                                            setModal(false)
                                        }, 3000)
                                    })
                                }}
                            />
                        </View>
                    </View>
                </BottomSheet>
            </SafeAreaView>

            <ModalC
                style={{
                    justifyContent: ''
                }}
                overlayBackgroundColor='transparent'
                visible={modal}
                setModal={setModal}
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

export default ProfileLain