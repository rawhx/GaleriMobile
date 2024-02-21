import React from "react"
import { Dimensions, ImageBackground, StyleSheet } from "react-native"
import { Text, View } from "react-native-ui-lib"
import { assets } from "../../assets"

const HalfCricle = (props) => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  return (
    <View style={{}}>
      <ImageBackground source={assets.images.halfCircle} style={getStyle(screenWidth)}>
        {props.view}
      </ImageBackground>
    </View>
  );
}

const getStyle = (screenWidth) => {
  const aspectRatio = 1;
  const imageHeight = screenWidth / aspectRatio;

  return StyleSheet.create({
    kategoriImg: {
      width: '100%',
      height: imageHeight,
      marginTop: -imageHeight / 2, // Adjust as needed
    },
  }).kategoriImg;
};

export default HalfCricle