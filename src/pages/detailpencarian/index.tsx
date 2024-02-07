import React, { useCallback, useEffect, useRef, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome6"
import { Image, LoaderScreen, Text, TouchableOpacity, View } from "react-native-ui-lib";
import { ButtonC, DataKomentar, Header, ImageBg, InputKomentar, Pin, ViewAddKomentar, container } from "../../components";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { assets } from "../../assets";
import BottomSheetKomentar from "../../components/bottomsheet/bottomsheetKomentar";
import BottomSheet, { BottomSheetMethods } from "../../components/bottomsheet";
import { getKomentarApi, getUserCari, postKomentar, postLike } from "../../api/api";
import { StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailPencarian = ({route, navigation}) => {
    const bottomSheetRef = useRef<BottomSheetMethods>(null);
    const bottomSheetRefKomentar = useRef<BottomSheetMethods>(null);
    const bottomSheetRefReport = useRef<BottomSheetMethods>(null);
    const pressHandlerKomentar = useCallback(() => {
        bottomSheetRefKomentar.current?.expand();
    }, [])
    const pressHandlerReport = useCallback(() => {
        bottomSheetRef.current?.close();
        bottomSheetRefReport.current?.expand();
    }, [])
    const pressHandler = useCallback(() => {
        bottomSheetRef.current?.expand();
    }, [])

    const [load, setLoad] = useState(true)
    const [like, setLike] = useState(route.params.favorite)
    const [follow, setFollow] = useState('Ikuti')
    const [addKomentar, setAddKomentar] = useState()
    const [sendKomen, setSendKomen] = useState(false)
    const [komentarList, setKomentarList] = useState([]);
    const [getDataDetail, setGetDataDetail] = useState({})

    const kirimPesan = async () => {
        if (addKomentar !== '') {
            const res = await postKomentar({
                foto_id: route.params.id,
                komentar: addKomentar
            })
            console.log('====================================');
            console.log(res[0].IsiKomentar);
            console.log('====================================');
            const newKomentarList = [...komentarList];
            newKomentarList.push(res[0].IsiKomentar);
            setKomentarList(newKomentarList);
            setAddKomentar('');
            setSendKomen(true)
        }
    }

    const Grid = () => {    
        const [data, setData] = useState([])
        useEffect(() => {
            const fetchData = async () => {
                const jwtToken = await AsyncStorage.getItem('cache');
                let url = `https://picsea-1-k3867505.deta.app/foto-cari/guest?page=1&limit=20&kategori_id=${route.params.kategoriId}`
                if (jwtToken) {
                    url = `https://picsea-1-k3867505.deta.app/foto-cari?membership=false&keduanya=false&page=1&limit=20&kategori_id=${route.params.kategoriId}`
                }
                const response = await axios.get(url, {
                    headers: jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}
                });
                setData(response.data.Data);
            };
    
            fetchData()
        }, []);

        return (
            <View style={{flexDirection: 'row'}} marginT-10>
                <View style={{flex: 1}}>
                {
                    data.filter((item, index) => index % 2 == 0).map((item) => (
                        <Pin key={item.id} foto={item.Foto} title={item.JudulFoto} id={item.id} onPress={() => navigation.navigate('DetailFoto', {id: item.id, foto: item.Foto, title: item.JudulFoto, userId: item.UserID, deskripsi: item.DeskripsiFoto, kategoriId: item.KategoriID, favorite: item.Favorit, DataUser: item.DataUser})} />
                    ))
                }
                </View>
                <View style={{flex: 1}}>
                {
                    data.filter((item, index) => index % 2 == 1).map((item) => (
                        <Pin key={item.id} foto={item.Foto} title={item.JudulFoto} id={item.id} onPress={() => navigation.navigate('DetailFoto', {id: item.id, foto: item.Foto, title: item.JudulFoto, userId: item.UserID, deskripsi: item.DeskripsiFoto, kategoriId: item.KategoriID, favorite: item.Favorit, DataUser: item.DataUser})} />
                    ))
                }
                </View>
            </View>
        )
    }

    const fetchKomen = async () => {
        const user = await getUserCari({id: route.params.userId})
        const komentarAwal = await getKomentarApi({fotoId: route.params.id, limit: 2})
        setGetDataDetail({
            username: user.Username,
            profile: user.FotoProfil,
            komentarAwal: komentarAwal,
        })
        console.log(1);   
    }

    const fetchData = async () => {
        console.log(2);
        await fetchKomen()
        await setLike(route.params.favorite)
        await setLoad(false)
    };

    useEffect(() => {
        setKomentarList([])
        fetchData()
    }, [route.params.id, route.params.favorite]);

    if (!load) {
        const ProfileUser = () => {
            if (route.params.DataUser.FotoProfil === ' ') {
                return (
                    <Icon color={'grey'} name="circle-user" size={45} solid />
                )
            }  else {
                return (
                    <View>
                        <Image
                        source={{ uri: `data:image/png;base64,${route.params.DataUser.FotoProfil}` }}
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
       
        const ViewKomentar = () => {
            const komenAwal = getDataDetail.komentarAwal.komentar
            if (komenAwal) {
                return (
                    <View>
                        {
                            komenAwal.map((item) => (
                                <DataKomentar key={item.id} isikomentar={item.IsiKomentar} tanggalkomentar={item.TanggalKomentar} username={item.user.Username} profile={item.user.FotoProfil} />
                            ))
                        }
                    </View>
                )
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
        
        return (
            <GestureHandlerRootView style={{flex: 1}}>
                {/* <LoaderScreen color={'white'} overlay={true} backgroundColor={'rgba(0, 0, 0, 0.2)'} containerStyle={{display: load ? 'block' : 'none'}}/> */}
                <View style={container.defaultTab}>
                    <ScrollView>
                        <View key="Foto">
                            <ImageBg foto={route.params.foto}>
                            <Header nav="detailGambar" onPress={() => navigation.goBack()} onPressBottomSheet={()=>pressHandler()} />
                            </ImageBg>
                            <View>
                                <View paddingH-20 paddingV-15 style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <ProfileUser />
                                        <TouchableOpacity
                                            onPress={()=>navigation.navigate('ProfileLain', {userId: route.params.userId, username: route.params.DataUser.Username, fotoProfile: route.params.DataUser.FotoProfil})}
                                        >
                                            <Text marginL-10 style={[assets.fonts.bold, {fontSize: 15}]}>{route.params.DataUser.Username}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <ButtonC label={follow} style={{}} borderRadius={10} backgroundColor={assets.colors.button} onPress={()=>onFollow()} />
                                </View>
                                <View paddingH-25 style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Text style={[style.text, {}]}>{route.params.title}</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setLike(like ? false : true)
                                            postLike({foto_id: route.params.id})
                                        }}
                                    >
                                        <Icon name="heart" size={25} color={like ? "red" : "black"} solid={like} />
                                    </TouchableOpacity>
                                </View>
                                <View paddingH-25 marginT-10>
                                    <Text style={[assets.fonts.default, {textAlign: 'justify'}]}>{route.params.deskripsi}</Text>
                                </View>
                                <View padding-20 marginT-20 style={{borderTopColor: 'grey', borderTopWidth: 0.5, borderBottomColor: 'grey', borderBottomWidth: 0.5}}>
                                    <View key="komentar" style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <Text style={[style.text]}>{getDataDetail.komentarAwal.count} Komentar</Text>
                                        <TouchableOpacity
                                            onPress={()=>pressHandlerKomentar()}
                                        >
                                            <Text style={[assets.fonts.default]}>Lihat Lainnya</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View marginV-20>
                                        <ViewKomentar/>
                                        {komentarList.map((komentar, index) => (
                                            <ViewAddKomentar
                                                key={index}
                                                isikomentar={komentar}
                                            />
                                        ))}
                                        <View marginT-20>
                                        <InputKomentar 
                                            value={addKomentar}
                                            onChangeText={text => {
                                                setAddKomentar(text)
                                                fetchKomen()
                                            }}
                                            onPress={kirimPesan}
                                        />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View key="fotoLainnya" marginV-20 marginH-20>
                            <Text style={[style.text, {textAlign: 'left'}]}>Lainnya untuk dijelajahi</Text>
                            {/* { Grid() } */}
                            <Grid/>
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
                    fotoId={route.params.id}
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
}

const style = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        fontSize: 15
    },
})

export default DetailPencarian