import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { ButtonSearch, Header, container } from '../../components'
import Kategori from './kategori'
import { assets } from '../../assets'
import { Text, View } from 'react-native-ui-lib'
import Grid from './grid'

const Home = () => {
    return (
        <View style={container.defaultTab}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header search="false"/>
                <View marginH-20>
                    <ButtonSearch styleView={style.view}/>
                    <ScrollView>
                        <View marginT-15>
                            <Text style={{fontWeight: 'bold'}}>Pilih Kategori</Text>
                            <Kategori />
                            <Text style={{fontWeight: 'bold'}} marginT-20>Gambar Sekilas</Text>
                            <Grid/>
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    )
}

const style = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25
    },
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: assets.colors.white,
        borderRadius: 10,
        elevation: 9,
        paddingLeft: 20,
        shadowRadius: 15,
    },
})

export default Home