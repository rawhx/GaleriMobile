import React, { useState } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native-ui-lib"
import Icon from "react-native-vector-icons/FontAwesome6"
import { assets } from "../../assets"

const Pin = (props) => {
  const [ratio, setRatio] = useState(1)
  Image.getSize(`data:image/png;base64,${props.foto}`, (width, height) => setRatio(width / height))

  return (
    <TouchableOpacity
      onPress={props.onPress ? props.onPress : null}
    >
      <View style={{width: '100%', paddingHorizontal: 5}}>
          <Image
            source={{ uri: `data:image/png;base64,${props.foto}` }}
            style={{ borderRadius: 10, width: '100%', aspectRatio: ratio }}
          />
          <View paddingT-5 marginB-10 style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{fontWeight: 'bold'}}>{props.title}</Text>
            <Icon name="ellipsis" size={20}/>
          </View>
      </View>
    </TouchableOpacity>
  )
}

export default Pin