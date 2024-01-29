import React, { useCallback, useEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput } from 'react-native'
import { ButtonC, ButtonSearch, DataKomentar, Header, ImageBg, InputKomentar, Pin, ViewAddKomentar, container } from '../../components'
import Kategori from './kategori'
import { assets } from '../../assets'
import { Image, Text, TouchableOpacity, View } from 'react-native-ui-lib'
import Icon from "react-native-vector-icons/FontAwesome6"
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheet, { BottomSheetMethods } from '../../components/bottomsheet'
import { getUserCari, getFollowCariApi, getKomentarApi, postKomentar } from '../../api/api' 
import BottomSheetScrollView from '../../components/bottomsheet/bottomsheetKomentar'
import Animated from 'react-native-reanimated'
import BottomSheetKomentar from '../../components/bottomsheet/bottomsheetKomentar'

const Home = () => {
    const [getDataDetail, setGetDataDetail] = useState({})
    const [follow, setFollow] = useState('Ikuti')
    const bottomSheetRef = useRef<BottomSheetMethods>(null);
    const bottomSheetRefKomentar = useRef<BottomSheetMethods>(null);
    const bottomSheetRefReport = useRef<BottomSheetMethods>(null);
    const [like, setLike] = useState()
    const [addKomentar, setAddKomentar] = useState()
    const [sendKomen, setSendKomen] = useState(false)
    const [komentarList, setKomentarList] = useState([]);

    const pressHandler = useCallback(() => {
        bottomSheetRef.current?.expand();
    }, [])
    const pressHandlerKomentar = useCallback(() => {
        bottomSheetRefKomentar.current?.expand();
    }, [])
    const pressHandlerReport = useCallback(() => {
        bottomSheetRef.current?.close();
        bottomSheetRefReport.current?.expand();
    }, [])
    const kirimPesan = async () => {
        if (addKomentar !== '') {
            const res = await postKomentar({
                foto_id: getDataDetail.id,
                komentar: addKomentar
            })
            const newKomentarList = [...komentarList];
            newKomentarList.push(addKomentar);
            setKomentarList(newKomentarList);
            setAddKomentar('');
            setSendKomen(true)
        }
    }

    const getDetail = async (id, foto, title, userId, deskripsi) => {        
        const user = await getUserCari({id: userId})
        // const userFollow = await getFollowCariApi({userId: userId})
        const komentarAwal = await getKomentarApi({fotoId: id, limit: 2})
        const komentar = await getKomentarApi({fotoId: id, limit: 20})
        setGetDataDetail({
            id: id, 
            foto: foto,
            title: title,
            deskripsi: deskripsi,
            userId: userId,
            username: user.Username,
            profile: user.FotoProfil,
            komentarAwal: komentarAwal,
            komentar: komentar,
        })
        setKomentarList([])
    } 

    const Grid = () => {    
        const [data, setData] = useState([]);

        useEffect(() => {
            const fetchData = async () => {
                const response = await axios.get('https://picsea-1-k3867505.deta.app/foto-trending/guest?page=1&limit=20');
                setData(response.data.Data);
            };
    
            fetchData()
        }, []);

        return (
            <View style={{flexDirection: 'row'}} marginT-10>
                <View style={{flex: 1}}>
                {
                    data.filter((item, index) => index % 2 == 0).map((item) => (
                        <Pin key={item.id} foto={item.Foto} title={item.JudulFoto} id={item.id} onPress={() => getDetail(item.id, item.Foto, item.JudulFoto, item.UserID, item.DeskripsiFoto)} />
                        ))
                    }
                </View>
                <View style={{flex: 1}}>
                {
                    data.filter((item, index) => index % 2 == 1).map((item) => (
                        <Pin key={item.id} foto={item.Foto} title={item.JudulFoto} id={item.id} onPress={() => getDetail(item.id, item.Foto, item.JudulFoto, item.UserID, item.DeskripsiFoto)} />
                    ))
                }
                </View>
            </View>
        )
    }

    const ProfileUser = () => {
        if (getDataDetail.profile === ' ') {
            return (
                <Icon color={'grey'} name="circle-user" size={45} solid />
            )
        }  else {
            return (
                <View>
                    <Image
                    source={{ uri: `data:image/png;base64,${getDataDetail.profile}` }}
                    style={{
                        width: 45,
                        height: 45,
                        borderRadius: 60,
                    }}
                    />
                </View>
            )
        }
    }

    const ViewKomentar = (props) => {
        const komen = getDataDetail.komentar.komentar
        const komenAwal = getDataDetail.komentarAwal.komentar
        if (komen) {
            // if (props.detail) {
            //     return (
            //         <View>
            //             {
            //                 komen.map((item) => (
            //                     <DataKomentar key={item.id} isikomentar={item.IsiKomentar} tanggalkomentar={item.TanggalKomentar} username={item.user.Username} profile={item.user.FotoProfil} />
            //                 ))
            //             }
            //         </View>
            //     )
            // } else {
                return (
                    <View>
                        {
                            komenAwal.map((item) => (
                                <DataKomentar key={item.id} isikomentar={item.IsiKomentar} tanggalkomentar={item.TanggalKomentar} username={item.user.Username} profile={item.user.FotoProfil} />
                            ))
                        }
                    </View>
                )
            // }
        } else {
            if (!sendKomen) {
                return (
                    <View center>
                        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 12}}>Tidak ada komenntar</Text>
                    </View>
                )
            }
        }
    }

    let header = <Header nav="detailGambar" onPress={() => setGetDataDetail({})} onPressBottomSheet={()=>pressHandler()} />
    
    if (getDataDetail.foto) {
        return (
            <GestureHandlerRootView style={{flex: 1}}>
                <View style={container.defaultTab}>
                    <ScrollView>
                        <View key="Foto">
                            <ImageBg View={header} foto={getDataDetail.foto} />
                            <View>
                                <View paddingH-20 paddingV-15 style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <ProfileUser />
                                        <TouchableOpacity>
                                            <Text marginL-10 style={[assets.fonts.bold, {fontSize: 15}]}>{getDataDetail.username}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <ButtonC label={follow} style={{}} borderRadius={10} backgroundColor={assets.colors.button} onPress={()=>onFollow()} />
                                </View>
                                <View paddingH-25 style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Text style={[style.text, {}]}>{getDataDetail.title}</Text>
                                    <TouchableOpacity
                                        onPress={() => setLike(like ? false : true)}
                                    >
                                        <Icon name="heart" size={25} color={like ? "red" : "black"} solid={like ? true : false} />
                                    </TouchableOpacity>
                                </View>
                                <View paddingH-25 marginT-10>
                                    <Text style={[assets.fonts.default, {textAlign: 'justify'}]}>{getDataDetail.deskripsi}</Text>
                                </View>
                                <View padding-20 marginT-20 style={{borderTopColor: 'grey', borderTopWidth: 0.5, borderBottomColor: 'grey', borderBottomWidth: 0.5}}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <Text style={[style.text]}>{getDataDetail.komentar.count} Komentar</Text>
                                        <TouchableOpacity
                                            onPress={()=>pressHandlerKomentar()}
                                        >
                                            <Text style={[assets.fonts.default]}>Lihat Lainnya</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View marginV-20>
                                        <ViewKomentar detail={false}/>
                                        {komentarList.map((komentar, index) => (
                                            <ViewAddKomentar
                                                key={index}
                                                isikomentar={komentar}
                                            />
                                        ))}
                                        <View marginT-20>
                                        <InputKomentar 
                                                value={addKomentar}
                                                onChangeText={text => setAddKomentar(text)}
                                                onPress={kirimPesan}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View key="fotoLainnya" marginV-20 marginH-20>
                            <Text style={[style.text, {textAlign: 'left'}]}>Lainnya untuk dijelajahi</Text>
                            { Grid() }
                        </View>
                    </ScrollView>
                </View>

                <BottomSheet
                    ref={bottomSheetRef}
                    snapTo={'45%'}
                    backgroundColor={'white'}
                    backDropColor={'black'}
                >
                    <Text style={[assets.fonts.bold, {textAlign: 'center', fontSize: 18}]}>Opsi</Text>
                    <View paddingH-25>
                        <View style={assets.styleDefault.garis2}/>
                    </View>
                    <View marginH-30>
                        <TouchableOpacity>
                            <Text color='black' style={[{fontSize: 18, marginVertical: 13}, assets.fonts.default]}>Unduh Gambar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text color='black' style={[{fontSize: 18, marginVertical: 13}, assets.fonts.default]}>Tambahkan ke Album</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>pressHandlerReport()}>
                            <Text color='black' style={[{fontSize: 18, marginVertical: 13}, assets.fonts.default]}>Laporkan Foto</Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheet>
                <BottomSheetKomentar
                    ref={bottomSheetRefKomentar}
                    snapTo={'90%'}
                    backgroundColor={'white'}
                    fotoId={getDataDetail.id}
                    backDropColor={'black'}
                />
                <BottomSheet
                    ref={bottomSheetRefReport}
                    snapTo={'55%'}
                    backgroundColor={'white'}
                    backDropColor={'black'}
                >
                    <Text style={[assets.fonts.bold, {textAlign: 'center', fontSize: 18}]}>Laporkan Foto</Text>
                    <View paddingH-25>
                        <View style={assets.styleDefault.garis2}/>
                    </View>
                    <View marginH-30>
                        <Text style={[assets.fonts.bold]}>Alasan :</Text>
                    </View>
                </BottomSheet>
            </GestureHandlerRootView>
        )
    }
    return (
        <View style={container.defaultTab}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header search="false"/>
                <View marginH-20>
                    <ButtonSearch styleView={style.view}/>
                    <ScrollView>
                        <View marginT-15>
                            <Text style={assets.fonts.bold}>Pilih Kategori</Text>
                            <Kategori />
                            <Text style={assets.fonts.bold} marginT-20>Gambar paling populer</Text>
                        </View>
                    </ScrollView>
                    { Grid() }
                </View>
            </ScrollView>
        </View>
    )
}

const style = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        fontSize: 15
    },
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: assets.colors.white,
        borderRadius: 10,
        elevation: 9,
        paddingLeft: 20,
        shadowRadius: 15,
    },
})

export default Home