import { faCirclePlus, faCrown, faImages, faPlus, faThLarge } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import React, { useCallback, useRef, useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import MasonryList from '@react-native-seoul/masonry-list';
import { BottomSheetC, ButtonC, MansonryProfileAlbum, MasonryProfile } from "../../components";
import { assets } from "../../assets";
import { BottomSheetModal, BottomSheetTextInput } from "@gorhom/bottom-sheet";

const ContentActive = ({ active, dataProfile, load, addAlbum }) => {
    let contentView
    if (active == 0) {
        contentView = (
            <>
                <MasonryList
                    refreshControl={null}
                    data={dataProfile.Foto}
                    renderItem={({ item, i }) => <MasonryProfile item={item} load={load} index={i} />}
                    keyExtractor={item => item.id.toString()}
                    numColumns={3}
                />
            </>
        )
    } else if (active == 1) {
        contentView = (
            <>
                <MasonryList
                    data={dataProfile.Member}
                    refreshControl={null}
                    renderItem={({ item, i }) => <MasonryProfile item={item} load={load} index={i} member='true' />}
                    keyExtractor={item => item.id.toString()}
                    numColumns={3}
                />
            </>
        )
    } else if (active == 2) {
        contentView = (
            <>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={[ assets.style.fontBold, { fontSize: 18 } ]}>Album</Text>
                    <TouchableOpacity onPress={addAlbum}>
                        <FontAwesomeIcon icon={faPlus} size={20} />
                    </TouchableOpacity>
                </View>
                <MasonryList
                    refreshControl={null}
                    data={dataProfile.Album}
                    renderItem={({ item, i }) => <MansonryProfileAlbum item={item} load={load} index={i} />}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                />
            </>
        )
    }
    return (
        <>
            {contentView}
        </>
    )
}

const TabProfile = ({ dataProfile, load, onActive }) => {
    const [active, setActive] = useState(0)

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present()
    }, [])

    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20 }}>
                <TouchableOpacity onPress={()=>{
                    setActive(0)
                    onActive(0)
                }} style={[{ paddingBottom: 10, paddingHorizontal: 20 }, active == 0 ? styles.active : null]}>
                    <FontAwesomeIcon icon={faThLarge} size={20} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    setActive(1)
                    onActive(1)
                }} style={[{ paddingBottom: 10, paddingHorizontal: 20 }, active == 1 ? styles.active : null]}>
                    <FontAwesomeIcon icon={faCrown} size={20} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    setActive(2)
                    onActive(2)
                }} style={[{ paddingBottom: 10, paddingHorizontal: 20 }, active == 2 ? styles.active : null]}>
                    <FontAwesomeIcon icon={faImages} size={20} />
                </TouchableOpacity>
            </View>
            <ContentActive active={active} dataProfile={dataProfile} load={load} addAlbum={handlePresentModalPress} />
            <BottomSheetC 
                snapPoint={['40%', '100%']}
                href={bottomSheetModalRef}
                header='Tambah Album'
            >
                <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'flex-start', gap: 20, paddingVertical: 15 }}>
                    <View>
                        <Text style={[assets.style.fontBold, {fontSize: 15}]} >Nama Album</Text>
                        <View style={{ backgroundColor: 'white', width: '100%', borderRadius: 50, flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesomeIcon icon={faCirclePlus} color="grey" />
                            <BottomSheetTextInput 
                                placeholder="Tambahkan judul seperti, 'Hewan Bagusku'"
                                placeholderTextColor={assets.colors.grey}
                                style={[
                                    assets.style.fontRegular,
                                    {
                                        width: '100%',
                                        paddingRight: 20
                                    }
                                ]}
                                autoCapitalize="none"
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={[assets.style.fontBold, {fontSize: 15}]} >Nama Album</Text>
                        <View style={{ backgroundColor: 'white', width: '100%', borderRadius: 50, flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesomeIcon icon={faCirclePlus} color="grey" />
                            <BottomSheetTextInput 
                                placeholder="Tambahkan judul seperti, 'Hewan Bagusku'"
                                placeholderTextColor={assets.colors.grey}
                                style={[
                                    assets.style.fontRegular,
                                    {
                                        width: '100%',
                                        paddingRight: 20
                                    }
                                ]}
                                autoCapitalize="none"
                            />
                        </View>
                    </View>
                    <ButtonC
                        style={{width: 200, alignSelf: 'flex-end'}}
                        loading={true}
                        title='Simpan'
                        onPress={async () => {
                            // await setLoad(true)
                            // console.log(data);
                            // await setLoad(false)
                        }}
                    />
                </View>
            </BottomSheetC>
        </>
    )
}

const styles = StyleSheet.create({
    active: {
        borderBottomWidth: 2,
    } 
})

export default TabProfile