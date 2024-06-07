import React, { useCallback, useEffect, useState } from "react";
import {RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { assets } from "../../assets";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart as fsHeart } from "@fortawesome/free-solid-svg-icons";
import { InputSearch, Masonry } from "../../components";
import Kategori from "./Kategori";
import MasonryList from '@react-native-seoul/masonry-list';
import { getAllFoto, populerApi } from "../../api";
import useSWR, { mutate } from "swr";

const Home = ({ navigation }) => {
    const [data, setData] = useState([
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
    ])
    const [dataSearch, setDataSearch] = useState([
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
    ])
    const [load, setLoad] = useState(true)
    const [refresh, setRefresh] = useState(false)
    const [seacrhText, setSearchText] = useState('')
    
    const fetch = async () => {
        const res = await populerApi({ page: 1 })
        await setData(res.Data)
        setLoad(false)
        return res
    }

    // const { data: dataSwr } = useSWR('fototrending', fetch, {
    //     refreshInterval: 60000,
    // })

    useEffect(() => {
        fetch()
        // if (dataSwr) {
        //     setData(dataSwr.Data)
        //     setLoad(false)
        // }
    }, []);

    const onRefresh = useCallback(() => {
        setRefresh(true);
        mutate('fototrending', undefined, { revalidate: true })
            .finally(() => setRefresh(false));
    }, []);

    const SearchData = async (txt) => {
        await setLoad(true)
        await setSearchText(txt)
        if (txt && txt !== '') {
            await setDataSearch([
                {id: 1},
                {id: 2},
                {id: 3},
                {id: 4},
            ])
            getAllFoto({page: 1, search: txt}).then(async (res) => {
                await setDataSearch(res.Data)
                await setLoad(false)
            })
        }
    }

    return (
        <SafeAreaView style={[assets.style.container]}>
            <ScrollView showsVerticalScrollIndicator={false} 
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text style={[assets.style.fontBold, { fontSize: 25 }]}>Cari Ide {'\n'}Inspirasimu</Text>
                    </View>
                    <TouchableOpacity onPress={()=>navigation.push('Favorite')} >
                        <FontAwesomeIcon icon={fsHeart} size={25} color={assets.colors.darkblue} />
                    </TouchableOpacity>
                </View>
                <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                    <InputSearch value={seacrhText} onChangeText={SearchData} />
                    <View style={{ marginTop: 20 }}>
                        {
                            seacrhText ? (
                                <>
                                    <Text style={[assets.style.fontBold, { marginVertical:10 }]} >Berikut foto yang berkaitan dengan "{seacrhText}"</Text>
                                </>
                            ) 
                            : (
                                <>
                                    <Text style={[assets.style.fontBold, { marginBottom:10 }]} >Pilih Kategori</Text>
                                    <Kategori />
                                    <Text style={[assets.style.fontBold, { marginVertical:10 }]} >Gambar Paling Populer</Text>
                                </>
                            )
                        }
                    </View>
                </View>
                {
                     seacrhText ? (
                        <>
                            <MasonryList
                                refreshControl={null}
                                data={dataSearch}
                                renderItem={({ item, i }) => <Masonry item={item} load={load} index={i} page='Home' />}
                                keyExtractor={item => item.id.toString()}
                                numColumns={2}
                                contentContainerStyle={{ paddingHorizontal: 20 }}
                            />
                        </>
                     ) : (
                        <>
                            <MasonryList
                                refreshControl={null}
                                data={data}
                                renderItem={({ item, i }) => <Masonry item={item} load={load} index={i} page='Home' />}
                                keyExtractor={item => item.id.toString()}
                                numColumns={2}
                                contentContainerStyle={{ paddingHorizontal: 20 }}
                            />
                        </>
                     )
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home