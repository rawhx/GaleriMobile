import React, { useEffect, useRef, useState } from "react"
import { ImageBackground, ScrollView, StyleSheet } from "react-native"
import { Text, TouchableOpacity, View } from "react-native-ui-lib"
import { assets } from "../../assets"
import { useNavigation } from "@react-navigation/native"
import { getItemLabel } from "react-native-ui-lib/src/components/picker/PickerPresenter"
import axios from "axios"


const Kategori = () => {
    const navigation = useNavigation()
    const kategoriData_old = [
        { Sampul: assets.images.hewanRusa, Kategori: 'Hewan', id: '659e1e792b908d5941344334' },
        { Sampul: assets.images.tumbuhanKategori, Kategori: 'Tumbuhan', id: '659e1e702b908d5941344333' },
        { Sampul: assets.images.musimKategori, Kategori: 'Musim', id: null },
        { Sampul: assets.images.abstrakKategori, Kategori: 'Abstrak', id: '659e1e802b908d5941344335' },
        { Sampul: assets.images.kotaKategori, Kategori: 'Kota', id: null },
    ];

    const [kategoriData, setKategori] = useState([])
    const [load, setLoad] = useState(false)
    
    const fetchData = async () => {
        await axios.get('https://picsea-1-k3867505.deta.app/kategori-cari?page=1&limit=10').then((res)=>{
            setKategori(res.data.Data)
            setLoad(false)
        })
    }
    
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    
    const randomColors = Array.from({ length: 4 }, () => getRandomColor());
    
    useEffect(() => {
        setLoad(true)
        fetchData()
    }, []);

    return (
        <ScrollView
        style={{marginVertical: 5}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        >
            <View style={style.sectionKategori}>
            {
                !load ? (
                    kategoriData.map((kategori, index) => (
                        <View key={index} style={style.kategori}>
                            <TouchableOpacity
                                onPress={()=>{
                                    navigation.navigate('search', {search: {value: kategori.id, label: kategori.Kategori}})
                                    // navigation.navigate('TabSearch', {search: {value: kategori.id, label: kategori.Kategori}})
                                }}
                            >
                                <ImageBackground source={{ uri: `data:image/png;base64,${kategori.Sampul}` }} style={style.kategoriImg}>
                                <View style={style.overlay}>
                                    <Text color='white' style={style.text}>{kategori.Kategori}</Text>
                                </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    randomColors.map((color, index) => (
                        <View key={index} style={style.kategori}>
                            <View style={[style.kategoriImg, { backgroundColor: color }]} />
                        </View>
                    ))
                )
            }
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
  text: {
    fontFamily: 'Poppins-Bold',
    fontSize:14
  },
  sectionKategori: {
      flexDirection: 'row'
  },
  kategori: {
      width: 200,
      height: 125,
      marginHorizontal: 5,
  },
  kategoriImg: {
      borderRadius: 10,
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      overflow: 'hidden'
  },
  overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      borderRadius: 10,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
  },
})

export default Kategori