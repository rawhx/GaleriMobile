import { StyleSheet } from "react-native";
import { assets } from "../../assets";

const style = StyleSheet.create({
    formGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: assets.colors.white,
        borderRadius: 20,
        elevation: 9,
        paddingLeft: 20,
        shadowRadius: 15,
    },
    input: {
        backgroundColor: assets.colors.white,
        fontSize: 15,
        height: 45,
        paddingHorizontal: 20,
        borderRadius: 20,
        elevation: 9,
        shadowRadius: 15,
    },
})

export default style