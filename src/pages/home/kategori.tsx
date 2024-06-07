import { useEffect, useState } from "react"
import { ImageBackground, ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native"
import { red100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { kategoriApi } from "../../api";
import { style } from "../../assets/style";

const Kategori = () => {
    const [dataKategori, setDataKategori] = useState([])
    const [load, setLoad] = useState(true)
    useEffect(() => {
        kategoriApi().then((res) => {
            setLoad(false)
            setDataKategori(res)
        })
    }, [])

    const colors = ['blue', 'green', 'red', 'grey', 'red', 'blue'];

    return (
        <ScrollView  horizontal showsHorizontalScrollIndicator={false}>
            {
                load ? (
                    <>
                        {
                            Array.from({ length: 4 }).map((_, index) => (
                                <SkeletonPlaceholder borderRadius={10} key={index} >
                                    <View style={{ height: 150, width: 200, marginLeft: index > 0 ? 10 : 0 }} />
                                </SkeletonPlaceholder>
                            ))
                        }
                    </>
                ) : (
                    <View style={{ flexDirection: 'row' }}>
                        {dataKategori.map((data, index) => (
                            <TouchableOpacity key={index} style={{ height: 150, width: 200, marginLeft: index > 0 ? 10 : 0 }} >
                                <ImageBackground source={{ uri: (data.Sampul).startsWith('https://') ? data.Sampul : `data:image/png;base64,${data.Sampul}` }} style={{ borderRadius: 10, width: '100%', height: '100%', overflow: 'hidden' }} >
                                    <View style={{
                                        ...StyleSheet.absoluteFillObject,
                                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                        borderRadius: 10,
                                        padding: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Text style={[style.fontBold, { color: 'white', fontSize: 15 }]}>{data.Kategori}</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        ))}
                    </View>
                )
            }
            <View>

            </View>
        </ScrollView>
    )
}

export default Kategori