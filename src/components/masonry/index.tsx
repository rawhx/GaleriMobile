import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { assets } from "../../assets";
import { useNavigation } from "@react-navigation/native";

const Masonry = ({ item, load, index, page }) => {
    const navigation = useNavigation();
    const [imageWidth, setImageWidth] = useState(1);
    const [imageHeight, setImageHeight] = useState(1);
    const event = index % 2 === 0

    const onImageLoad = (event) => {
        const { width, height } = event.nativeEvent.source;
        setImageWidth(width);
        setImageHeight(height);
    }

    useEffect(() => {
        return () => {
            setImageWidth(1);
            setImageHeight(1);
        };
    }, [item.Foto, load]);

    return (
        <View style={{ flex: 1, marginBottom: 10, paddingLeft: !event ? 10 : 0, paddingRight: event ? 10 : 0 }}>
            {load ? (
                <>
                    <SkeletonPlaceholder borderRadius={10}>
                        <View style={{ height: (150 + index * 20), width: '100%' }} />
                    </SkeletonPlaceholder>
                    <SkeletonPlaceholder borderRadius={5}>
                        <View style={{ height: 12, width: '50%', marginTop: 10 }} />
                    </SkeletonPlaceholder>
                </>
            ) : (
                <TouchableOpacity onPress={()=>navigation.push(`${page}DetailFoto`, { data: item, page: page })}>
                    <Image
                        onLoad={onImageLoad}
                        source={{ uri: (item.Foto).startsWith('https://') ? item.Foto : `data:image/*;base64,${item.Foto}` }}
                        style={{ borderRadius: 10, width: '100%', aspectRatio: imageWidth / imageHeight, backgroundColor: assets.colors.cloud }}
                    />
                    <Text style={[assets.style.fontSemiBold]}>{item.JudulFoto}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default Masonry