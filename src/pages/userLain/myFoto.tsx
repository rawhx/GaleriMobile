import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { Text, TouchableOpacity } from 'react-native-ui-lib';
import { getImgAkun } from '../../api/api';
import { assets } from '../../assets';
import { useNavigation } from '@react-navigation/native';

const MyFoto = props => {
    console.log(props.follow);
    
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
                            <View style={{ flexDirection: 'row', marginBottom: 3, justifyContent: 'space-between' }}>
                                {/* Item 1 */}
                                <TouchableOpacity style={{width: '33%', aspectRatio: 1}} onPress={()=>navigation.navigate(props.route ? 'SearchDetailFotoUserLain' : 'DetailFotoUserLain', {id: item.id, foto: item.Foto, title: item.JudulFoto, userId: item.UserID, deskripsi: item.DeskripsiFoto, kategoriId: item.KategoriID, favorite: item.Favorit, DataUser: props.profile, follow: props.follow})}>
                                    <Image source={{ uri: `data:image/*;base64,${item.Foto}` }} style={{ flex: 1}} />
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
        <View style={styles.container}>
            <View paddingH-20>
                <ViewC/>
            </View>
        </View>
    );
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

export default MyFoto;


 // return (
    //   <>
    //     {!props.profile.Membership.Status ? (
    //       <View style={[container.defaultTab, {justifyContent: 'center'}]}>
    //         <View center>
    //             <Image source={assets.images.logindulu} style={{
    //               width: 110,
    //               height: 110,  
    //             }} />
    //             <Text style={[assets.fonts.judul, {fontSize: 15, textAlign: 'center', paddingHorizontal: 20}]}>Sayangnya anda belum {"\n"} menjadi bagian dari kami !</Text>    
    //             <Text marginV-5 style={[assets.fonts.default, {textAlign: 'center', paddingHorizontal: 10}]}>Untuk mengakses foto lebih banyak dan premium, silahkan gabung dengan melakukan membership terlebih dahulu.</Text>  
    //             <ButtonC 
    //                 marginV-10 
    //                 paddingV-10 
    //                 label="Masuk"
    //                 borderRadius={10}
    //                 backgroundColor={assets.colors.button} 
    //                 onPress={()=>navigation.navigate("Member", {profile: props.profile})}
    //             />  
    //         </View>
    //       </View>
    //     ) : (
    //       // <View style={styles.container}>
    //         <View>
    //           <ViewC/>
    //         </View>
    //       // </View>
    //     )} 
    //   </>
    // )