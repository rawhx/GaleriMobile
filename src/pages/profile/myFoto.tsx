import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-ui-lib';
import { getImgAkun } from '../../api/api';

const MyFoto = () => {
    const [data, setMyData] = useState({});
    
    getImgAkun().then((res)=>{
        setMyData(res); 
    })
  
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
