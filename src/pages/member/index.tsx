import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { ButtonC, ModalC, container } from "../../components"
import { Image, LoaderScreen, Text, TouchableOpacity, View } from "react-native-ui-lib"
import Icon from "react-native-vector-icons/FontAwesome6"
import { StyleSheet } from "react-native"
import { assets } from "../../assets"
import AsyncStorage from '@react-native-async-storage/async-storage'
import WebView from "react-native-webview"
import axios from "axios"
import { getUserCari } from "../../api/api"
import config from "../../../config"

const ViewMember = ({route, navigation}) => {
    const [snapToken, setSnap] = useState('')
    const [modal, setModal] = useState(false)
    const [visible, setVisible] = useState(false)
    const [pesan, setPesan] = useState('')
    const [HargaMember, setHargaMember] = useState(route.params.profile.HargaMember || 0)

    const fetchData = async () => {
        await getUserCari({id: route.params.profile.id}).then((res)=>{
            setHargaMember(res.HargaMember)  
        })
    }

    useEffect(()=>{
        setHargaMember(route.params.profile.HargaMember)
        fetchData()
    }, [route.params.profile.id])
    console.log('userId', route.params.profile.id);
    const items = ['Foto premium', 'Foto lebih berkualitas', 'Foto lebih HD']
    const Profile = () => {
        if (route.params.profile.FotoProfil === ' ') {
            return (
                <View marginT-15>
                    <Icon color={'grey'} name="circle-user" size={100} solid />
                </View>
            )
        } else {
            return (
                <View>
                    <Image
                    source={{ uri: (route.params.profile.FotoProfil).startsWith('https://') ? route.params.profile.FotoProfil : `data:image/*;base64,${route.params.profile.FotoProfil}` }}
                    style={styles.profileImage}
                    />
                </View>
            )
        }
    }

    const getSnap = async (id) => {
        const jwtToken = await AsyncStorage.getItem('cache')
        console.log('prosses');
        setVisible(true)
        
        const res = await axios.post(
            `https://picsea-1-k3867505.deta.app/membership-tambah`, {
                user_id: id,
                key: config.API_KEY
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${jwtToken}`,
                },
            }
        );
        return res.data.Data
        // await setSnap(res.data.Data)
        // console.log(res.data.Data);   
    }

    return (
        <SafeAreaView style={[container.defaultTab]}>
              <LoaderScreen color={'white'} overlay={true} backgroundColor={'rgba(0, 0, 0, 0.2)'} containerStyle={{display: visible ? 'block' : 'none'}}/>
            <TouchableOpacity
                style={[{margin: 25}]}
                onPress={()=>{
                    navigation.goBack()
                }}
            >
                <Icon name="arrow-left" size={25} color={"black"} />
            </TouchableOpacity>
            <View center>
                <Profile />
                <Text marginT-20 style={[assets.fonts.boldReal, {fontSize: 18}]}>Langganan {route.params.profile.Username}</Text>
                <Text marginB-10 style={[assets.fonts.default]} color={'grey'}>Rp {(HargaMember).toLocaleString()} per bulan | Habis setelah 30 hari</Text>
                <Text marginV-20 style={[assets.fonts.default]}>Baru baru ini membagikan foto premium</Text>
            </View>
            <View marginH-25>
                <Text marginT-10 marginB-10 style={[assets.fonts.bold]}>Keuntungan Berlangganan</Text>
                <View marginL-10>
                    {items.map((item, index) => (
                        <View key={index} style={{flexDirection: 'row'}}>
                            <Text style={{}}>{'\u2022'}</Text>
                            <Text marginL-10 marginB-10 style={[assets.fonts.default]}>{item}</Text>
                        </View>
                    ))}
                </View>
            </View>
            <View style={{position: 'absolute', bottom: 10, left: 25, right: 25}}>
                <View marginB-10 style={{borderTopWidth: 1}} >
                    <ButtonC
                        onPress={async ()=>{
                            console.log(123)
                            // await navigation.navigate('Pembayaran')
                            const  res = await getSnap(route.params.profile.id).then(async (res)=>{
                                await setSnap(res.Token)
                                setVisible(false)

                                await navigation.navigate('Pembayaran', {snap: res.Token, idTransaksi: res.ID, userId: route.params.profile.id})
                            }).catch((err)=>{
                                setVisible(false)
                                setModal(true)
                                setPesan('Silahkan coba beberapa saat lagi')
                                setTimeout(()=>{
                                    setModal(false)
                                }, 3000)
                            })
                            // setModal(true)
                        }}
                        label='Berlangganan'
                        borderRadius={10}
                        backgroundColor={assets.colors.button}
                        style={{elevation: 0}}
                    />
                </View>
            </View>

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
        </SafeAreaView>
    )   
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileImage: {
      width: 108,
      height: 108,
      borderRadius: 60,  // Setengah dari lebar/tinggi untuk membuat lingkaran
    },
});

export default ViewMember