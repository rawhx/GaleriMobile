import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { assets } from "../../assets";
import { Pin, container } from "../../components";
import { Text, View } from "react-native-ui-lib";
import Icon from "react-native-vector-icons/FontAwesome6";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ViewFavorite = ({navigation}) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(2);

    const fetchData = async () => {
        const jwtToken = await AsyncStorage.getItem('cache');
        let url = `https://picsea-1-k3867505.deta.app/foto-favorit?page=1&limit=20`
        const response = await axios.get(url, {
            headers: jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}
        });
        setData(response.data.Data);
        setPage(2);
    };

    useEffect(() => {
        fetchData()
    }, []);

    const Grid = () => {
        return (
            <View style={{flexDirection: 'row'}} marginT-10>
                <View style={{flex: 1}}>
                {
                    data.filter((item, index) => index % 2 == 0).map((item) => (
                        <Pin key={item.id} foto={item.Foto} title={item.JudulFoto} id={item.id} onPress={() => navigation.navigate('TabSearchDetailFoto', {id: item.id, foto: item.Foto, title: item.JudulFoto, userId: item.UserID, deskripsi: item.DeskripsiFoto, kategoriId: item.KategoriID, favorite: item.Favorit, DataUser: item.DataUser, sendiri: item.Sendiri, follow: item.Follow, tabSearch: true})} />
                    ))
                }
                </View>
                <View style={{flex: 1}}>
                {
                    data.filter((item, index) => index % 2 == 1).map((item) => (
                        <Pin key={item.id} foto={item.Foto} title={item.JudulFoto} id={item.id} onPress={() => navigation.navigate('TabSearchDetailFoto', {id: item.id, foto: item.Foto, title: item.JudulFoto, userId: item.UserID, deskripsi: item.DeskripsiFoto, kategoriId: item.KategoriID, favorite: item.Favorit, DataUser: item.DataUser, sendiri: item.Sendiri, follow: item.Follow, tabSearch: true})} />
                    ))
                }
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={[container.defaultTab]}>
            <View style={{marginTop: 15, marginHorizontal: 15}}>
                <View marginB-15 style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 20, alignItems: 'center' }}>
                        <Icon name="arrow-left" size={20} color="black" />
                    </TouchableOpacity>
                    <Text style={[assets.fonts.bold, { fontSize: 16.5 }]}>Foto Yang Anda Sukai</Text>
                    <View style={{ width: 20 }} />
                </View>
                <ScrollView>
                    <Grid/>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default ViewFavorite