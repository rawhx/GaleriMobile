import React, { useState } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native-ui-lib"
import Icon from "react-native-vector-icons/FontAwesome6"

const Pin = (props) => {
  const [ratio, setRatio] = useState(1)
  Image.getSize(`data:image/png;base64,${props.foto}`, (width, height) => setRatio(width / height))

  return (
    <>
      <View style={{width: '100%', paddingHorizontal: 5}}>
        <TouchableOpacity
          onPress={props.onPress ? props.onPress : null}
        >
          <Image
            source={{ uri: `data:image/png;base64,${props.foto}` }}
            style={{ borderRadius: 10, width: '100%', aspectRatio: ratio }}
          />
        </TouchableOpacity>
        <View paddingT-5 marginB-10 style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{fontFamily: 'Poppins-Bold', fontSize: 12}}>{props.title}</Text>
          {/* <Icon name="ellipsis" size={20} color={'black'} /> */}
        </View>
      </View>
    </>
  )
}

export default Pin