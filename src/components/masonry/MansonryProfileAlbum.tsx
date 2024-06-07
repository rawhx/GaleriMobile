import { Image, Text, TouchableOpacity, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { assets } from "../../assets";

const MansonryProfileAlbum = ({ item, load, index, member = false }) => {
    const event = index % 2 === 0
    return (
        <View style={{ flex: 1, marginBottom: 5, paddingLeft: !event ? 10 : 0, paddingRight: event ? 10 : 0 }}>
            {load ? (
                <>
                    <SkeletonPlaceholder borderRadius={10}>
                        <View style={{ width: '100%', aspectRatio: 1  }} />
                    </SkeletonPlaceholder>
                </>
            ) : (
                <TouchableOpacity>
                    <Image
                        source={{ uri: (item.Sampul).startsWith('https://') ? item.Sampul : `data:image/*;base64,${item.Sampul}` }}
                        style={{ borderRadius: 5, width: '100%', aspectRatio: 1, backgroundColor: assets.colors.cloud }}
                    />
                    <Text style={[assets.style.fontSemiBold]}>{item.NamaAlbum}</Text>
                    <Text style={[assets.style.fontMedium]}>{item.Jumlah} Foto</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default MansonryProfileAlbum