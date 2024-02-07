import React, { useState } from "react"
import { ImageBackground } from "react-native"
import { Image, Text, View } from "react-native-ui-lib"


const ImageBg = (props) => {
    const [ratio, setRatio] = useState(1)
    Image.getSize(`data:image/png;base64,${props.foto}`, (width, height) => setRatio(width / height))

    return (
        <ImageBackground source={{uri: `data:image/*;base64,${props.foto}`}}
            style={{ 
                borderRadius: 10, 
                width: '100%', 
                aspectRatio: ratio 
            }}
        >
            <View>
                {props.children}
            </View>
        </ImageBackground>
    )
}

export default ImageBg