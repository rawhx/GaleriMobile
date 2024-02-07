import React, { useCallback, useRef } from "react";
import { ScrollView, TextInput } from "react-native";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";
import { ButtonC, container } from "../../components";
import Icon from "react-native-vector-icons/FontAwesome6"
import { assets } from "../../assets";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetMethods } from "../../components/bottomsheet";

const DetailAlbum = ({route, navigation}) => {
    const bottomSheetRef = useRef<BottomSheetMethods>(null);
    const pressHandler = useCallback(() => {
           bottomSheetRef.current?.expand();
    }, [])
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <ScrollView style={container.defaultTab}>
                <View style={{borderBottomWidth: 0.5,}}>
                    <View marginT-20 marginB-10>
                        <View marginH-10>
                            <View style={[{flexDirection: 'row', justifyContent: 'space-between'}]}>
                                <TouchableOpacity
                                    onPress={()=>navigation.goBack()}
                                    style={{width:20, alignItems: 'center'}}
                                >
                                    <Icon name="arrow-left" size={20} color="black" />
                                </TouchableOpacity>
                                <Text style={[{fontSize: 16.5, fontFamily: 'Poppins-SemiBold'}]} >Album</Text>
                                <TouchableOpacity
                                    onPress={()=>pressHandler()}
                                    style={{width:20, alignItems: 'center'}}
                                >
                                    <Icon name="pen-to-square" size={20} color="black"/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <Text style={[assets.fonts.bold, {fontSize: 17, textAlign: 'center'}]}>{route.params.dataAlbum.NamaAlbum}</Text>
                            <Text style={[assets.fonts.default, {textAlign: 'justify', fontSize: 11, paddingHorizontal: 20}]}>{route.params.dataAlbum.Deskripsi}</Text>
                            <Text style={[assets.fonts.default, {fontSize: 11, textAlign: 'right', marginRight: 20}]}>17/11/2022</Text>
                        </View>
                    </View>
                </View>
                <View marginH-20 marginV-10>
                    <Text style={[{fontFamily: 'Poppins-SemiBold', fontSize: 12}]}>74 Foto</Text>
                </View>
            </ScrollView>

            <BottomSheet
                ref={bottomSheetRef}
                snapTo={'58%'}
                backgroundColor={'white'}
                backDropColor={'black'}
            >
                <Text style={[assets.fonts.bold, {textAlign: 'center', fontSize: 18}]}>Edit Album</Text>
                <View paddingH-25>
                    <View style={assets.styleDefault.garis2}/>
                </View>
                <View marginH-30>
                        <View>
                            <Text style={[assets.fonts.default, {fontSize: 15}]}>Nama Album </Text>
                            <View paddingV-5 style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Icon color={'grey'} name="circle-plus" size={20} solid/>
                                <TextInput
                                    // value={formData.nama_album}
                                    placeholder="Tambahkan judul seperti, “Hewan Bagusku”"
                                    // onChangeText={txt => handleInputChange('nama_album', txt)}
                                    placeholderTextColor={'grey'}
                                    multiline={false} 
                                    numberOfLines={2}
                                    style={[{ flex: 1, width: '100%', color: 'black', marginLeft: 10}, assets.fonts.input]}
                                />
                            </View>
                        </View>
                        <View>
                            <Text style={[assets.fonts.default, {fontSize: 15}]}>Deskripsi Album</Text>
                            <View paddingV-5 style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Icon color={'grey'} name="circle-plus" size={20} solid/>
                                <TextInput
                                    numberOfLines={3}
                                    // value={formData.deskripsi_album}
                                    placeholder="Tambahkan deskripsi seperti, “Gambar foto makanan ini cocok untuk tugasku”"
                                    // onChangeText={txt => handleInputChange('deskripsi_album', txt)}
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
                                    // await addAlbum(formData)
                                    // setFormData({})
                                }}
                            />
                        </View>
                    </View>
            </BottomSheet>
        </GestureHandlerRootView>
    )
}

export default DetailAlbum