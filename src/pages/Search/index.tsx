import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { assets } from "../../assets"
import { FooterLoader, InputSearch, Masonry } from "../../components"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faHeart as fsHeart } from "@fortawesome/free-solid-svg-icons"
import MasonryList from '@react-native-seoul/masonry-list';
import React, { useEffect, useState } from "react"
import { getAllFoto } from "../../api"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"

const Search = ({ navigation }) => {
    const [data, setData] = useState([
        {id: 1, title: 'red'},
        {id: 2, title: 'blue'},
        {id: 3, title: 'black'},
        {id: 4, title: 'red'},
    ])

    const [dataSearch, setDataSearch] = useState([
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
    ])
    const [seacrhText, setSearchText] = useState('')

    const [load, setLoad] = useState(true)
    const [page, setPage] = useState(1)
    const [pageLoad, setPageLoad] = useState(false)
    const [more, setMore] = useState(true)

    const fetch = () => {
        setPageLoad(true)
        getAllFoto({ page: page }).then(async (res) => {
            if (data[0].title) {
                await setData(res.Data)
                setLoad(false)
                return
            }
            if (res.Data.length > 0) {
                setData(prevData => [...prevData, ...res.Data])
            } else {
                setMore(false)
            }
        }).finally(()=>setPageLoad(false))
    }

    const infinity = () => {
        if (!pageLoad && more) {
            setPage(prevPage => prevPage + 1);
        }
    }

    const SearchData = async (txt) => {
        await setLoad(true)
        await setSearchText(txt)
        if (txt && txt !== '') {
            setPage(1)
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
            // setLoad(false)
        }
    }

    useEffect(()=>{
        fetch()
    }, [page])

    return (
        <SafeAreaView style={[assets.style.container, { paddingTop: 20 }]}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, gap: 20}}>             
                <InputSearch value={seacrhText} onChangeText={SearchData} />
                <TouchableOpacity onPress={()=>navigation.push('Favorite')}>
                    <FontAwesomeIcon icon={fsHeart} size={25} color={assets.colors.darkblue} />
                </TouchableOpacity>
            </View>
            {seacrhText ? (
                <>
                    <Text style={[assets.style.fontBold, { marginHorizontal: 20, marginTop: 10 }]} >Berikut foto yang berkaitan dengan "{seacrhText}"</Text>
                </>
            ) : null}
            <ScrollView
                style={{marginTop: 10}}
                onScroll={infinity}
                scrollEventThrottle={16}
            >
                {
                     seacrhText ? (
                        <>
                            <MasonryList
                                refreshControl={null}
                                data={dataSearch}
                                renderItem={({ item, i }) => <Masonry item={item} load={load} index={i} page='Search' />}
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
                                renderItem={({ item, i }) => <Masonry item={item} load={load} index={i} page='Search' />}
                                keyExtractor={item => item.id.toString()}
                                numColumns={2}
                                contentContainerStyle={{ paddingHorizontal: 20 }}
                            />
                        </>
                     )
                }
                <FooterLoader pageLoad={pageLoad} more={more} page={page} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Search