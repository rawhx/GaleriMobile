import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, TextInput } from "react-native";
import { LoaderScreen, Text, TouchableOpacity, View } from "react-native-ui-lib";
import { ButtonC, ModalC, Pin, container } from "../../components";
import Icon from "react-native-vector-icons/FontAwesome6"
import { assets } from "../../assets";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetMethods } from "../../components/bottomsheet";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../../../config";
import { deleteAlbum, editAlbum } from "../../api/api";

const DetailAlbum = ({ route, navigation }) => {
    console.log('album id', route.params.dataAlbum.id);
    console.log('profil id', route.params.dataAlbum.UserID);
    const [modalnotif, setModalNotif] = useState(false);
    const [modal, setModal] = useState(false);
    const [pesan, setPesan] = useState();
    const [load, setLoad] = useState(false);
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({});
    const [album, setAlbum] = useState({
        nama: route.params.dataAlbum.NamaAlbum,
        deskripsi: route.params.dataAlbum.Deskripsi,
    })
    const bottomSheetRef = useRef<BottomSheetMethods>(null);
    const pressHandler = useCallback(() => {
        bottomSheetRef.current?.expand();
    }, [])
    var tanggalParsed = new Date(route.params.dataAlbum.TanggalDibuat);
    var tanggalUbahFormat = ("0" + tanggalParsed.getDate()).slice(-2) + "/" + ("0" + (tanggalParsed.getMonth() + 1)).slice(-2) + "/" + tanggalParsed.getFullYear();

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const fetchData = async () => {
        const jwtToken = await AsyncStorage.getItem('cache')
        let url = `${config.Base_url}/foto-cari/profil?keduanya=true&page=1&limit=20&album_id=${route.params.dataAlbum.id}`
        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${jwtToken}` }
        });

        setData(response.data.Data);
    };

    useEffect(() => {
        setFormData({
            album_id: route.params.dataAlbum.id,
            nama_album: route.params.dataAlbum.NamaAlbum,
            deskripsi_album: route.params.dataAlbum.Deskripsi
        })
        fetchData()
    }, [route.params.dataAlbum.id]);

    const Grid = () => {
        if (data) {
            return (
                <View style={{ flexDirection: 'row' }} marginT-10>
                    <View style={{ flex: 1 }}>
                        {
                            data.filter((item, index) => index % 2 == 0).map((item) => (
                                <Pin key={item.id} foto={item.Foto} title={item.JudulFoto} id={item.id} onPress={() => navigation.navigate('DetailFotoAlbum', { id: item.id, foto: item.Foto, title: item.JudulFoto, userId: item.UserID, deskripsi: item.DeskripsiFoto, kategoriId: item.KategoriID, favorite: item.Favorit, DataUser: item.DataUser, AlbumId: item.AlbumID })} />
                            ))
                        }
                    </View>
                    <View style={{ flex: 1 }}>
                        {
                            data.filter((item, index) => index % 2 == 1).map((item) => (
                                <Pin key={item.id} foto={item.Foto} title={item.JudulFoto} id={item.id} onPress={() => navigation.navigate('DetailFotoAlbum', { id: item.id, foto: item.Foto, title: item.JudulFoto, userId: item.UserID, deskripsi: item.DeskripsiFoto, kategoriId: item.KategoriID, favorite: item.Favorit, DataUser: item.DataUser, AlbumId: item.AlbumID })} />
                            ))
                        }
                    </View>
                </View>
            )
        } else {
            return (
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 13 }}>Tidak ada foto</Text>
                </View>
            )
        }
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <LoaderScreen color={'white'} overlay={true} backgroundColor={'rgba(0, 0, 0, 0.2)'} containerStyle={{ display: load ? 'block' : 'none' }} />
            <ScrollView style={container.defaultTab}>
                <View style={{ borderBottomWidth: 0.5, }}>
                    <View marginT-20 marginB-10>
                        <View marginH-10>
                            <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.goBack()}
                                        style={{ width: 20, alignItems: 'center' }}
                                    >
                                        <Icon name="arrow-left" size={20} color="black" />
                                    </TouchableOpacity>
                                    {/* <Text style={[{ fontSize: 16.5, fontFamily: 'Poppins-SemiBold', marginLeft: 10 }]} >Album Saya</Text> */}
                                </View>
                                {route.params.dataAlbum.NamaAlbum !== 'Default' ? (
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity
                                            onPress={() => pressHandler()}
                                            style={{ width: 20, alignItems: 'center' }}
                                        >
                                            <Icon name="pen-to-square" size={20} color="black" />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={async () => {
                                                setModal(true)
                                            }}
                                            style={{ width: 20, alignItems: 'center', marginLeft: 10 }}
                                        >
                                            <Icon name="trash-can" size={20} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                ) : null}
                            </View>
                        </View>
                        <View>
                            <Text style={[assets.fonts.bold, { fontSize: 17, textAlign: 'center' }]}>{album.nama}</Text>
                            <Text style={[assets.fonts.default, { textAlign: 'justify', fontSize: 11, paddingHorizontal: 20 }]}>{album.deskripsi}</Text>
                            <Text style={[assets.fonts.default, { fontSize: 11, textAlign: 'right', marginRight: 20 }]}>{tanggalUbahFormat}</Text>
                        </View>
                    </View>
                </View>
                <View marginH-20 marginV-10>
                    <Text style={[{ fontFamily: 'Poppins-SemiBold', fontSize: 12 }]}>{route.params.dataAlbum.Jumlah} Foto</Text>
                    {Grid()}
                </View>
            </ScrollView>

            <BottomSheet
                ref={bottomSheetRef}
                snapTo={'58%'}
                backgroundColor={'white'}
                backDropColor={'black'}
            >
                <Text style={[assets.fonts.bold, { textAlign: 'center', fontSize: 18 }]}>Edit Album</Text>
                <View paddingH-25>
                    <View style={assets.styleDefault.garis2} />
                </View>
                <View marginH-30>
                    <View>
                        <Text style={[assets.fonts.default, { fontSize: 15 }]}>Nama Album </Text>
                        <View paddingV-5 style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon color={'grey'} name="circle-plus" size={20} solid />
                            <TextInput
                                value={formData.nama_album}
                                placeholder="Tambahkan judul seperti, “Hewan Bagusku”"
                                onChangeText={txt => handleInputChange('nama_album', txt)}
                                placeholderTextColor={'grey'}
                                multiline={false}
                                numberOfLines={2}
                                style={[{ flex: 1, width: '100%', color: 'black', marginLeft: 10 }, assets.fonts.input]}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={[assets.fonts.default, { fontSize: 15 }]}>Deskripsi Album</Text>
                        <View paddingV-5 style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon color={'grey'} name="circle-plus" size={20} solid />
                            <TextInput
                                numberOfLines={3}
                                value={formData.deskripsi_album}
                                placeholder="Tambahkan deskripsi seperti, “Gambar foto makanan ini cocok untuk tugasku”"
                                onChangeText={txt => handleInputChange('deskripsi_album', txt)}
                                placeholderTextColor={'grey'}
                                multiline={true}
                                style={[{ flex: 1, width: '100%', color: 'black', marginLeft: 10 }, assets.fonts.input]}
                            />
                        </View>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <ButtonC
                            label='Simpan'
                            borderRadius={10}
                            backgroundColor={assets.colors.button}
                            style={{ elevation: 0 }}
                            onPress={async () => {
                                await handleInputChange('album_id', route.params.dataAlbum.id)
                                await editAlbum(formData).then((res) => {
                                    if (res.IsError) {
                                        setModalNotif(true)
                                        setPesan(res.ErrMsg)
                                        return
                                    }
                                    bottomSheetRef.current?.close();
                                    console.log(res.Data[0]);
                                    
                                    setAlbum({
                                        nama: res.Data[0].NamaAlbum,
                                        deskripsi: res.Data[0].Deskripsi
                                    })
                                    setModalNotif(true)
                                    setPesan('Berhasil melakukan edit album')
                                    setTimeout(() => {
                                        setModalNotif(false)
                                    }, 2000)
                                }).catch((err) => {
                                    if (err.response) {
                                        console.error('Error Edit album Response Data:', err.response.data);
                                        console.error('Error Edit album Response Status:', err.response.status);
                                    } else if (err.request) {
                                        console.error('Error Edit album Request:', err.request);
                                    } else {
                                        console.error('Error Edit album Message:', err.message);
                                    }
                                })
                                // setFormData({})
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
                    justifyContent: ''
                }}
            >
                <>
                    <Text style={[assets.fonts.bold, { fontSize: 15, textAlign: 'center', color: assets.colors.red }]}>Hapus Album?</Text>
                    <View paddingH-10>
                        <View style={assets.styleDefault.garis2} />
                    </View>
                    <Text style={[assets.fonts.default, { textAlign: 'center' }]}>Apakah anda yakin untuk {'\n'} menghapus album ini?</Text>
                    <View marginT-10 style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <ButtonC
                            labelStyle={{ color: 'black' }}
                            label='Batal'
                            borderRadius={10}
                            backgroundColor={'white'}
                            style={{ elevation: 0, marginRight: 10, borderWidth: 1 }}
                            onPress={async () => {
                                setModal(false)
                            }}
                        />
                        <ButtonC
                            label='Hapus'
                            borderRadius={10}
                            backgroundColor={assets.colors.red}
                            style={{ elevation: 0 }}
                            onPress={async () => {
                                await setModal(false)
                                await setLoad(true)
                                await deleteAlbum({ album_id: route.params.dataAlbum.id, user_id: route.params.dataAlbum.UserID }).then((res) => {
                                    if (res.IsError === false) {
                                        console.log(res);
                                        const currentTime = new Date();
                                        const formattedTime = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
                                        navigation.navigate('TabProfile', { album: formattedTime })
                                        setLoad(false)
                                    } else {
                                        setPesan('Coba beberapa saat lagi')
                                        setLoad(false)
                                        setModalNotif(true)
                                        setTimeout(() => {
                                            setModal(true)
                                            setModalNotif(false)
                                        }, 3000)
                                    }
                                }).catch((err) => {
                                    if (err.response) {
                                        console.error('Error hapus album Response Data:', err.response.data);
                                        console.error('Error hapus album Response Status:', err.response.status);
                                    } else if (err.request) {
                                        console.error('Error hapus album Request:', err.request);
                                    } else {
                                        console.error('Error hapus album Message:', err.message);
                                    }
                                    setPesan(err.response.data)
                                    setLoad(false)
                                    setModalNotif(true)
                                    setTimeout(() => {
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
                    <Text marginB-5 style={[assets.fonts.bold, { fontSize: 13, textAlign: 'center' }]}>{pesan}</Text>
                </>
            </ModalC>
        </GestureHandlerRootView>
    )
}

export default DetailAlbum