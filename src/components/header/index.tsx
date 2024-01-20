import React from "react"
import { StyleSheet } from "react-native"
import { Colors, Image, Text, TouchableOpacity, View } from "react-native-ui-lib"
import Icon from "react-native-vector-icons/FontAwesome6"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { assets } from "../../assets"
import { ButtonSearch, LoginButton } from ".."
import { useNavigation } from "@react-navigation/native"

const awal = () => {
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
                    <Icon name="heart" size={20} color="grey" />
                </View>
            </View>
        </View>
    )
}

const detailGambar = (props) => {
    const navigation = useNavigation()
    return (
        <View style={Style.container}>
            <View marginT-10 style={Style.section}>
                <View style={Style.section2}>
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <Icon name="arrow-left" size={30} color="grey" solid />
                    </TouchableOpacity>
                </View>
                <View>
                    <Icon name="ellipsis-vertical" size={30} color="grey" solid/>
                </View>
            </View>
        </View>
    )
}

const profile = () => {
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
                    <Icon name="heart" size={20} color="grey" />
                </View>
            </View>
        </View>
    )
}

const Search = (props) => {
    return (
        <View style={Style.container}>
            <View style={Style.section2}>
                <ButtonSearch onChangeText={props.onChangeText}/>
                <View marginL-20 style={Style.section2}>
                    <Icon name="heart" size={20} color="grey" solid/>
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
        fontSize: 25
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