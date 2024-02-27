import React, { useEffect, useState } from "react";
import { Image, LoaderScreen, Modal, Text, TouchableOpacity, View } from "react-native-ui-lib";
import { ButtonC, Input, container } from "../../components";
import Icon from "react-native-vector-icons/FontAwesome6"
import { assets } from "../../assets";
import RNFS from 'react-native-fs'
import DocumentPicker from 'react-native-document-picker'
import { Alert, ScrollView, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { updateProfile } from "../../api/updateProfile";

const EditProfile = ({ route, navigation }) => {
    const [username, setUsername] = useState(route.params.data.Username)
    const [namalengkap, setNamaLengkap] = useState(route.params.data.NamaLengkap)
    const [alamat, setAlamat] = useState(route.params.data.Alamat)
    const [hp, setHp] = useState(route.params.data.NoHP)
    const [modal, setModal] = useState(false)
    const [img, setImg] = useState(route.params.data.FotoProfil)
    const [formData, setFormData] = useState(new FormData())
    const [visible, setVisible] = useState(false)
    const [pesan, setPesan] = useState()
    const [success, setSuccess] = useState(true)

    const Profile = () => {
        if (img !== ' ') {
            return (
                <View>
                    <Image
                        // source={{ uri: `data:image/png;base64,${route.params.data.FotoProfil}` }}
                        source={{ uri: img.startsWith('https://') ? img : `data:image/png;base64,${img}` }}
                        style={{
                            width: 108,
                            height: 108,
                            borderRadius: 60,
                        }}
                    />
                </View>
            )
        } else {
            return (
                <View>
                    <Icon color={'grey'} name="circle-user" size={100} solid />
                </View>
            )
        }
    }

    const handleInputChange = (name, value) => {
        formData.append(name, value);
    };

    useEffect(() => {
        handleInputChange('foto_profile', img)
        handleInputChange('username', username)
        handleInputChange('nama_lengkap', namalengkap)
        handleInputChange('alamat', alamat)
    }, [])

    const uploadFile = async () => {
        const pickImg = await DocumentPicker.pick({
            type: [DocumentPicker.types.images],
        });

        if (pickImg) {
            const fileUri = pickImg[0].uri
            const data = await RNFS.readFile(fileUri, 'base64')
            setImg(data)
            console.log(pickImg);

            handleInputChange('foto_profil', {
                uri: fileUri,
                name: pickImg[0].name,
                type: pickImg[0].type
            })
        } else {
            if (DocumentPicker.isCancel(pickImg)) {
                console.log('Pemilihan dibatalkan');
            } else {
                console.error('Error picking image:', pickImg);
            }
        }
    }

    return (
        <View style={container.defaultTab}>
            <LoaderScreen color={'white'} overlay={true} backgroundColor={'rgba(0, 0, 0, 0.2)'} containerStyle={{ display: visible ? 'block' : 'none' }} />
            <ScrollView>
                <View marginT-15 marginH-15>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 20, alignItems: 'center' }}>
                            <Icon name="arrow-left" size={20} color="black" />
                        </TouchableOpacity>
                        <Text style={[assets.fonts.bold, { fontSize: 16.5 }]}>Edit Profile</Text>
                        <View style={{ width: 20 }} />
                    </View>

                    <View marginV-20 style={{ alignItems: 'center' }}>
                        {Profile()}
                        <TouchableOpacity
                            onPress={() => {
                                uploadFile()
                            }}
                        >
                            <Text marginT-10 style={[assets.fonts.bold, { textAlign: 'center' }]}>Ubah Foto</Text>
                        </TouchableOpacity>
                    </View>
                    <View marginH-10>
                        <View marginV-10>
                            <Text marginB-10 style={assets.fonts.bold}>Email :</Text>
                            <View style={[style.input]}>
                                <Input
                                    placeholder="Email"
                                    value={route.params.data.Email}
                                    style={[assets.fonts.default, {
                                        backgroundColor: '#F5F5F5',
                                        borderRadius: 10,
                                        paddingHorizontal: 15,
                                    }]}
                                    editable={false}
                                />
                            </View>
                        </View>
                        <View marginV-10>
                            <Text marginB-10 style={assets.fonts.bold}>Username :</Text>
                            <View style={[style.input]}>
                                <Input
                                    placeholder="Username"
                                    value={username}
                                    style={[assets.fonts.default, {
                                        backgroundColor: 'white',
                                        borderRadius: 10,
                                        paddingHorizontal: 15,
                                    }]}
                                    onChangeText={txt => {
                                        setUsername(txt)
                                        handleInputChange('username', txt)
                                    }}
                                />
                            </View>
                        </View>
                        <View marginV-10>
                            <Text marginB-10 style={assets.fonts.bold}>Nama Lengkap :</Text>
                            <View style={[style.input]}>
                                <Input
                                    placeholder="Nama Lengkap"
                                    value={namalengkap}
                                    style={[assets.fonts.default, {
                                        backgroundColor: 'white',
                                        borderRadius: 10,
                                        paddingHorizontal: 15,
                                    }]}
                                    onChangeText={txt => {
                                        setNamaLengkap(txt)
                                        handleInputChange('nama_lengkap', txt)
                                    }}
                                />
                            </View>
                        </View>
                        <View marginV-10>
                            <Text marginB-10 style={assets.fonts.bold}>No Telepon :</Text>
                            <View style={[style.input]}>
                                <Input
                                    keyboardType="phone-pad"
                                    placeholder="No Telepon"
                                    value={hp}
                                    style={[assets.fonts.default, {
                                        backgroundColor: 'white',
                                        borderRadius: 10,
                                        paddingHorizontal: 15,
                                    }]}
                                    onChangeText={txt => {
                                        setHp(txt)
                                        handleInputChange('no_hp', txt)
                                    }}
                                />
                            </View>
                        </View>
                        <View marginV-10>
                            <Text marginB-10 style={assets.fonts.bold}>Alamat :</Text>
                            <View style={[style.input]}>
                                <Input
                                    placeholder="Alamat"
                                    value={alamat}
                                    style={[assets.fonts.default, {
                                        backgroundColor: 'white',
                                        borderRadius: 10,
                                        paddingHorizontal: 15,
                                    }]}
                                    onChangeText={txt => {
                                        setAlamat(txt)
                                        handleInputChange('alamat', txt)
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }} marginV-20>
                            <ButtonC
                                label='Simpan'
                                borderRadius={10}
                                backgroundColor={assets.colors.button}
                                style={{}}
                                onPress={async () => {
                                    await setVisible(true)
                                    const res = await updateProfile(formData).then((res) => {
                                        if (res.IsError) {
                                            setSuccess(false)
                                            setModal(true)
                                            setPesan(`Username ${username} \n telah digunakan`)
                                            setVisible(false)
                                            return
                                        }
                                        setSuccess(true)
                                        setPesan(`Data anda berhasil \n disimpan!`)
                                        setModal(true)
                                        setVisible(false)
                                    })
                                }}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>

            <Modal
                overlayBackgroundColor={'rgba(0, 0, 0, 0.3)'}
                animationType="fade"
                transparent={true}
                visible={modal}
                onBackgroundPress={() => {
                    setModal(false);
                }}>
                {/* <TouchableWithoutFeedback onPress={() => setModal(false)}> */}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        height: 150,
                        width: 300,
                        borderRadius: 10,
                        shadowOpacity: 5,
                        elevation: 5,
                    }}>
                        {
                            success ? (
                                <View style={{
                                    backgroundColor: 'green',
                                    borderRadius: 100,
                                    padding: 10,
                                    width: 50, // Sesuaikan ukuran sesuai kebutuhan
                                    height: 50, // Sesuaikan ukuran sesuai kebutuhan
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 20
                                }}>
                                    <Icon name="check" size={25} color="white" solid />
                                </View>
                            ) : (
                                <View style={{
                                    backgroundColor: '#C51313',
                                    borderRadius: 100,
                                    padding: 10,
                                    width: 50, // Sesuaikan ukuran sesuai kebutuhan
                                    height: 50, // Sesuaikan ukuran sesuai kebutuhan
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 20
                                }}>
                                    <Icon name="xmark" size={25} color="white" solid />
                                </View>
                            )
                        }
                        <Text style={[assets.fonts.bold, { fontSize: 17, textAlign: 'center' }]}>{pesan}</Text>
                    </View>
                </View>
                {/* </TouchableWithoutFeedback> */}
            </Modal>
        </View>
    )
}

export default EditProfile

const style = StyleSheet.create({
    input: {
        shadowOpacity: 5,
        elevation: 5,
        borderRadius: 10,
    }
})