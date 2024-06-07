import { assets } from "../../assets"
import { Button } from "react-native-paper";

const ButtonC = (props) => {
    return (
        <>
            <Button
                // icon="camera"
                mode={props.mode || 'contained'}
                style={[{ width: '100%' }, props.style]}
                onPress={props.onPress}
                labelStyle={[assets.style.fontSemiBold, { color: 'white' }, props.labelStyle]}
                buttonColor={props.buttonColor || assets.colors.navy}
                loading={props.loading}
            // disabled={false}
            >
                {props.title}
            </Button>
        </>
    )
}

export default ButtonC