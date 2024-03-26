import { Image, Text, TouchableOpacity, View } from "react-native-ui-lib"
import Icon from "react-native-vector-icons/FontAwesome6"
import { assets } from "../../assets"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import config from "../../../config"
import axios from "axios"
import { useNavigation } from "@react-navigation/native"

const ViewSearchUser = (data) => {
    const [dataUser, setDataUser] = useState()
    const navigation = useNavigation()

    const fetchData = async () => {
        const jwtToken = await AsyncStorage.getItem('cache');
        let url
        if (jwtToken) {
            url = `${config.apiUrl}search/user?search=${data.search}&page=1&limit=10`;
        } else {
            url = `${config.apiUrl}search/guest?search=${data.search}&page=1&limit=10`;
        }

        const response = await axios.get(url, {
            headers: jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}
        }).then((res) => {
            console.log('====================================');
            console.log(res.data.Data);
            console.log('====================================');
            setDataUser(res.data.Data)
        }).catch((err) => {
            console.log('====================================');
            console.log('err user cari', err);
            console.log('====================================');
        });
    }

    useEffect(() => {
        fetchData()
    }, [data.search])

    return (
        <View style={{ marginTop: 10 }}>

            {
                dataUser ?
                    dataUser.map((item, index) => (
                        <TouchableOpacity marginV-15
                            key={item.id}
                            onPress={() => {
                                navigation.navigate(item.Sendiri ? 'Profile' : data.pencarian ? 'TabSearchProfileLain' : 'ProfileLain', { userId: item.id, username: item.Username, fotoProfile: item.FotoProfil, tabSearch: data.pencarian, follow: item.Follow ? 'Diikuti' : 'Ikuti' })
                            }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                {item.FotoProfil !== ' ' ? (
                                    <View>
                                        <Image
                                            source={{ uri: item.FotoProfil.startsWith('https://') ? item.FotoProfil : `data:image/png;base64,${item.FotoProfil}` }}
                                            style={{
                                                width: 45,
                                                height: 45,
                                                borderRadius: 60,
                                                backgroundColor: 'rgba(240, 240, 240, 1)',
                                            }}
                                        />
                                    </View>
                                ) : (
                                    <Icon name="circle-user" color="grey" size={45} solid />
                                )}
                                <View style={{ marginLeft: 15 }}>
                                    <View>
                                        <Text style={[assets.fonts.bold, { fontSize: 14 }]}>{item.Username}</Text>
                                        <Text style={[assets.fonts.default]}>{item.NamaLengkap}</Text>
                                    </View>

                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                    : (
                        <Text style={[assets.fonts.default]}>User tidak ditemukan</Text>
                    )
            }
        </View>
    )
}

export default ViewSearchUser