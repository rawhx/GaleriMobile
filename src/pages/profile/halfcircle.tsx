import React from "react"
import { Dimensions, StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";
import { assets } from "../../assets";
import HeaderProfile from "./header";

const window = Dimensions.get('window')

const HalfCircle = () => {
  return(
    <View>
      <View style={{backgroundColor: 'red', justifyContent: 'space-between', flexDirection: 'row'}}>
        <Text text60>ab</Text>
        <Text text60>b</Text>
        <Text text60>c</Text>
      </View>
      <View style={styles.parent}>
        <View style={styles.child}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent : {
      height : '30%',
      width : '100%',
      transform : [ { scaleX : 2 } ],
      borderBottomStartRadius : 500,
      borderBottomEndRadius : 500,
      overflow : 'hidden',
  },
  child : {
      flex : 1,
      transform : [ { scaleX : 0.5 } ],
      backgroundColor : 'blue',
      alignItems : 'center',
      justifyContent : 'center'
  }
})

export default HalfCircle