import { StyleSheet, Platform } from "react-native";
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
})

export default style