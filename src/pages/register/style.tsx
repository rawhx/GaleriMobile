import { StyleSheet } from "react-native";
import { theme } from "../../assets/colors";

const style = StyleSheet.create({
    formGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        borderRadius: 20,
        elevation: 9,
        paddingLeft: 20,
        shadowRadius: 15,
    },
    input: {
        backgroundColor: theme.colors.white,
        fontSize: 15,
        height: 45,
        paddingHorizontal: 20,
        borderRadius: 20,
        elevation: 9,
        shadowRadius: 15,
    },
})

export default style