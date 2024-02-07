import React from "react"
import { ImageBackground, StyleSheet } from "react-native"
import { Text, View } from "react-native-ui-lib"
import { assets } from "../../assets"

const HalfCricle = (props) => {
  return (
    <View style={{}}>
      <ImageBackground source={assets.images.halfCircle} style={style.kategoriImg}>
        {props.view}
      </ImageBackground>
    </View>
  )
}

const style = StyleSheet.create({
  kategoriImg: {
    width: '100%',
    aspectRatio: 1,
    transform: [{ translateY: -210 }],
  },
})

export default HalfCricle