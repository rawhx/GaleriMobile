import React, { useContext, useEffect, useRef, useState } from 'react'
import { Alert, BackHandler, RefreshControl, ScrollView, StyleSheet, } from 'react-native'
import { ButtonSearch, Header, Pin, ViewSearchUser, container } from '../../components'
import Kategori from './kategori'
import { assets } from '../../assets'
import { Text, TouchableOpacity, View } from 'react-native-ui-lib'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'
import config from '../../../config'
import { banned } from '../../api/banned'

const Home = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [data, setData] = useState([]);
    const [datapopuler, setDataPopuler] = useState([]);
    const [page, setPage] = useState(2);
    const fetchData = async () => {
        const jwtToken = await AsyncStorage.getItem('cache')
        let url = config.apiUrl + 'foto-trending/guest?page=1&limit=20'
        if (jwtToken) {
            url = config.apiUrl + 'foto-trending/user?page=1&limit=20'
        }
        const response = await axios.get(url, {
            headers: jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}
        })

        setDataPopuler(response.data.Data);
    };

    const lastBackPressed = useRef(0);

    useEffect(() => {
        fetchData()
    }, []);

    const Refresh = async () => {
        await setLoading(true)
        await fetchData()
        await setLoading(false)
        console.log('fresh');
    }

    const Grid = () => {
        return (
            <View style={{ flexDirection: 'row' }} marginT-10>
                <View style={{ flex: 1 }}>
                    {
                        datapopuler.filter((item, index) => index % 2 == 0).map((item) => (
                            <Pin key={item.id} foto={item.Foto} title={item.JudulFoto} id={item.id} onPress={() => navigation.navigate('DetailFoto', { id: item.id, foto: item.Foto, title: item.JudulFoto, userId: item.UserID, deskripsi: item.DeskripsiFoto, kategoriId: item.KategoriID, favorite: item.Favorit, DataUser: item.DataUser, sendiri: item.Sendiri, follow: item.Follow, member: item.Membership })} />
                        ))
                    }
                </View>
                <View style={{ flex: 1 }}>
                    {
                        datapopuler.filter((item, index) => index % 2 == 1).map((item) => (
                            <Pin key={item.id} foto={item.Foto} title={item.JudulFoto} id={item.id} onPress={() => navigation.navigate('DetailFoto', { id: item.id, foto: item.Foto, title: item.JudulFoto, userId: item.UserID, deskripsi: item.DeskripsiFoto, kategoriId: item.KategoriID, favorite: item.Favorit, DataUser: item.DataUser, sendiri: item.Sendiri, follow: item.Follow, member: item.Membership })} />
                        ))
                    }
                </View>
            </View>
        )
    }

    const dataSearch = async () => {
        const jwtToken = await AsyncStorage.getItem('cache');
        let url
        if (jwtToken) {
            url = `${config.apiUrl}foto-cari?membership=true&keduanya=true&page=1&limit=10&judul_foto=${search}`;
        } else {
            url = `${config.apiUrl}foto-cari/guest?page=1&limit=20&judul_foto=${search}`
        }
        const response = await axios.get(url, {
            headers: jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}
        });
        setData(response.data.Data);
        setPage(2);
    };

    const GridSearch = () => {
        return (
            <View style={{ flexDirection: 'row' }} marginT-10>
                <View style={{ flex: 1 }}>
                    {
                        data.filter((item, index) => index % 2 == 0).map((item) => (
                            <Pin key={item.id} foto={item.Foto} title={item.JudulFoto} id={item.id} onPress={() => navigation.navigate('DetailFoto', { id: item.id, foto: item.Foto, title: item.JudulFoto, userId: item.UserID, deskripsi: item.DeskripsiFoto, kategoriId: item.KategoriID, favorite: item.Favorit, DataUser: item.DataUser, sendiri: item.Sendiri, follow: item.Follow, member: item.Membership })} />
                        ))
                    }
                </View>
                <View style={{ flex: 1 }}>
                    {
                        data.filter((item, index) => index % 2 == 1).map((item) => (
                            <Pin key={item.id} foto={item.Foto} title={item.JudulFoto} id={item.id} onPress={() => navigation.navigate('DetailFoto', { id: item.id, foto: item.Foto, title: item.JudulFoto, userId: item.UserID, deskripsi: item.DeskripsiFoto, kategoriId: item.KategoriID, favorite: item.Favorit, DataUser: item.DataUser, sendiri: item.Sendiri, follow: item.Follow, member: item.Membership })} />
                        ))
                    }
                </View>
            </View>
        )
    }

    const SearchUser = () => {
        return (
            <View>
               <ViewSearchUser search={search} pencarian={false}/>
            </View>
        )
    }

    return (
        <SafeAreaView style={container.defaultTab}>
            <ScrollView showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={Refresh} />
                }
            >
                <Header search="false" />
                <View marginH-20>
                    <TouchableOpacity>
                        <ButtonSearch
                            onChangeText={async (txt) => {
                                if (!txt) {
                                    await setSearch('')
                                } else {
                                    await setSearch(txt)
                                    dataSearch()
                                }
                            }}
                            styleView={style.view} />
                    </TouchableOpacity>
                    <ScrollView>
                        <View marginT-15>
                            <Text style={assets.fonts.bold}>Pilih Kategori</Text>
                            <Kategori />
                            {search == '' ? (
                                <Text style={assets.fonts.bold} marginT-20>Gambar paling populer</Text>
                            ) : search.charAt(0) === "@" ? (
                                <Text marginT-20 style={[{ paddingBottom: 10 }, assets.fonts.bold]}>Berikut user yang berkaitan dengan "{search}".</Text>
                            ) : (
                                <Text marginT-20 style={[{ paddingBottom: 10 }, assets.fonts.bold]}>Berikut foto yang berkaitan dengan "{search}".</Text>
                            )}
                        </View>
                    </ScrollView>
                    {search === '' ? Grid() : search.charAt(0) === "@" ? SearchUser() : GridSearch()}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        fontSize: 15
    },
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: assets.colors.white,
        borderRadius: 10,
        elevation: 9,
        paddingLeft: 20,
        shadowRadius: 15,
    },
})

export default Home