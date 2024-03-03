import React, { useCallback, useEffect, useRef, useState } from "react"
import { ButtonC, DataKomentar, Header, ImageBg, InputKomentar, Pin, ViewAddKomentar, container } from "../../components"
import { Image, Modal, Text, TouchableOpacity, View } from "react-native-ui-lib"
import { RefreshControl, ScrollView, StyleSheet } from "react-native"
import axios from "axios"
import Icon from "react-native-vector-icons/FontAwesome6"
import { assets } from "../../assets"
import BottomSheet, { BottomSheetMethods } from "../../components/bottomsheet"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import BottomSheetKomentar from "../../components/bottomsheet/bottomsheetKomentar"
import { getKomentarApi, getUserCari, postKomentar } from "../../api/api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import config from "../../../config"

const Search = ({ route, navigation }) => {
    const [search, setSearch] = useState(route.params && route.params.search.label ? route.params.search.label : '')
    const [data, setData] = useState([]);
    const [page, setPage] = useState(2);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        const jwtToken = await AsyncStorage.getItem('cache');
        let url
        if (jwtToken) {
            // url = `${config.apiUrl}foto-cari?membership=true&keduanya=true&page=1&limit=10${route.params && route.params.search.label !== '' ? `&kategori_id=${route.params.search.value}` : ''}${search !== '' ? `&judul_foto=${search}` : ''}`;
            url = `${config.apiUrl}foto-cari?membership=true&keduanya=true&page=1&limit=10${route.params && route.params.search.label !== '' ? `&kategori_id=${route.params.search.value}` : search !== '' ? `&judul_foto=${search}` : ''}`;
        } else {
            url = `${config.apiUrl}foto-cari/guest?page=1&limit=20${route.params && route.params.search.label !== '' ? `&kategori_id=${route.params.search.value}` : search !== '' ? `&judul_foto=${search}` : ''}`
        }
        const response = await axios.get(url, {
            headers: jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}
        });
        console.log(response.data.Data);
        console.log(route.params);

        setData(response.data.Data);
        setPage(2);
    };

    useEffect(() => {
        fetchData()
    }, [route.params]);

    const handleSearch = (text) => {
        navigation.setParams({
            search: {
                label: '',
                value: ''
            },
        });
        if (!text) {
            setSearch('')
        } else {
            setSearch(text)
        }
        fetchData()
    }

    const Refresh = async () => {
        setLoading(true)
        await fetchData()
        setLoading(false)
    }

    const Grid = () => {
        return (
            <View style={{ flexDirection: 'row' }} marginT-10>
                <View style={{ flex: 1 }}>
                    {
                        data.filter((item, index) => index % 2 == 0).map((item) => (
                            <Pin key={item.id} foto={item.Foto} title={item.JudulFoto} id={item.id} onPress={() => navigation.navigate('TabSearchDetailFoto', { id: item.id, foto: item.Foto, title: item.JudulFoto, userId: item.UserID, deskripsi: item.DeskripsiFoto, kategoriId: item.KategoriID, favorite: item.Favorit, DataUser: item.DataUser, sendiri: item.Sendiri, follow: item.Follow, tabSearch: true, member: item.Membership })} />
                        ))
                    }
                </View>
                <View style={{ flex: 1 }}>
                    {
                        data.filter((item, index) => index % 2 == 1).map((item) => (
                            <Pin key={item.id} foto={item.Foto} title={item.JudulFoto} id={item.id} onPress={() => navigation.navigate('TabSearchDetailFoto', { id: item.id, foto: item.Foto, title: item.JudulFoto, userId: item.UserID, deskripsi: item.DeskripsiFoto, kategoriId: item.KategoriID, favorite: item.Favorit, DataUser: item.DataUser, sendiri: item.Sendiri, follow: item.Follow, tabSearch: true, member: item.Membership })} />
                        ))
                    }
                </View>
            </View>
        )
    }

    const handleScroll = async (event) => {
        console.log('====================================');
        console.log('page:', page);
        console.log('====================================');
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

        const isCloseToBottom =
            layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
        const isCloseToTop = contentOffset.y <= 0;

        if (isCloseToBottom && !isCloseToTop && !loading) {
            const jwtToken = await AsyncStorage.getItem('cache');
            let url;
            await setLoading(true);
            if (jwtToken) {
                url = `https://picsea-1-k3867505.deta.app/foto-cari?membership=false&keduanya=false&page=${page}&limit=10${route.params && route.params.search.label !== '' ? `&kategori_id=${route.params.search.value}` : ''}${search !== '' ? `&judul_foto=${search}` : ''}`;
            } else {
                url = `https://picsea-1-k3867505.deta.app/foto-cari/guest?page=${page}&limit=20${route.params && route.params.search.label !== '' ? `&kategori_id=${route.params.search.value}` : ''}${search !== '' ? `&judul_foto=${search}` : ''}`
            }
            const response = await axios.get(url, {
                headers: jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}
            });

            if (!response.data.IsError) {
                const newData = response.data.Data;

                await setData(prevData => [...prevData, ...newData]);

                if (response.data.Data.length !== 0) {
                    setPage(prevPage => prevPage + 1);
                }
            }
            setLoading(false);
        }
    }

    return (
        <View style={container.defaultTab}>
            <Header search={true} value={route.params && route.params.search.label ? route.params.search.label : search} onChangeText={handleSearch} onFocus={route.params && route.params.focus ? true : false} />
            {
                route.params && route.params.search.label ? (
                    <Text style={[{ paddingHorizontal: 20, paddingBottom: 10 }, assets.fonts.bold]}>Berikut foto yang berkaitan dengan "{route.params.search.label}".</Text>
                ) : search ? (
                    <Text style={[{ paddingHorizontal: 20, paddingBottom: 10 }, assets.fonts.bold]}>Berikut foto yang berkaitan dengan "{search}".</Text>
                ) : null
            }
            <ScrollView style={{ paddingHorizontal: 15 }}
                onScroll={handleScroll}
                scrollEventThrottle={14}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={Refresh} />
                }
            >
                {data ? Grid() : null}
            </ScrollView>
        </View>
    )
}

export default Search

const style = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        fontSize: 15
    },
})