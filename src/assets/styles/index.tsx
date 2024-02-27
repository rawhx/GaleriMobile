import { StyleSheet } from "react-native";
import { colors } from "../colors";

const styleDefault = StyleSheet.create({
    default: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center'
    },
    defaultTab: {
        flex: 1,
        backgroundColor: colors.white,
    },
    garis2: {
        marginVertical: 15,
        borderRadius: 2,
        borderBottomWidth: 0.5,
        borderBottomColor: 'black',
        width: '100%',
    },
    tabBar: {
        padding: 0,
        height: 50,
        backgroundColor: colors.header,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        shadowOpacity: 0,
        shadowRadius: 0,
    }
})

export default styleDefault