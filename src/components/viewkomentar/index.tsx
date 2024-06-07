import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { assets } from "../../assets"
import { useState } from "react";
import ExpandedText from "../expandedText";

const ViewKomentar = () => {
    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[assets.style.fontBold, {fontSize: 15}]}>5 Komentar</Text>
                <TouchableOpacity>
                    <Text style={[assets.style.fontMedium, {fontSize: 15}]}>Lihat lainnya</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginVertical: 10, gap: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
                    <View style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: 'grey' }} />
                    <View style={{ flex: 1 }}>
                        <Text style={[assets.style.fontBold, {fontSize: 15}]}>_hehe</Text>
                        <ExpandedText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, ipsa.</ExpandedText>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
                    <View style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: 'grey' }} />
                    <View style={{ flex: 1 }}>
                        <Text style={[assets.style.fontBold, {fontSize: 15}]}>_hehe</Text>
                        <ExpandedText>Lorem ipsum dolor sit amet consectetur adipisicing elit. A quis vel dicta nemo excepturi culpa laboriosam adipisci nam enim sapiente libero perferendis expedita ab sequi impedit quam nostrum quas fugit temporibus, eos officia dolore nobis aliquid totam? Consequuntur facilis architecto est dolor ad quas assumenda, sapiente voluptates placeat, laborum odit.</ExpandedText>
                    </View>
                </View>
            </View>
        </>
    )
}

export default ViewKomentar