import React, { useState } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native-ui-lib";
import { ButtonC, Input, container } from "../../components";
import Icon from "react-native-vector-icons/FontAwesome6"
import { assets } from "../../assets";
import { Alert, ScrollView, StyleSheet, TouchableWithoutFeedback } from "react-native";

const EditProfile = ({route, navigation}) => {
    const [username, setUsername] = useState(route.params.data.Username)
    const [namalengkap, setNamaLengkap] = useState(route.params.data.NamaLengkap)
    const [alamat, setAlamat] = useState(route.params.data.Alamat)
    const [modal, setModal] = useState(false)
    const Profile = () => {
        if (!route.params && !route.params.data.FotoProfil) {
            return (
                <View>
                    <Icon color={'grey'} name="circle-user" size={100} solid />
                </View>
            )
        } else {
            return (
                <View>
                    <Image
                    source={{ uri: `data:image/png;base64,${route.params.data.FotoProfil}` }}
                    style={{
                        width: 108,
                        height: 108,
                        borderRadius: 60, 
                    }}
                    />
                </View>
            )
        }
    }

    return (
        <View style={container.defaultTab}>
            <ScrollView>
                <View marginT-15 marginH-15>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 20, alignItems: 'center' }}>
                            <Icon name="arrow-left" size={20} color="black" />
                        </TouchableOpacity>
                        <Text style={[assets.fonts.bold, { fontSize: 16.5 }]}>Edit Profile</Text>
                        <View style={{ width: 20 }} />
                    </View>

                    <View marginV-20 style={{alignItems: 'center'}}>
                        {Profile()}
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
                                    onChangeText={txt=>setUsername(txt)}
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
                                    onChangeText={txt=>setNamaLengkap(txt)}
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
                                    onChangeText={txt=>setAlamat(txt)}
                                />
                            </View>
                        </View>
                        <View style={{alignItems: 'center'}} marginV-20>
                            <ButtonC 
                                label='Simpan'
                                borderRadius={10}
                                backgroundColor={assets.colors.button}
                                style={{}}
                                onPress={()=>setModal(true)}
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
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
                                <Text style={[assets.fonts.bold, {fontSize: 17, textAlign: 'center'}]}>Data anda berhasil {'\n'} disimpan!</Text>
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