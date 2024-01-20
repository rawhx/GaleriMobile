import React, { useEffect, useRef } from "react"
import { ImageBackground, ScrollView, StyleSheet } from "react-native"
import { Text, View } from "react-native-ui-lib"
import { assets } from "../../assets"

const Kategori = () => {
    return (
        <ScrollView
        style={{marginVertical: 5}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        >
            <View style={style.sectionKategori}>
            <View style={style.kategori}>
                <ImageBackground source={assets.images.kategioriHewan} style={style.kategoriImg}>
                    <View style={style.overlay}>
                        <Text color='white' style={style.text}>Hewan</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={style.kategori}>
                <ImageBackground source={assets.images.kategioriHewan} style={style.kategoriImg}>
                    <View style={style.overlay}>
                        <Text color='white' style={style.text}>Hewan</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={style.kategori}>
                <ImageBackground source={assets.images.kategioriHewan} style={style.kategoriImg}>
                    <View style={style.overlay}>
                        <Text color='white' style={style.text}>Hewan</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={style.kategori}>
                <ImageBackground source={assets.images.kategioriHewan} style={style.kategoriImg}>
                    <View style={style.overlay}>
                        <Text color='white' style={style.text}>Hewan</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={style.kategori}>
                <ImageBackground source={assets.images.kategioriHewan} style={style.kategoriImg}>
                    <View style={style.overlay}>
                        <Text color='white' style={style.text}>Hewan</Text>
                    </View>
                </ImageBackground>
            </View>
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
  text: {
    fontWeight: 'bold', 
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
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: 10,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
  },
})

export default Kategori