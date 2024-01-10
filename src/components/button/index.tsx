import { StyleSheet } from "react-native";
import { theme } from "../../assets/colors";
import { Button, View } from "react-native-ui-lib";

const ButtonC = props => {
    return (
        <View>
            <Button 
                label={props.label} 
                labelStyle={style.label}
                size='medium' 
                borderRadius={props.borderRadius ?? 20} 
                backgroundColor={props.backgroundColor} 
                marginV-10 
                paddingV-10 
                style={props.style ?? style.default} 
                onPress={props.onPress}
            />
        </View>
    )
}

const style = StyleSheet.create({
    label: {
        fontWeight: 'bold'
    },
    default: {
        elevation: 9,
        shadowRadius: 15,
    },
})

export default ButtonC