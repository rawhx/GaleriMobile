import { useEffect, useState } from "react";
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { assets } from "../../assets";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

const MasonryProfile = ({ item, load, index, member = false }) => {
    return (
        <View style={{ flex: 1, marginBottom: 5,  ...getPaddingStyle(index) }}>
            {load ? (
                <>
                    <SkeletonPlaceholder borderRadius={10}>
                        <View style={{ width: '100%', aspectRatio: 1  }} />
                    </SkeletonPlaceholder>
                </>
            ) : (
                <TouchableOpacity>
                    <Image
                        source={{ uri: (item.Foto).startsWith('https://') ? item.Foto : `data:image/*;base64,${item.Foto}` }}
                        style={{ borderRadius: 5, width: '100%', aspectRatio: 1, backgroundColor: assets.colors.cloud }}
                    />
                    {
                        member ? (
                            <>
                                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: assets.colors.navy, position: 'absolute', bottom: 5, right: 5, padding: 3, borderRadius: 3 }}>
                                    <View>
                                        <FontAwesomeIcon icon={faCrown} size={12} color={assets.colors.yellow} />
                                    </View>
                                    <Text style={[ assets.style.fontBold, { marginLeft: 5, color: assets.colors.yellow, fontSize: 9 } ]} >PICTSEA+</Text>
                                </View>
                            </>
                        ) : null
                    }
                </TouchableOpacity>
            )}
        </View>
    );
};

const getPaddingStyle = (index) => {
    if ((index + 1) % 3 === 0) {
      return { paddingRight: 0, paddingLeft: 10 / 5 }; // Kelipatan 3
    } else if ((index + 1) % 3 === 1) {
      return { paddingLeft: 0, paddingRight: 10 / 5 }; // Kelipatan 1
    } else {
      return { paddingLeft: 5 / 5, paddingRight: 5 / 5 }; // Kelipatan 2
    }
};

export default MasonryProfile