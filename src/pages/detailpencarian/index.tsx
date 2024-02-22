import React, { useCallback, useEffect, useRef, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome6"
import Icon5 from "react-native-vector-icons/FontAwesome5"
import { Image, LoaderScreen, Text, TouchableOpacity, View } from "react-native-ui-lib";
import { ButtonC, DataKomentar, Header, ImageBg, InputKomentar, Like, ModalC, Pin, ViewAddKomentar, container } from "../../components";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { assets } from "../../assets";
import BottomSheetKomentar from "../../components/bottomsheet/bottomsheetKomentar";
import BottomSheet, { BottomSheetMethods } from "../../components/bottomsheet";
import { getFollowApi, getFollowCariApi, getKomentarApi, getUserCari, postKomentar, postLike, reportFoto } from "../../api/api";
import { StyleSheet, TextInput } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNFetchBlob from 'rn-fetch-blob';

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
    const [getDataDetail, setGetDataDetail] = useState({
        komentarAwal: {
            count: 0
        }
    })
    const [reportfoto, setReportFoto] = useState('')
    const [modal, setModal] = useState(false)
    const [pesan, setPesan] = useState('ini pesan')
    const [heightbottomreport, setHeightBottomReport] = useState('56%')

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

    const downloadImage = (base64Data, fileName) => {
        const pathToSave = `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}.jpeg`;
        RNFetchBlob.fs.writeFile(pathToSave, base64Data, 'base64')
          .then( async () => {
            await setPesan('Unduh Foto Berhasil!')
            await setModal(true)
            setTimeout(()=>{
                setModal(false)
            }, 3000)
          })
          .catch(error => {
            
            console.error('Error:', error);
          });
    };

    const Grid = () => {    
        const [data, setData] = useState([])
        useEffect(() => {
            const fetchData = async () => {
                const jwtToken = await AsyncStorage.getItem('cache');
                let url = `https://picsea-1-k3867505.deta.app/foto-cari/guest?page=1&limit=20&kategori_id=${route.params.kategoriId}`
                if (jwtToken) {
                    url = `https://picsea-1-k3867505.deta.app/foto-cari?membership=true&keduanya=true&page=1&limit=20&kategori_id=${route.params.kategoriId}`
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
                        <Pin key={item.id} foto={item.Foto} title={item.JudulFoto} id={item.id} onPress={() => navigation.navigate(route.params.tabSearch ? 'TabSearchDetailFoto' : 'DetailFoto', {id: item.id, foto: item.Foto, title: item.JudulFoto, userId: item.UserID, deskripsi: item.DeskripsiFoto, kategoriId: item.KategoriID, favorite: item.Favorit, DataUser: item.DataUser, tabSearch: route.params.tabSearch, member: item.Membership})} />
                    ))
                }
                </View>
                <View style={{flex: 1}}>
                {
                    data.filter((item, index) => index % 2 == 1).map((item) => (
                        <Pin key={item.id} foto={item.Foto} title={item.JudulFoto} id={item.id} onPress={() => navigation.navigate(route.params.tabSearch ? 'TabSearchDetailFoto' : 'DetailFoto', {id: item.id, foto: item.Foto, title: item.JudulFoto, userId: item.UserID, deskripsi: item.DeskripsiFoto, kategoriId: item.KategoriID, favorite: item.Favorit, DataUser: item.DataUser, tabSearch: route.params.tabSearch, member: item.Membership})} />
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
    }

    const fetchData = async () => {
        await setLoad(true)
        await fetchKomen()
        await setLike(route.params.favorite)
        await setFollow(route.params.follow === true ? 'Diikuti' : 'Ikuti')
        await setLoad(false)
    };

    const dataFollow = async () => {
        setFollow(follow === 'Diikuti' ? 'Ikuti' : 'Diikuti')
        await getFollowApi({
            userId: route.params.userId
        })
    }

    useEffect(() => {
        setKomentarList([])
        fetchData()
    }, [route.params.id, route.params.favorite, route.params.follow]);

    // if (!load) {
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
                <LoaderScreen color={'white'} overlay={true} backgroundColor={'rgba(0, 0, 0, 0.2)'} containerStyle={{display: load ? 'block' : 'none'}}/>
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
                                            onPress={()=>navigation.navigate(route.params && route.params.sendiri !== true ? route.params.tabSearch ? 'TabSearchProfileLain' : 'ProfileLain' : 'Profile', route.params && route.params.sendiri !== true ? {userId: route.params.userId, username: route.params.DataUser.Username, fotoProfile: route.params.DataUser.FotoProfil, follow: follow, tabSearch: route.params.tabSearch} : {})}
                                        >
                                            <Text marginL-10 style={[assets.fonts.bold, {fontSize: 15}]}>{route.params.DataUser.Username}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {
                                        route.params && route.params.sendiri !== true ? (
                                            <ButtonC label={follow} labelStyle={{color: follow === 'Diikuti' ? 'black' : 'white'}} style={{borderWidth: follow === 'Diikuti' ? 1 : 0}} borderRadius={10} backgroundColor={follow === 'Diikuti' ? 'white' :  assets.colors.button } onPress={()=>dataFollow()} />
                                        ) : null
                                    }
                                </View>
                                <View paddingH-25 style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Text style={[style.text, {}]}>{route.params.title}</Text>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        {
                                            route.params && route.params.member ? (
                                                <View marginR-5 padding-5 style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: assets.colors.button, borderRadius: 5}}>
                                                    <Icon5 name="crown" size={10} color={"#FFE500"} solid />
                                                    <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 9, marginLeft: 5, color: "#FFE500" }}>PICTSEA+</Text>
                                                </View>
                                            ) : null
                                        }
                                        <Like fotoId={route.params.id} like={like} />
                                    </View>
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
                    snapTo={'40%'}
                    backgroundColor={'white'}
                    backDropColor={'black'}
                >
                    <Text style={[assets.fonts.bold, {textAlign: 'center', fontSize: 18}]}>Opsi</Text>
                    <View paddingH-25>
                        <View style={assets.styleDefault.garis2}/>
                    </View>
                    <View marginH-30>
                        <TouchableOpacity
                            onPress={()=>{
                                downloadImage(route.params.foto, route.params.title)
                            }}      
                        >
                            <Text color='black' style={[{fontSize: 18, marginVertical: 13}, assets.fonts.default]}>Unduh Gambar</Text>
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
                    snapTo={heightbottomreport}
                    backgroundColor={'white'}
                    backDropColor={'black'}
                >
                    <Text style={[assets.fonts.bold, {textAlign: 'center', fontSize: 18}]}>Laporkan Foto</Text>
                    <View paddingH-25>
                        <View style={assets.styleDefault.garis2}/>
                    </View>
                    <View marginH-30>
                        <Text style={[assets.fonts.bold]}>Alasan :</Text>
                        <View>
                            <View paddingV-5 style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Icon color={'grey'} name="circle-plus" size={20} solid/>
                                <TextInput
                                    value={reportfoto}
                                    placeholder="Tambahkan alasan mengapa anda ingin melaporkan foto ini"
                                    onChangeText={(txt) => setReportFoto(txt)}
                                    placeholderTextColor={'grey'}
                                    multiline={true} 
                                    numberOfLines={4}
                                    style={[{ flex: 1, width: '100%', color: 'black', marginLeft: 10}, assets.fonts.input]}
                                    onFocus={()=>setHeightBottomReport('75%')}
                                    onBlur={()=>setHeightBottomReport("59%")}
                                />
                            </View>
                            <View style={{alignItems: 'flex-end'}}>
                                <ButtonC
                                    label='Laporkan Foto'
                                    borderRadius={10}
                                    backgroundColor={assets.colors.button}
                                    style={{elevation: 0}}
                                    onPress={async ()=>{
                                        const report = await reportFoto({
                                            foto_id: route.params.id,
                                            alasan: reportfoto
                                        }).then(async (res)=>{
                                            if (!res.IsError) {
                                                await setReportFoto('')
                                                await setModal(true)
                                                setPesan('Berhasil report foto')
                                                setTimeout(()=>{
                                                    setModal(false)
                                                }, 3000)
                                            }
                                        })
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </BottomSheet>

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
    // }
}

const style = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        fontSize: 15
    },
})

export default DetailPencarian