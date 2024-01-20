import { StyleSheet } from "react-native";
import { assets } from "../../assets";

const container = StyleSheet.create({
    default: {
        flex: 1,
        backgroundColor: assets.colors.background,
        justifyContent: 'center'
    },
    defaultTab: {
        flex: 1,
        backgroundColor: assets.colors.white,
    }
})

export default container