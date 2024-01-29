import React, { useEffect, useState } from "react"
import { Text, View } from "react-native-ui-lib"
import { ButtonC, Input, Select, container } from "../../components"
import { assets } from "../../assets"
import { kategoriApi } from "../../api/api"
import { ScrollView } from "react-native"

const AddFoto = () => {
    const [apiKategori, setKategori] = useState()
    const getData = async () => {
        const kategori = await kategoriApi()
        setKategori(kategori)
        
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <View style={container.defaultTab}>
            <ScrollView>
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
                            style={[assets.fonts.default, {
                                backgroundColor: '#F5F5F5',
                                borderRadius: 10,
                                paddingHorizontal: 15,
                            }]}
                        />
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
                            multiline={true} 
                        />
                    </View>
                    <View marginV-10>
                        <Text style={assets.fonts.bold}>Kategori</Text>
                        <Select
                            dataSelect={apiKategori}
                            backgroundColor='#F5F5F5'
                        />
                    </View>
                    <View marginV-10>
                        <Text style={assets.fonts.bold}>Album</Text>
                        <Select
                            dataSelect={apiKategori}
                            backgroundColor='#F5F5F5'
                        />
                    </View>
                    <View marginV-10>
                        <Text style={assets.fonts.bold}>Jenis Foto</Text>
                        <View style={{flexDirection: 'row'}}>
                            <View marginR-10>
                                <ButtonC
                                    label="Gratis"
                                    labelStyle={{color: 'black'}}
                                    borderRadius={5}
                                    backgroundColor={'white'}
                                    style={{borderWidth: 1, width: 130}}
                                />
                            </View>
                            <View>
                                <ButtonC
                                    label="Membership"
                                    labelStyle={{color: 'black'}}
                                    borderRadius={5}
                                    backgroundColor={'white'}
                                    style={{borderWidth: 1, width: 130}}
                                />
                            </View>
                        </View>
                        <ButtonC
                            label="Unggah"
                            borderRadius={5}
                            backgroundColor={assets.colors.button}
                            style={{borderWidth: 1}}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default AddFoto