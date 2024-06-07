import { Text, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { assets } from "../../assets";

const FooterLoader = ({ pageLoad = false, more = true, page = 1 }) => {
    if ((!pageLoad && !more) || page == 1) return null;
    return (
        <View style={{ paddingHorizontal: 20, marginVertical: 10, marginBottom: 20 }}>
            {/* {[...Array(2)].map((_, index) => {
                const event = index % 2 === 0
                return (
                    <View key={index} style={{ flex: 1, marginBottom: 10, paddingLeft: !event ? 10 : 0, paddingRight: event ? 10 : 0 }}>
                        {
                            !event ? (
                                <View style={{ height: 150 + index * 20, width: '100%' }} />
                            ) : (
                                <SkeletonPlaceholder borderRadius={10}>
                                    <View style={{ marginBottom: 20 }}>
                                        <View style={{ height: 150 + index * 20, width: '100%' }} />
                                        <SkeletonPlaceholder borderRadius={5}>
                                            <View style={{ height: 12, width: '50%', marginTop: 10 }} />
                                        </SkeletonPlaceholder>
                                    </View>
                                </SkeletonPlaceholder>
                            )
                        }
                    </View>
                )
            })} */}
            <Text style={[assets.style.fontBold, {textAlign: 'center'}]}>Loading ...</Text>
        </View>
    );
}

export default FooterLoader