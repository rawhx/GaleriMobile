import React, { useEffect, useState } from "react"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Image, Text, View } from "react-native-ui-lib";
import { getImgAkun } from "../../api/api";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ButtonC, container } from "../../components";
import { assets } from "../../assets";

const FotoMember  = () => {
    const [data, setMyData] = useState({});
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await getImgAkun(true);
            setMyData(res);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData(); // Panggil fungsi saat komponen diinisialisasi
    
        // Untuk memastikan fungsi hanya dipanggil sekali, lewati array dependensi kosong []
      }, []);
  
    const renderItem = ({ item }) => (
        <View style={{  }}>
            <TouchableOpacity>
                <Image source={{  uri: `data:image/png;base64,${item.Foto}` }} style={{ height: 120, width: 120, aspectRatio: 1, marginBottom: 5 }} />
            </TouchableOpacity>
        </View>
    );

    return (
      <SafeAreaView style={[container.defaultTab, {justifyContent: 'center'}]}>
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
                // onPress={()=>navigation.push("Welcome")}
            />  
        </View>
      </SafeAreaView>
    )

    // return (
    //     <View style={styles.container}>
    //         {/* <FlatList
    //             data={data}
    //             renderItem={renderItem}
    //             keyExtractor={(item, index) => index.toString()}
    //             numColumns={3}
    //             columnWrapperStyle={styles.row}
    //         /> */}
    //     </View>
    // );
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