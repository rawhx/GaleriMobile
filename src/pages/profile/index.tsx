import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Dimensions, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { assets } from "../../assets";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleUser, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { UserGlobalVar } from "../../context/globalVar";
import { BottomSheetC, FooterLoader, ModalC } from "../../components";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TabProfile from "./TabProfile";
import getProfileTabApi from "../../api/getProfileTabApi";

const Profile = ({navigation}) => {
    const [userglobal, setUserGlobal] = useContext(UserGlobalVar);
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
    const [data, setData] = useState({
        Foto: [
          { id: 1, title: 'red'},
          { id: 2, title: 'red'},
          { id: 3, title: 'red'}
        ],
        Member: [
          { id: 1, title: 'red'},
          { id: 2, title: 'red'},
          { id: 3, title: 'red'}
        ],
        Album: [
            { id: 1, title: 'red'},
            { id: 2, title: 'red'}
        ]
    });
      
    const [load, setLoad] = useState(true)
    const [display, setDisplay] = useState('none')
    const [pageLoad, setPageLoad] = useState([false, false, false])
    const [more, setMore] = useState([true, true, true])
    const [page, setPage] = useState([ 1, 1, 1 ])
    const [tabActive, setTabActive] = useState(0)
    const [modal, setModal] = useState(false)

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present()
    }, [])

    useEffect(()=> {
        getProfileTabApi({page}).then(async(res)=>{
            setPageLoad(prev => {
                const newPageLoad = [...prev]
                newPageLoad[tabActive] = true
                return newPageLoad
            })
            var active = 'Foto'
            if (tabActive === 0) {
                active = 'Foto'
            } else if (tabActive === 1) {
                active = 'Member'
            } else if (tabActive === 2) {
                active = 'Album'
            }
            
            if (data.Foto[0].title) {
                await setData(res)
                setLoad(false)
                return
            }

            if (Array.isArray(res[active]) && res[active].length > 0) {
                setData(prevData => ({
                    ...prevData,
                    [active]: [
                        ...prevData[active],
                        ...res[active]
                    ]
                }))
            } else {
                setMore(prev => {
                    const newMore = [...prev]
                    newMore[tabActive] = false
                    return newMore
                })
            }
        }).finally(()=>setPageLoad(prev => {
            const newPageLoad = [...prev]
            newPageLoad[tabActive] = false
            return newPageLoad
        }))
    }, [page])

    const infinity = () => {
        if (!pageLoad[tabActive] && more[tabActive]) {
            setPage(prevPage => {
                const newPage = [...prevPage]
                newPage[tabActive] += 1
                return newPage
            });
        }
    }

    return (
        <SafeAreaView style={[assets.style.container]}>
            <ScrollView onScroll={infinity} scrollEventThrottle={12} showsVerticalScrollIndicator={false}>
                <ImageBackground source={assets.images.halfCircle} style={getStyle(screenWidth)}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: "52%", paddingHorizontal: 20, paddingTop: '2%'}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                            <Text style={[assets.style.fontBold, { fontSize: 18, color: 'white' }]}>Akun Saya</Text>
                        </View>
                        <TouchableOpacity onPress={handlePresentModalPress}>
                            <FontAwesomeIcon icon={faEllipsisVertical} size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ position: 'absolute', bottom: '-10%', right: 0, left: 0, alignItems: 'center'}}>
                        {
                            userglobal.FotoProfil === ' ' || !userglobal.FotoProfil ? (
                                <>
                                    <View style={{backgroundColor: 'white', marginTop: 100, borderRadius: 100}}>
                                        <FontAwesomeIcon icon={faCircleUser} size={100} color="grey"/>
                                    </View>
                                </>
                            ) : (
                                <>
                                    <Pressable onLongPress={()=>setDisplay('flex')}>
                                        <Image
                                            source={{ uri: (userglobal.FotoProfil).startsWith('https://') ? userglobal.FotoProfil : `data:image/png;base64,${userglobal.FotoProfil}` }}
                                            style={{ height: 100, width: 100, borderRadius: 100 }}
                                        />
                                    </Pressable>
                                </>
                            )
                        }
                    </View>
                </ImageBackground>
                <View style={{ marginTop: '12%' }}>
                    <Text style={[assets.style.fontBold, { fontSize: 20, textAlign: 'center' }]}>{userglobal.NamaLengkap}</Text>
                    <Text style={[assets.style.fontMedium, { textAlign: 'center' }]}>@{userglobal.Username}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, }}>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={[assets.style.fontBold, { fontSize:15 }]}>{userglobal.jmlhFoto}</Text>
                            <Text style={[assets.style.fontMedium, { fontSize:15 }]}>Postingan</Text>
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRightWidth: 2, borderLeftWidth: 2, paddingHorizontal: 15, marginHorizontal: 10}}>
                            <Text style={[assets.style.fontBold, { fontSize:15 }]}>{userglobal.jmlhFollowers}</Text>
                            <Text style={[assets.style.fontMedium, { fontSize:15 }]}>Pengikut</Text>
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[assets.style.fontBold, { fontSize:15 }]}>{userglobal.jmlhMembership}</Text>
                            <Text style={[assets.style.fontMedium, { fontSize:15 }]}>Member</Text>
                        </View>
                    </View>
                </View>
                <View style={{marginTop: 20, paddingHorizontal: 20}}>
                    <TabProfile dataProfile={data} load={load} onActive={async(res)=>await setTabActive(res)}/>
                    <FooterLoader pageLoad={pageLoad[tabActive]} more={more[tabActive]} page={page[tabActive]} />
                </View>
            </ScrollView>
            
            <Pressable onPress={()=>setDisplay('none')} style={{ position: 'absolute', alignItems: 'center', right: 0, left: 0, top: 0, bottom: 0, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.8)', display: display}}>
                {
                    userglobal.FotoProfil === ' ' || !userglobal.FotoProfil ? (
                        <Pressable onPress={()=>{}}>
                            <View style={{backgroundColor: 'white', marginTop: 200, borderRadius: 200}}>
                                <FontAwesomeIcon icon={faCircleUser} size={200} color="grey"/>
                            </View>
                        </Pressable>
                    ) : (
                        <Pressable onPress={()=>{}}>
                            <Image
                                source={{ uri: (userglobal.FotoProfil).startsWith('https://') ? userglobal.FotoProfil : `data:image/png;base64,${userglobal.FotoProfil}` }}
                                style={{ height: 200, width: 200, borderRadius: 200, backgroundColor: 'white' }}
                            />
                        </Pressable>
                    )
                }
            </Pressable>
            <BottomSheetC 
                snapPoint={['45%']}
                href={bottomSheetModalRef}
                header='Opsi'
            >
                <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingVertical: 5, flex: 1, gap: 5 }}>
                    <TouchableOpacity style={{paddingVertical: 15}}>
                        <Text style={[assets.style.fontMedium, { fontSize: 15 }]}>Edit Profil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingVertical: 15}}
                        onPress={()=>{
                            setModal(true)
                            bottomSheetModalRef.current?.close()
                        }}
                    >
                        <Text style={[assets.style.fontMedium, { fontSize: 15 }]}>Saldo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingVertical: 15}}>
                        <Text style={[assets.style.fontMedium, { fontSize: 15 }]}>Atur Harga</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingVertical: 15}}>
                        <Text style={[assets.style.fontMedium, { fontSize: 15 }]}>Riwayat Transaksi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingVertical: 15}} 
                        onPress={async () => {
                            bottomSheetModalRef.current?.close()
                            await AsyncStorage.removeItem('Token')
                            await setUserGlobal('')
                            navigation.navigate('Login')
                        }}
                    >
                        <Text style={[assets.style.fontMedium, { fontSize: 15, color: 'red' }]}>Keluar</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetC>

            <ModalC
                setModal={setModal}
                visible={modal}
            >
                <Text>ini cuma modal</Text>
            </ModalC>
        </SafeAreaView>
    )
}

const getStyle = (screenWidth) => {
  const aspectRatio = 1;
  const imageHeight = screenWidth / aspectRatio;

  return StyleSheet.create({
    kategoriImg: {
      width: '100%',
      height: imageHeight,
      marginTop: -imageHeight / 2, // Adjust as needed,
    },
  }).kategoriImg;
}

export default Profile