import { StyleSheet } from "react-native";
import { color } from "../../assets/colors";

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.default
    },
    input: {
        height: 50,
        width: 250,
        paddingHorizontal: 10,
        // backgroundColor: 'red',
        borderRadius: 10,
        shadowRadius: 23,
    },
})

export default style