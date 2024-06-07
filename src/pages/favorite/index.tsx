import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { assets } from "../../assets"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

const Favorite = ({ navigation }) => {
    return (
        <SafeAreaView style={[assets.style.container, { paddingHorizontal: 20, paddingTop: 20 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <FontAwesomeIcon icon={faArrowLeft} size={20} color="black" />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                    <Text style={[assets.style.fontBold, { fontSize: 18, color: 'black', textTransform: 'capitalize' }]}>Foto yang Anda Sukai</Text>
                </View>
                <ScrollView>

                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Favorite