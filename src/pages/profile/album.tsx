import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native-ui-lib";
import { assets } from "../../assets";
import Icon from "react-native-vector-icons/FontAwesome6"
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Album = props => {
    const navigation = useNavigation()
    const data = props.data

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const [backgroundColor, setBackgroundColor] = useState(getRandomColor());

    return (
        <View paddingH-5>
            <View paddingH-10 style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={[{fontSize: 17, fontFamily: 'Poppins-Bold'}]}>Album</Text>
                <TouchableOpacity 
                onPress={props.addAlbum}>
                    <Icon color={'black'} name="plus" size={20} solid />
                </TouchableOpacity>
            </View>
            <View>
                {data.map((item, index) => (
                    <React.Fragment key={item.id}>
                        {/* Check if the index is even */}
                        {index % 2 === 0 && (
                            <View style={{ flexDirection: 'row', justifyContent: data.length - index >= 2 ? 'space-evenly' : 'flex-start' }}>
                                {/* Item 1 */}
                                <TouchableOpacity
                                    style={{ marginBottom: 5 }}
                                    onPress={() => navigation.navigate('DetailAlbum', { dataAlbum: item })}
                                >
                                    {/* Gunakan gambar dari item atau dari assets.images.hewanRusa */}
                                    {item.Sampul !== ' ' ? (
                                        <Image 
                                        source={{
                                            uri: item.Sampul.startsWith('https://') 
                                              ? item.Sampul 
                                              : item.Sampul ? `data:image/png;base64,${item.Sampul}` : null
                                        }}  
                                        style={style.images} />
                                    ) : (
                                        <View style={[style.images, {backgroundColor: getRandomColor(), borderRadius: 10}]}/>
                                    )}
                                    <View paddingH-15 paddingT-5>
                                        {/* Gunakan NamaAlbum dari item */}
                                        <Text style={[assets.fonts.default]}>{item.NamaAlbum}</Text>
                                        <Text style={[assets.fonts.default, { fontSize: 10 }]}>{item.Jumlah} Foto</Text>
                                    </View>
                                </TouchableOpacity>

                                {/* Check if the next item exists */}
                                {index + 1 < data.length && (
                                    // Item 2
                                    <TouchableOpacity
                                        style={{ marginBottom: 5 }}
                                        onPress={() => navigation.navigate('DetailAlbum', { dataAlbum: data[index + 1] })}
                                    >
                                        {/* Gunakan gambar dari item atau dari assets.images.hewanRusa */}
                                        {data[index + 1].Sampul !== ' ' ? (
                                            <Image 
                                            source={{
                                                uri: data[index + 1].Sampul.startsWith('https://') 
                                                  ? data[index + 1].Sampul 
                                                  : data[index + 1].Sampul ? `data:image/png;base64,${item.Sampul}` : null
                                            }} 
                                            style={style.images} />
                                        ) : (
                                            <View style={[style.images, {backgroundColor: getRandomColor(), borderRadius: 10}]}/>
                                        )}
                                        <View paddingH-15 paddingT-5>
                                            {/* Gunakan NamaAlbum dari item */}
                                            <Text style={[assets.fonts.default]}>{data[index + 1].NamaAlbum}</Text>
                                            <Text style={[assets.fonts.default, { fontSize: 10 }]}>{data[index + 1].Jumlah} Foto</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            </View>
                        )}
                    </React.Fragment>
                ))}
            </View>
        </View>
    )
}

export default Album

const style = StyleSheet.create({
    images: {
        width: 175,
        height: 150,
        marginHorizontal: 5,
        borderRadius: 15,
        flex: 1
    }
})