import { StyleSheet } from "react-native";
import { theme } from "../../assets/colors";

const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    textJudul: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    Image: {
        width: 340,
        height: 340,  
    },
    welcome: {
        fontWeight: 'bold',
        elevation: 9,
        shadowRadius: 15,
        width: 250,
    }
})

export default Style