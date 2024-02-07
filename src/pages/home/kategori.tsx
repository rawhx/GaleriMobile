import React, { useEffect, useRef } from "react"
import { ImageBackground, ScrollView, StyleSheet } from "react-native"
import { Text, TouchableOpacity, View } from "react-native-ui-lib"
import { assets } from "../../assets"
import { useNavigation } from "@react-navigation/native"
import { getItemLabel } from "react-native-ui-lib/src/components/picker/PickerPresenter"


const Kategori = () => {
    const navigation = useNavigation()
    const kategoriData = [
        { imageSource: assets.images.hewanRusa, label: 'Hewan', value: '659e1e792b908d5941344334' },
        { imageSource: assets.images.tumbuhanKategori, label: 'Tumbuhan', value: '659e1e702b908d5941344333' },
        { imageSource: assets.images.musimKategori, label: 'Musim', value: null },
        { imageSource: assets.images.abstrakKategori, label: 'Abstrak', value: '659e1e802b908d5941344335' },
        { imageSource: assets.images.kotaKategori, label: 'Kota', value: null },
    ];

    return (
        <ScrollView
        style={{marginVertical: 5}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        >
            <View style={style.sectionKategori}>
            {kategoriData.map((kategori, index) => (
                <View key={index} style={style.kategori}>
                    <TouchableOpacity
                        onPress={()=>navigation.navigate('TabSearch', {search: {value: kategori.value, label: kategori.label}})}
                    >
                        <ImageBackground source={kategori.imageSource} style={style.kategoriImg}>
                        <View style={style.overlay}>
                            <Text color='white' style={style.text}>{kategori.label}</Text>
                        </View>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            ))}
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