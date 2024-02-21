import React, { useState } from "react"
import { Alert, StyleSheet } from "react-native"
import { Colors, Image, Text, TouchableOpacity, View } from "react-native-ui-lib"
import Icon from "react-native-vector-icons/FontAwesome6"
import { ButtonSearch, LoginButton, ModalC } from ".."
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

const GetToken = async () => {
    const jwtToken = await AsyncStorage.getItem('cache')
    return jwtToken
}

const awal = () => {
    const navigation = useNavigation()

    return (
        <View style={Style.container}>
            <View marginT-20 style={Style.section}>
                <View style={{
                    // flexDirection: 'column',
                    // justifyContent: 'flex-end'
                }}>
                    <Text style={Style.fontJudul}>Cari Ide</Text>
                    <Text style={Style.fontJudul}>Inspirasimu</Text>
                </View>
                <View style={Style.section2}>
                    <TouchableOpacity 
                    onPress={()=>navigation.navigate("ViewFavorite")}>
                        <Icon name="heart" size={20} color="#040326" solid/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const detailGambar = (props) => {
    return (
        <View style={Style.container}>
            <View marginT-5 style={Style.section}>
                <View style={Style.section2}>
                    <TouchableOpacity onPress={props.onPress}>
                        <View style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            height: 35, 
                            width: 35, 
                            borderRadius: 35,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Icon name="arrow-left" size={20} color="white" solid style={{elevation: 5}} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={props.onPressBottomSheet}>
                        <View style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            height: 35, 
                            width: 35, 
                            borderRadius: 35,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Icon name="ellipsis-vertical" size={20} color="white" solid/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const profile = () => {
    const navigation = useNavigation()

    return (
        <View style={Style.container}>
            <View marginT-20 style={Style.section}>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'flex-end'
                }}>
                    <Text text60 style={Style.fontJudul}>Cari Ide</Text>
                    <Text text60 marginT-10 style={Style.fontJudul}>Inspirasimu</Text>
                </View>
                <View style={Style.section2}>
                    <TouchableOpacity 
                    onPress={()=>navigation.navigate("ViewFavorite")}>
                        <Icon name="heart" size={20} color="#040326" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const Search = props => {
    console.log(props);
    
    const navigation = useNavigation()
    return (
        <View style={Style.container}>
            <View style={Style.section2}>
                <ButtonSearch
                onFocus={props.onFocus}
                value={props.value}
                onChangeText={props.onChangeText}
                />
                <View marginL-20 style={Style.section2}>
                    <TouchableOpacity onPress={()=>navigation.navigate('ViewFavorite')}>
                        <Icon name="heart" size={20} color="#040326" solid/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const Header = props => {
    let headerNav

    if (props.search || props.search == false) {
        headerNav = props.search == true ? Search(props) : awal()
    } else if (props.nav == 'profile') {
        headerNav = profile()
    } else if (props.nav == 'detailGambar') {
        headerNav = detailGambar(props)
    }
    return headerNav
}

const Style = StyleSheet.create({
    container: {
        justifyContent: 'center',
        height: 100,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    fontJudul: {
        fontSize: 25,
        fontFamily: 'Poppins-Bold'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    section2: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default Header