import { StyleSheet } from "react-native";
import { color } from "../../assets/colors";

const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.default
    },
    textJudul: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    Image: {
        width: 350,
        height: 350,  
    },
    Button: {
        width: 250,
    }
})

export default Style