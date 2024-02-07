import React, { useCallback, useEffect, useRef, useState } from "react"
import { Image, LoaderScreen, Text, TouchableOpacity, View } from "react-native-ui-lib"
import { BelumLogin, ButtonC, ImageBg, Input, Select, container } from "../../components"
import { assets } from "../../assets"
import { addFoto, cariAlbum, kategoriApi } from "../../api/api"
import { ImageBackground, ScrollView, StyleSheet } from "react-native"
import DocumentPicker from 'react-native-document-picker'
import RNFS from 'react-native-fs'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from "react-native-vector-icons/FontAwesome6"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { GestureHandlerRootView, RefreshControl } from "react-native-gesture-handler"
import BottomSheet, { BottomSheetMethods } from "../../components/bottomsheet"
import ImageCompressor from 'react-native-image-compressor';

const AddFoto = () => {
    const [jenisFotoSelect, setJenisFoto] = useState(null)
    const [loading, setLoading] = useState(false)
    const [selectedKategori, setSelectedKategori] = useState('');
    const [selectedAlbum, setSelectedAlbum] = useState('');
    const [judul, setJudul] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [previewData, setPreviewData] = useState(null);
    const [apiKategori, setKategori] = useState()
    const [apiAlbum, setAlbum] = useState()
    const [visible, setVisible] = useState(false)
    const bottomSheetRef = useRef<BottomSheetMethods>(null);
    const pressHandler = useCallback(() => {
        bottomSheetRef.current?.expand();
    }, [])

    const [formData, setFormData] = useState(new FormData())
    const handleInputChange = (name, value) => {
        formData.append(name, value);
    };

    const Refresh = () => {
        setFormData(new FormData())
        setSelectedKategori('')
        setSelectedAlbum('')
        setJudul('')
        setDeskripsi('')
        setJenisFoto(null)
        setPreviewData(null)
        setLoading(false)
    }
    
    const getData = async () => {
        const kategori = await kategoriApi()
        const dataAlbum = await cariAlbum({select: true})
        setVisible(false)
        setKategori(kategori)
        setAlbum(dataAlbum)
        
    }
    useEffect(() => {
        setVisible(true)
        getData()
    }, [])

    const uploadFile = async () => {
        const pickImg = await DocumentPicker.pick({
            type: [DocumentPicker.types.images],
        });

        if (pickImg) {
            const fileUri = pickImg[0].uri
            handleInputChange('foto', {
                uri: fileUri,
                name: pickImg[0].name,
                type: pickImg[0].type
            })
            const data = await RNFS.readFile(fileUri, 'base64')
            await setPreviewData(data)
            bottomSheetRef.current?.close();
        } else {
            if (DocumentPicker.isCancel(pickImg)) {
                console.log('Pemilihan dibatalkan');
            } else {
                console.error('Error picking image:', pickImg);
            }
        }
    }

    const uploadCamera = async (isCamera: boolean) => {
        const options = {
            mediaType: 'photo',
        };
      
        try {
            const response = await launchCamera(options);
            const fileUri = response.assets[0].uri
            const data = await RNFS.readFile(fileUri, 'base64')
            await setPreviewData(data)
            handleInputChange('foto', {
                uri: fileUri,
                name: response.assets[0].fileName,
                type: response.assets[0].type
            })
            bottomSheetRef.current?.close();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <LoaderScreen color={'white'} overlay={true} backgroundColor={'rgba(0, 0, 0, 0.2)'} containerStyle={{display: visible ? 'block' : 'none'}}/>
            <View style={container.defaultTab}>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={Refresh} />
                    }
                >
                    <View center marginT-20 paddingH-15>
                        <Text style={[assets.fonts.judul, {fontSize: 20}]}>Apa Postingan Barumu?</Text>
                        <Text color="grey" style={[assets.fonts.default, {textAlign: 'center', fontSize: 10}]}>
                            Jika Anda ingin mengunggah foto untuk layanan keanggotaan, harap tunggu persetujuan dari admin terlebih dahulu agar foto dapat dikonfirmasi dan muncul di halaman tersebut. Jika tidak ada konfirmasi lebih lanjut, pengguna dapat menghubungi admin melalui informasi kontak yang tersedia pada halaman 'Tentang Kami
                        </Text>
                        <View style={assets.styleDefault.garis2}/>
                    </View>
                    <View paddingH-15>
                        <View marginV-10>
                            <Text style={assets.fonts.bold}>Judul Foto</Text>
                            <Input
                                placeholder="Buat judul untuk foto kamu"
                                value={judul}
                                style={[assets.fonts.default, {
                                    backgroundColor: '#F5F5F5',
                                    borderRadius: 10,
                                    paddingHorizontal: 15,
                                }]}
                                onChangeText={txt=>{
                                    setJudul(txt)
                                    // formData.append('judul_foto', txt)
                                    handleInputChange('judul_foto', txt)
                                }}
                            />
                        </View>
                        <View marginV-10>
                            {
                                previewData ? (
                                    <ImageBg foto={previewData}>
                                        <TouchableOpacity onPress={()=>pressHandler()} style={Style.overlay}>
                                            <View style={{
                                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                                height: 35, 
                                                width: 35, 
                                                borderRadius: 35,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                <Icon name="pen-to-square" size={15} color="white" solid style={{elevation: 5}} />
                                            </View>
                                        </TouchableOpacity>
                                    </ImageBg>
                                ) : (
                                    <View center style={{
                                        width: '100%',
                                        height: 300,
                                        backgroundColor: '#F5F5F5',
                                        borderRadius: 10
                                    }}>
                                        <Image source={assets.images.downloadIcon} style={{
                                            width: 50, 
                                            resizeMode: 'contain',
                                        }}/>
                                        <Text marginT-10 style={[assets.fonts.bold, {fontSize: 15}]}>Unggah foto disini</Text>
                                        <ButtonC
                                            label="Unggah Foto"
                                            backgroundColor={assets.colors.button}
                                            borderRadius={10}
                                            onPress={()=>pressHandler()}
                                        />
                                    </View>
                                )
                            }
                        </View>
                        <View marginV-10>
                            <Text style={assets.fonts.bold}>Deskripsi</Text>
                            <Input
                                placeholder="Tulis deskripsimu disini"
                                style={[assets.fonts.default, {
                                    backgroundColor: '#F5F5F5',
                                    borderRadius: 10,
                                    paddingHorizontal: 15,
                                }]}
                                value={deskripsi}
                                multiline={true} 
                                onChangeText={txt=>{
                                    setDeskripsi(txt)
                                    handleInputChange('deskripsi_foto', txt)
                                }}
                            />
                        </View>
                        <View marginV-10>
                            <Text style={assets.fonts.bold}>Kategori</Text>
                            <Select
                                dataSelected={selectedKategori}
                                dataSelect={apiKategori}
                                backgroundColor='#F5F5F5'
                                val={(val, label)=>{
                                    console.log('kategori', val, label)
                                    setSelectedKategori(label)
                                    handleInputChange('kategori_id', val)
                                }}
                            />
                        </View>
                        <View marginV-10>
                            <Text style={assets.fonts.bold}>Album</Text>
                            <Select
                                dataSelected={selectedAlbum}
                                dataSelect={apiAlbum}
                                backgroundColor='#F5F5F5'
                                val={(val, label)=>{
                                    console.log('album_id', val, label);
                                    setSelectedAlbum(label)
                                    handleInputChange('album_id', val)
                                }}
                            />
                        </View>
                        <View marginV-10>
                            <Text style={assets.fonts.bold}>Jenis Foto</Text>
                            <View style={{flexDirection: 'row'}}>
                                <View marginR-10>
                                    <ButtonC
                                        label="Gratis"
                                        labelStyle={{color: jenisFotoSelect == 'gratis' ? 'white' : 'black'}}
                                        borderRadius={5}
                                        backgroundColor={jenisFotoSelect == 'gratis' ? assets.colors.button : 'white' }
                                        style={{borderWidth: 1, width: 130}}
                                        onPress={()=>{
                                            setJenisFoto('gratis')
                                            // handleFoto(false)
                                        }}
                                    />
                                </View>
                                <View>
                                    <ButtonC
                                        label="Membership"
                                        labelStyle={{color: jenisFotoSelect == 'member' ? 'white' : 'black'}}
                                        borderRadius={5}
                                        backgroundColor={jenisFotoSelect == 'member' ? assets.colors.button : 'white'}
                                        style={{borderWidth: 1, width: 130}}
                                        onPress={()=>{
                                            setJenisFoto('member')
                                            // handleFoto(true)
                                        }}
                                    />
                                </View>
                            </View>
                            <ButtonC
                                label="Unggah"
                                borderRadius={5}
                                backgroundColor={assets.colors.button}
                                style={{borderWidth: 1}}
                                onPress={()=>{
                                    handleInputChange('membership', jenisFotoSelect === 'member'? true : false)
                                    setVisible(true)
                                    let oprasi = addFoto(formData)
                                    if (oprasi) {
                                        Refresh()
                                        setVisible(false)
                                    }
                                }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>

            <BottomSheet
                ref={bottomSheetRef}
                snapTo={'35%'}
                backgroundColor={'white'}
                backDropColor={'black'}
            >
                <Text style={[assets.fonts.bold, {textAlign: 'center', fontSize: 18}]}>Buat Kreasimu Sekarang</Text>
                <View paddingH-25>
                    <View style={assets.styleDefault.garis2}/>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={()=>uploadFile()}>
                        <View marginH-20 style={{backgroundColor: assets.colors.button, height: 45, width: 45, justifyContent: 'center', borderRadius: 10, alignItems: 'center'}}>
                            <Icon name="file-image"  color='white' size={25} solid />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>uploadCamera(true)}>
                        <View marginH-20 style={{backgroundColor: assets.colors.button, height: 45, width: 45, justifyContent: 'center', borderRadius: 10, alignItems: 'center'}}>
                            <Icon name="camera" size={25} color='white' solid />
                        </View>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
        </GestureHandlerRootView>
    )
}

export default AddFoto

const Style = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // alignItems: 'center',
    },
})