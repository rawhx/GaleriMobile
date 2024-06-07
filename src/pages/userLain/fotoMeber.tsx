import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { Text, TouchableOpacity } from 'react-native-ui-lib';
import { getImgAkun } from '../../api/api';
import { assets } from '../../assets';
import { useNavigation } from '@react-navigation/native';
import { ButtonC, container } from '../../components';
import Icon from "react-native-vector-icons/FontAwesome5"

const Member = props => {
  const navigation = useNavigation()
  const [dataFoto, setDataFoto] = useState()
  useEffect(() => {
    setDataFoto(props.data)
  }, [props.data]);

  const ViewC = () => {
    if (dataFoto) {
      return (
        <>
          {dataFoto.map((item, index) => (
            <React.Fragment key={item.id}>
              {/* Check if the index is divisible by 3 */}
              {index % 3 === 0 && (
                <View style={{ flexDirection: 'row', marginBottom: 3, justifyContent: dataFoto.length - index >= 3 ? 'space-between' : 'flex-start' }}>
                  {/* Item 1 */}
                  <TouchableOpacity style={{ width: '33%', aspectRatio: 1 }} onPress={() => navigation.navigate(props.route ? 'SearchDetailFotoUserLain' : 'DetailFotoUserLain', { id: item.id, foto: item.Foto, title: item.JudulFoto, userId: item.UserID, deskripsi: item.DeskripsiFoto, kategoriId: item.KategoriID, favorite: item.Favorit, DataUser: props.profile, follow: props.follow, member: true })}>
                    <Image source={{ uri: (item.Foto).startsWith('https://') ? item.Foto : `data:image/*;base64,${item.Foto}` }} style={{ flex: 1 }} />
                    <View style={{ position: 'absolute', bottom: 5, right: 5 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: assets.colors.button, padding: 3 }}>
                        <Icon name="crown" size={10} color={"#FFE500"} solid />
                        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 9, marginLeft: 5, color: "#FFE500" }}>PICTSEA+</Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  {/* Check if the next items exist */}
                  {index + 1 < dataFoto.length && (
                    // Item 2
                    <TouchableOpacity style={{ width: '33%', aspectRatio: 1, marginHorizontal: 2 }}
                      onPress={() => navigation.navigate(props.route ? 'SearchDetailFotoUserLain' : 'DetailFotoUserLain', { id: dataFoto[index + 1].id, foto: dataFoto[index + 1].Foto, title: dataFoto[index + 1].JudulFoto, userId: dataFoto[index + 1].UserID, deskripsi: dataFoto[index + 1].DeskripsiFoto, kategoriId: dataFoto[index + 1].KategoriID, favorite: dataFoto[index + 1].Favorit, DataUser: props.profile, follow: props.follow, member: true })}>
                      <Image source={{ uri: (dataFoto[index + 1].Foto).startsWith('https://') ? dataFoto[index + 1].Foto : `data:image/*;base64,${dataFoto[index + 1].Foto}` }} style={{ flex: 1 }} />
                      <View style={{ position: 'absolute', bottom: 5, right: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: assets.colors.button, padding: 3 }}>
                          <Icon name="crown" size={10} color={"#FFE500"} solid />
                          <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 9, marginLeft: 5, color: "#FFE500" }}>PICTSEA+</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                  {index + 2 < dataFoto.length && (
                    // Item 3
                    <TouchableOpacity style={{ width: '33%', aspectRatio: 1 }}
                      onPress={() => navigation.navigate(props.route ? 'SearchDetailFotoUserLain' : 'DetailFotoUserLain', { id: dataFoto[index + 2].id, foto: dataFoto[index + 2].Foto, title: dataFoto[index + 2].JudulFoto, userId: dataFoto[index + 2].UserID, deskripsi: dataFoto[index + 2].DeskripsiFoto, kategoriId: dataFoto[index + 2].KategoriID, favorite: dataFoto[index + 2].Favorit, DataUser: props.profile, follow: props.follow, member: true })}>
                      <Image source={{ uri: (dataFoto[index + 2].Foto).startsWith('https://') ? dataFoto[index + 2].Foto : `data:image/*;base64,${dataFoto[index + 2].Foto}` }} style={{ flex: 1 }} />
                      <View style={{ position: 'absolute', bottom: 5, right: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: assets.colors.button, padding: 3 }}>
                          <Icon name="crown" size={10} color={"#FFE500"} solid />
                          <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 9, marginLeft: 5, color: "#FFE500" }}>PICTSEA+</Text>
                        </View>
                      </View>
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
          <Text style={[assets.fonts.default, { textAlign: 'center' }]}>Tidak ada foto</Text>
        </>
      )
    }
  }

  console.log(props.profile.jmlhFotoMembership);

  return (
    <>
      {!props.profile.Membership.Status ? 
      props.profile.jmlhFotoMembership === 0 ? (
        <View style={[{ justifyContent: 'center', alignItems: 'center' }]}>
          <Image source={assets.images.logindulu} style={{
            width: 110,
            height: 110,
            alignItems: 'center'
          }} />
          <Text style={[assets.fonts.judul, { fontSize: 15, textAlign: 'center', paddingHorizontal: 20 }]}>Sayangnya akun ini belum memiliki {'\n'} foto premium!</Text>
          <Text marginV-5 style={[assets.fonts.default, { textAlign: 'center', paddingHorizontal: 10 }]}>Tunggu agar akun ini memilihi foto premium.</Text>
        </View>
      ) : (
        <View style={[{ justifyContent: 'center', alignItems: 'center' }]}>
          <Image source={assets.images.logindulu} style={{
            width: 110,
            height: 110,
            alignItems: 'center'
          }} />
          <Text style={[assets.fonts.judul, { fontSize: 15, textAlign: 'center', paddingHorizontal: 20 }]}>Sayangnya anda belum {"\n"} menjadi bagian dari kami !</Text>
          <Text marginV-5 style={[assets.fonts.default, { textAlign: 'center', paddingHorizontal: 10 }]}>Untuk mengakses foto lebih banyak dan premium, silahkan gabung dengan melakukan membership terlebih dahulu.</Text>
          <ButtonC
            marginV-10
            paddingV-10
            label="Masuk"
            borderRadius={10}
            backgroundColor={assets.colors.button}
            onPress={() => navigation.navigate("Member", { profile: props.profile })}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <ViewC />
        </View>
      )}
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
});

export default Member;
