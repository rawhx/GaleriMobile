import React, { useCallback, useEffect, useRef, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome6"
import { Image, LoaderScreen, Text, TouchableOpacity, View } from "react-native-ui-lib";
import { ButtonC, DataKomentar, Header, ImageBg, InputKomentar, Like, ModalC, Pin, ViewAddKomentar, container } from "../../components";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { assets } from "../../assets";
import BottomSheetKomentar from "../../components/bottomsheet/bottomsheetKomentar";
import BottomSheet, { BottomSheetMethods } from "../../components/bottomsheet";
import { EditFoto, deleteFoto, getKomentarApi, getUserCari, postKomentar, postLike } from "../../api/api";
import { Alert, StyleSheet, TextInput } from "react-native";

const DetailPencarianProfile = ({route, navigation}) => {
    const bottomSheetRef = useRef<BottomSheetMethods>(null);
    const bottomSheetRefKomentar = useRef<BottomSheetMethods>(null);
    const pressHandlerKomentar = useCallback(() => {
        bottomSheetRefKomentar.current?.expand();
    }, [])
    const pressHandler = useCallback(() => {
        bottomSheetRef.current?.expand();
    }, [])

    const [load, setLoad] = useState(true)
    const [like, setLike] = useState(route.params.favorite)
    const [addKomentar, setAddKomentar] = useState()
    const [sendKomen, setSendKomen] = useState(false)
    const [komentarList, setKomentarList] = useState([]);
    const [getDataDetail, setGetDataDetail] = useState({
        komentarAwal: {
            count: 0
        }
    })
    const [dataFoto, setDataFoto] = useState({})
    const [formData, setFormData] = useState({})
    const [modal, setModal] = useState(false)
    const [modalnotif, setModalNotif] = useState(false)
    const [pesan, setPesan] = useState('')
    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

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

    const fetchKomen = async () => {
        // const user = await getUserCari({id: route.params.userId})
        const komentarAwal = await getKomentarApi({fotoId: route.params.id, limit: 2})
        setGetDataDetail({
            // username: user.Username,
            // profile: user.FotoProfil,
            komentarAwal: komentarAwal,
        })
        console.log(1);   
    }

    const fetchData = async () => {
        await fetchKomen()
        await setLike(route.params.favorite)
        await setLoad(false)
    };

    useEffect(() => {
        setKomentarList([])
        fetchData()
        setFormData({
            foto_id: route.params.id,
            judul_foto: route.params.title,
            deskripsi_foto: route.params.deskripsi,
        })
        setDataFoto({
            title: route.params.title,
            deskripsi: route.params.deskripsi,
        })
    }, [route.params.id, route.params.favorite]);

    // if (!load) {
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
                                <View style={{
                                    justifyContent: 'center',
                                    height: 100,
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                }}>
                                    <View marginT-5 style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                            <TouchableOpacity onPress={()=>navigation.navigate('TabProfile', { id: route.params.id })}>
                                                <View style={{
                                                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                                    height: 35, 
                                                    width: 35, 
                                                    borderRadius: 35,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <Icon name="arrow-left" size={20} color="white" solid style={{elevation: 5}} />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <View style={{flexDirection: 'row'}}>
                                                <TouchableOpacity
                                                onPress={()=>pressHandler()}>
                                                    <View style={{
                                                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                                        height: 35, 
                                                        width: 35, 
                                                        borderRadius: 35,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        marginRight: 10,
                                                    }}>
                                                        <Icon name="pen-to-square" size={20} color="white" solid/>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={async ()=>{
                                                       setModal(true)
                                                    }}
                                                >
                                                    <View style={{
                                                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                                        height: 35, 
                                                        width: 35, 
                                                        borderRadius: 35,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}>
                                                        <Icon name="trash-can" size={20} color="white" solid/>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </ImageBg>
                            <View>
                                <View paddingH-25 marginV-15 style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Text style={[style.text, {}]}>{dataFoto.title}</Text>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    {
                                        route.params && route.params.member ? (
                                            <View marginR-5 padding-5 style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: assets.colors.button, borderRadius: 5}}>
                                                <Icon name="crown" size={10} color={"#FFE500"} solid />
                                                <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 9, marginLeft: 5, color: "#FFE500" }}>PICTSEA+</Text>
                                            </View>
                                        ) : null
                                    }
                                        {/* <TouchableOpacity
                                            onPress={() => {
                                                setLike(like ? false : true)
                                                postLike({foto_id: route.params.id})
                                            }}
                                        >
                                            <Icon name="heart" size={25} color={like ? "red" : "black"} solid={like} />
                                        </TouchableOpacity> */}
                                        <Like fotoId={route.params.id} like={like} />
                                    </View>
                                </View>
                                <View paddingH-25 marginT-10>
                                    <Text style={[assets.fonts.default, {textAlign: 'justify'}]}>{dataFoto.deskripsi}</Text>
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
                    </ScrollView>
                </View>
    
                <BottomSheet
                    ref={bottomSheetRef}
                    snapTo={'60%'}
                    backgroundColor={'white'}
                    backDropColor={'black'}
                >
                    <Text style={[assets.fonts.bold, {textAlign: 'center', fontSize: 18}]}>Edit Info</Text>
                    <View paddingH-25>
                        <View style={assets.styleDefault.garis2}/>
                    </View>
                    <View marginH-30>
                        <View>
                            <Text style={[assets.fonts.default, {fontSize: 15}]}>Judul Foto </Text>
                            <View paddingV-5 style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Icon color={'grey'} name="circle-plus" size={20} solid/>
                                <TextInput
                                    value={formData.judul_foto}
                                    placeholder="Tambahkan judul foto, “Hewan Bagusku”"
                                    onChangeText={txt => handleInputChange('judul_foto', txt)}
                                    placeholderTextColor={'grey'}
                                    multiline={false} 
                                    numberOfLines={3}
                                    style={[{ flex: 1, width: '100%', color: 'black', marginLeft: 10}, assets.fonts.input]}
                                />
                            </View>
                        </View>
                        <View>
                            <Text style={[assets.fonts.default, {fontSize: 15}]}>Deskripsi Foto</Text>
                            <View paddingV-5 style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Icon color={'grey'} name="circle-plus" size={20} solid/>
                                <TextInput
                                    numberOfLines={3}
                                    value={formData.deskripsi_foto}
                                    placeholder="Tambahkan deskripsi seperti, “Gambar foto makanan ini cocok untuk tugasku”"
                                    onChangeText={txt => handleInputChange('deskripsi_foto', txt)}
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
                                    const data = await EditFoto(formData)
                                    if (!data.IsError) {
                                        bottomSheetRef.current?.close();
                                        setDataFoto({
                                            title: data.Data[0].JudulFoto,
                                            deskripsi: data.Data[0].DeskripsiFoto
                                        })
                                    }
                                }}
                            />
                        </View>
                    </View>
                </BottomSheet>
                <BottomSheetKomentar
                    ref={bottomSheetRefKomentar}
                    snapTo={'90%'}
                    backgroundColor={'white'}
                    fotoId={route.params.id}
                    backDropColor={'black'}
                />

                <ModalC
                    visible={modal}
                    setModal={setModal}
                    styleContainer={{
                        alignItems: '',
                        justifyContent: ''
                    }}
                >
                    <>
                        <Text style={[assets.fonts.bold, {fontSize: 15, textAlign: 'center', color: assets.colors.red}]}>Hapus Postingan?</Text>
                        <View paddingH-10>
                            <View style={assets.styleDefault.garis2}/>
                        </View>
                        <Text style={[assets.fonts.default, {textAlign: 'center'}]}>Apakah anda yakin untuk {'\n'} menghapus postingan ini?</Text>
                        <View marginT-10 style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <ButtonC
                                labelStyle={{color: 'black'}}
                                label='Batal'
                                borderRadius={10}
                                backgroundColor={'white'}
                                style={{elevation: 0, marginRight: 10, borderWidth: 1}}
                                onPress={async ()=>{
                                    setModal(false)
                                }}
                            />
                            <ButtonC
                                label='Hapus'
                                borderRadius={10}
                                backgroundColor={assets.colors.red}
                                style={{elevation: 0}}
                                onPress={async ()=>{
                                    await setModal(false)
                                    await setLoad(true)
                                    await deleteFoto(route.params.id).then((res)=>{
                                        if(res.IsError === false) {
                                            setLoad(false)
                                            navigation.navigate('TabProfile', { id: null })
                                        } else {
                                            setPesan('Coba beberapa saat lagi')
                                            setLoad(false)
                                            setModalNotif(true)
                                            setTimeout(()=>{
                                                setModal(true)
                                                setModalNotif(false)
                                            }, 3000)
                                        }
                                    }).catch((err)=>{
                                        console.log('====================================');
                                        console.log(err);
                                        console.log('====================================');
                                        if (err.response.status) {
                                            setPesan('Silahkan melakukan login ulang')
                                        } else {
                                            setPesan('Coba beberapa saat lagi')
                                        }
                                        setLoad(false)
                                        setModalNotif(true)
                                        setTimeout(()=>{
                                            setModalNotif(false)
                                            setModal(true)
                                        }, 3000)
                                    })
                                }}
                            />
                        </View>
                    </>
                </ModalC>

                <ModalC
                    style={{
                        justifyContent: '',
                        zIndex: 9999
                    }}
                    overlayBackgroundColor='transparent'
                    visible={modalnotif}
                    setModal={setModalNotif}
                    styleContainer={{
                        minHeight: 0,
                        minWidth: 0,
                        padding: 5,
                        bordeRadius: 2,
                        marginTop: 10,
                        zIndex: 9999
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

export default DetailPencarianProfile