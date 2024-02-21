import React, { useEffect, useState } from "react"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Image, Text, View } from "react-native-ui-lib";
import { getImgAkun } from "../../api/api";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ButtonC, container } from "../../components";
import { assets } from "../../assets";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome6"

const FotoMember  = (props) => {
    const navigation = useNavigation()
    const [dataFoto, setDataFoto] = useState([])
    
    useEffect(() => {
      setDataFoto(props.data)
    }, []);
  
    const ViewC = () => {
      if (dataFoto.length !== 0) {
        return (
          <>
            {dataFoto.map((item, index) => (
                <React.Fragment key={item.id}>
                    {/* Check if the index is divisible by 3 */}
                    {index % 3 === 0 && (
                        <View style={{ flexDirection: 'row', marginBottom: 3, justifyContent: 'space-between' }}>
                            {/* Item 1 */}
                            <TouchableOpacity style={{width: '33%', aspectRatio: 1}} onPress={()=>navigation.navigate('TabDetailFotoProfile', {id: item.id, foto: item.Foto, title: item.JudulFoto, userId: item.UserID, deskripsi: item.DeskripsiFoto, kategoriId: item.KategoriID, favorite: item.Favorit, DataUser: props.profile, member: true})}>
                                    <Image source={{ uri: `data:image/*;base64,${item.Foto}` }} style={{ flex: 1}} />
                                    <View style={{position: 'absolute', bottom: 5, right: 5}}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: assets.colors.button, padding: 3}}>
                                            <Icon name="crown" size={10} color={"#FFE500"} solid />
                                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 9, marginLeft: 5, color: "#FFE500" }}>PICTSEA+</Text>
                                        </View>
                                    </View>
                              </TouchableOpacity>

                            {/* Check if the next items exist */}
                            {index + 1 < dataFoto.length && (
                                // Item 2
                                <TouchableOpacity style={{width: '33%', aspectRatio: 1}} 
                                    onPress={()=>navigation.navigate(props.route ? 'SearchDetailFotoUserLain' : 'DetailFotoUserLain', {id: dataFoto[index + 1], foto: dataFoto[index + 1].Foto, title: dataFoto[index + 1].JudulFoto, userId: dataFoto[index + 1].UserID, deskripsi: dataFoto[index + 1].DeskripsiFoto, kategoriId: dataFoto[index + 1].KategoriID, favorite: dataFoto[index + 1].Favorit, DataUser: props.profile, follow: props.follow})}>
                                    <Image source={{ uri: `data:image/*;base64,${dataFoto[index + 1].Foto}` }} style={{ flex: 1 }} />
                                </TouchableOpacity>
                            )}
                            {index + 2 < dataFoto.length && (
                                // Item 3
                                <TouchableOpacity style={{width: '33%', aspectRatio: 1}}
                                onPress={()=>navigation.navigate(props.route ? 'SearchDetailFotoUserLain' : 'DetailFotoUserLain', {id: dataFoto[index + 2], foto: dataFoto[index + 2].Foto, title: dataFoto[index + 2].JudulFoto, userId: dataFoto[index + 2].UserID, deskripsi: dataFoto[index + 2].DeskripsiFoto, kategoriId: dataFoto[index + 2].KategoriID, favorite: dataFoto[index + 2].Favorit, DataUser: props.profile, follow: props.follow})}>
                                    <Image source={{ uri: `data:image/png;base64,${dataFoto[index + 2].Foto}` }} style={{ flex: 1 }} />
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                </React.Fragment>
            ))}
          </>
        )
      } else {
        return (
          <>
            <Text style={[assets.fonts.default, {textAlign: 'center'}]}>Tidak ada foto</Text>
          </>
        )
      }
    }

    return (
      <SafeAreaView style={[container.defaultTab, {justifyContent: 'center'}]}>
        {!props.profile.Membership.Status ? (
          <View center>
              <Image source={assets.images.logindulu} style={{
                width: 110,
                height: 110,  
              }} />
              <Text style={[assets.fonts.judul, {fontSize: 15, textAlign: 'center', paddingHorizontal: 20}]}>Sayangnya anda belum {"\n"} menjadi bagian dari kami !</Text>    
              <Text marginV-5 style={[assets.fonts.default, {textAlign: 'center', paddingHorizontal: 10}]}>Untuk mengakses foto lebih banyak dan premium, silahkan gabung dengan melakukan membership terlebih dahulu.</Text>  
              <ButtonC 
                  marginV-10 
                  paddingV-10 
                  label="Masuk"
                  borderRadius={10}
                  backgroundColor={assets.colors.button} 
                  onPress={()=>navigation.navigate("Member", {profile: props.profile})}
              />  
          </View>
        ) : (
          <>
            <ViewC/>
          </>
        )}
      </SafeAreaView>
    )
}

export default FotoMember

const styles = StyleSheet.create({
    container: {
      padding: 5,
    },
    row: {
      flex: 1,
      justifyContent: 'space-around',
    },
});