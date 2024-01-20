import React, { useEffect, useState } from "react";
import { View } from "react-native-ui-lib";
import { Pin } from "../../components";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Grid = () => {
  const navigation = useNavigation()
  const [data, setData] = useState([]);

  useEffect(() => {
      axios.get('https://picsea-1-k3867505.deta.app/foto-cari/guest?page=1&limit=50')
      .then((response)=>setData(response.data.Data)).catch((err)=>console.error(err))
  }, [])
  
  return (
    <View style={{flexDirection: 'row'}} marginT-10>
      <View style={{flex: 1}}>
        {
          data.filter((item, index) => index % 2 == 0).map((item) => (
            <Pin key={item.id} foto={item.Foto} title={item.JudulFoto} id={item.id} onPress={() => navigation.push('DetailFoto')} />
          ))
        }
      </View>
      <View style={{flex: 1}}>
        {
          data.filter((item, index) => index % 2 == 1).map((item) => (
            <Pin key={item.id} foto={item.Foto} title={item.JudulFoto} id={item.id}  onPress={() => navigation.push('DetailFoto')} />
          ))
        }
      </View>
    </View>
  )
}

export default Grid