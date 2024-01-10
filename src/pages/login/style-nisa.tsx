import { StyleSheet } from "react-native";
import { theme } from "../../assets/colors";

const style = StyleSheet.create({
    sectionAwal: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        maxHeight: '45%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 45,
        paddingHorizontal: 20,
        borderColor: 'gray', 
        borderWidth: 1,
        borderRadius: 10,
    },
})

export default style