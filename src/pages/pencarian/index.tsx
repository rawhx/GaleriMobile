import React, { useCallback, useEffect, useRef, useState } from "react"
import { ButtonC, DataKomentar, Header, ImageBg, InputKomentar, Pin, ViewAddKomentar, container } from "../../components"
import { Image, Modal, Text, TouchableOpacity, View } from "react-native-ui-lib"
import { ScrollView, StyleSheet } from "react-native"
import axios from "axios"
import Icon from "react-native-vector-icons/FontAwesome6"
import { assets } from "../../assets"
import BottomSheet, { BottomSheetMethods } from "../../components/bottomsheet"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import BottomSheetKomentar from "../../components/bottomsheet/bottomsheetKomentar"
import { getKomentarApi, getUserCari, postKomentar } from "../../api/api"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Search = ({route, navigation}) => {
    const [search, setSearch] = useState(route.params && route.params.search.label ? route.params.search.label : '')
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        const jwtToken = await AsyncStorage.getItem('cache');
        let url
        if (jwtToken) {
            url = `https://picsea-1-k3867505.deta.app/foto-cari?membership=false&keduanya=false&page=${page}&limit=10${route.params && route.params.search.label !== '' ? `&kategori_id=${route.params.search.value}` : ''}${search !== '' ? `&judul_foto=${search}` : ''}`;
        } else {
            url = 'https://picsea-1-k3867505.deta.app/foto-cari/guest?page=1&limit=20'
        }
        const response = await axios.get(url, {
            headers: jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}
        });
        // const newResponse = [...response.data.Data];
        // setData((prevData) => [...prevData, ...response.data.Data]);
        setData(response.data.Data);
        // setPage(page + 1);
    };

    useEffect(() => {
        fetchData()
    }, [route.params]);
    
    const handleSearch = (text) => {
        navigation.setParams({
            search: {
                label: ''
            },
        });
        setSearch(text)
        fetchData()
    }

    const Grid = () => {
        return (
            <View style={{flexDirection: 'row'}} marginT-10>
                <View style={{flex: 1}}>
                {
                    data.filter((item, index) => index % 2 == 0).map((item) => (
                        <Pin key={item.id} foto={item.Foto} title={item.JudulFoto} id={item.id} onPress={() => navigation.navigate('TabSearchDetailFoto', {id: item.id, foto: item.Foto, title: item.JudulFoto, userId: item.UserID, deskripsi: item.DeskripsiFoto, kategoriId: item.KategoriID, favorite: item.Favorit, DataUser: item.DataUser})} />
                    ))
                }
                </View>
                <View style={{flex: 1}}>
                {
                    data.filter((item, index) => index % 2 == 1).map((item) => (
                        <Pin key={item.id} foto={item.Foto} title={item.JudulFoto} id={item.id} onPress={() => navigation.navigate('TabSearchDetailFoto', {id: item.id, foto: item.Foto, title: item.JudulFoto, userId: item.UserID, deskripsi: item.DeskripsiFoto, kategoriId: item.KategoriID, favorite: item.Favorit, DataUser: item.DataUser})} />
                    ))
                }
                </View>
            </View>
        )
    }

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

        const isCloseToBottom =
            layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

        if (isCloseToBottom && !loading) {
            setLoading(true);
            fetchData();
        }
    };

    return (
        <View style={container.defaultTab}>
            <Header search={true} value={ route.params && route.params.search.label ? route.params.search.label : search} onChangeText={handleSearch} />
            {
                search ? (
                    <Text  style={[{paddingHorizontal: 20, paddingBottom: 10}, assets.fonts.bold]}>Berikut foto yang berkaitan dengan "{search}".</Text>
                ) : null
            }
            {
                route.params && route.params.search.label ? (
                    <Text  style={[{paddingHorizontal: 20, paddingBottom: 10}, assets.fonts.bold]}>Berikut foto yang berkaitan dengan "{route.params.search.label}".</Text>
                ) : null
            }
            <ScrollView style={{paddingHorizontal: 15}}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            >
                { Grid() }
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