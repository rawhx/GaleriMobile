import React from "react";
import { BorderRadiuses, Button, View } from "react-native-ui-lib";
import { assets } from "../../assets";

const loginButton = () => {
    return (
        <View>
            <Button 
                label="Masuk" 
                size='medium' 
                borderRadius={5} 
                marginL-10
                backgroundColor="transparent"
                labelStyle={{color: assets.colors.header, fontWeight: 'bold'}}
                style={{
                    borderColor: assets.colors.header,
                    borderWidth: 1
                }}
            />
        </View>
    )
}

export default loginButton