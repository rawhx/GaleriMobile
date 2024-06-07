import { Image, ImageBackground, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { assets } from "../../assets"
import { useCallback, useEffect, useRef, useState } from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleLeft, faArrowLeft, faCircleUser, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { BottomSheetC, ButtonFollow, Like, ViewKomentar } from "../../components";
import { getFotoCari } from "../../api";
import useSWR from "swr";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const DetailFoto = ({ route, navigation }) => {
    const [load, setLoad] = useState(true)
    const [ratio, setRatio] = useState(1)

    const [modal, setModal] = useState(false)

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present()
    }, [])

    const fetch = async () => {
        const res = await getFotoCari({foto_id: route.params.data.id})
        return res
    }

    useEffect(()=>{
        fetch()
        Image.getSize((route.params.data.Foto).startsWith('https://') ? route.params.data.Foto : `data:image/png;base64,${route.params.data.Foto}`, (width, height) => setRatio(width / height));
    }, [])
    // console.log('====================================');
    // console.log(route.params);
    // console.log('====================================');
    return (
        <SafeAreaView style={[assets.style.container]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    !load ? (
                        <>
                            <SkeletonPlaceholder borderRadius={0}>
                                <View style={{ height: 300, width: '100%' }} />
                            </SkeletonPlaceholder>
                            <View style={{paddingHorizontal: 20, marginVertical: 20}}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <SkeletonPlaceholder>
                                            <View style={{ height: 50, width: 50, borderRadius: 50 }} />
                                        </SkeletonPlaceholder>
                                        <SkeletonPlaceholder>
                                            <View style={{ height: 15, width: 100, marginLeft: 10 }} />
                                        </SkeletonPlaceholder>
                                    </View>
                                    <SkeletonPlaceholder borderRadius={10}>
                                        <View style={{ height: 40, width: 100 }} />
                                    </SkeletonPlaceholder>
                                </View>
                            </View>
                        </>
                    ) : (
                        <>
                            <ImageBackground 
                                source={{
                                    uri: (route.params.data.Foto).startsWith('https://') 
                                    ? route.params.data.Foto 
                                    : `data:image/png;base64,${route.params.data.Foto}`
                                }} 
                                style={{ 
                                    borderRadius: 10, 
                                    width: '100%', 
                                    aspectRatio: ratio 
                                }}
                            >
                                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', margin: 20 }} >
                                    <TouchableOpacity 
                                        onPress={()=>navigation.goBack()}
                                        style={{
                                            padding: 10,
                                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                            borderRadius: 40
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faArrowLeft} size={20} color='white' />
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={handlePresentModalPress}
                                        style={{
                                            padding: 10,
                                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                            borderRadius: 40
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faEllipsisVertical} size={20} color='white' />
                                    </TouchableOpacity>
                                </View>
                            </ImageBackground>
                            <View style={{ borderBottomWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)' }}>
                                <View style={{paddingHorizontal: 20, marginVertical: 20, gap: 15}}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            {
                                                route.params.data.DataUser.FotoProfil !== ' ' ? (
                                                    <>
                                                        <Image
                                                            source={{ uri: (route.params.data.DataUser.FotoProfil).startsWith('https://') ? route.params.data.DataUser.FotoProfil : `data:image/png;base64,${route.params.data.DataUser.FotoProfil}` }}
                                                            style={{ height: 50, width: 50, borderRadius: 50, backgroundColor: assets.colors.fosil }}
                                                        />
                                                    </>
                                                ) : (
                                                    <>
                                                        <FontAwesomeIcon icon={faCircleUser} size={50} color={assets.colors.fosil} />
                                                    </>
                                                )
                                            }
                                            <Text style={[assets.style.fontBold, {marginLeft: 10, fontSize: 15}]}>{route.params.data.DataUser.Username}</Text>
                                        </View>
                                        {
                                            !route.params.data.Sendiri ? (
                                                <ButtonFollow id={route.params.data.id} />
                                            ) : null
                                        }
                                    </View>
                                    <View style={{ gap: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={[assets.style.fontSemiBold, {fontSize: 15}]}>{route.params.data.JudulFoto}</Text>
                                            <Like id={route.params.data.id} />
                                        </View>
                                        <Text style={[assets.style.fontMedium, { textAlign: 'justify' }]}>{route.params.data.DeskripsiFoto}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{paddingHorizontal: 20, marginVertical: 20}}>
                                <ViewKomentar />

                            </View>
                        </>
                    )
                }
            </ScrollView>
            <BottomSheetC 
                snapPoint={['25%']}
                href={bottomSheetModalRef}
                header='Opsi'
            >
                <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingVertical: 5, flex: 1, gap: 5 }}>
                    <TouchableOpacity style={{paddingVertical: 15}}>
                        <Text style={[assets.style.fontMedium, { fontSize: 15 }]}>Unduh Gambar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingVertical: 15}}
                        onPress={()=>{
                            // setModal(true)
                            bottomSheetModalRef.current?.close()
                        }}
                    >
                        <Text style={[assets.style.fontMedium, { fontSize: 15 }]}>Laporkan Foto</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetC>
        </SafeAreaView>
    )
}

export default DetailFoto