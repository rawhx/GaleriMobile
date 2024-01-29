import React, { useEffect, useState } from "react"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Image, View } from "react-native-ui-lib";
import { getImgAkun } from "../../api/api";
import { StyleSheet } from "react-native";

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
        <View style={styles.container}>
            {/* <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                columnWrapperStyle={styles.row}
            /> */}
        </View>
    );
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